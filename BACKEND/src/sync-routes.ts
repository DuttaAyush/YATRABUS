import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanAndSeedRealRoutes() {
  console.log('Cleaning placeholder routes with 550km distance...');
  const fakeRoutes = await prisma.route.findMany({
    where: {
      OR: [
        { destinationCity: { contains: 'MH' } },
        { originCity: 'Mumbai', destinationCity: 'Mumbai' },
        { originCity: 'Delhi', destinationCity: 'Pune', distanceKm: 550 },
      ]
    },
    include: { trips: true }
  });

  for (const r of fakeRoutes) {
    for (const t of r.trips) {
      await prisma.busBooking.deleteMany({ where: { tripId: t.id } });
      await prisma.trip.delete({ where: { id: t.id } });
    }
    await prisma.route.delete({ where: { id: r.id } });
  }

  console.log(`Cleaned ${fakeRoutes.length} placeholder routes.`);

  const buses = await prisma.bus.findMany({ where: { status: 'Active' } });
  const busMap = new Map<string, any>();
  for (const b of buses) {
    busMap.set(b.plateNumber, b);
  }

  const REAL_ROUTES = [
    {
      origin: 'Mumbai',
      destination: 'Pune',
      distanceKm: 150,
      durationHours: 3.5,
      waypoints: ['Navi Mumbai', 'Lonavala Expressway', 'Wakad', 'Shivajinagar'],
      trips: [
        { busPlate: 'MH-12-QZ-8812', depHour: 6, depMin: 0, fare: 380 },
        { busPlate: 'DL-01-AX-9933', depHour: 11, depMin: 30, fare: 420 },
        { busPlate: 'RJ-14-VB-2024', depHour: 16, depMin: 15, fare: 450 },
        { busPlate: 'MH-01-GA-7711', depHour: 21, depMin: 45, fare: 590 },
      ]
    },
    {
      origin: 'Pune',
      destination: 'Mumbai',
      distanceKm: 150,
      durationHours: 3.5,
      waypoints: ['Shivajinagar', 'Wakad', 'Lonavala Expressway', 'Dadar'],
      trips: [
        { busPlate: 'MH-12-QZ-8812', depHour: 6, depMin: 30, fare: 380 },
        { busPlate: 'DL-01-AX-9933', depHour: 12, depMin: 0, fare: 420 },
        { busPlate: 'RJ-14-VB-2024', depHour: 17, depMin: 0, fare: 450 },
        { busPlate: 'MH-01-GA-7711', depHour: 22, depMin: 15, fare: 590 },
      ]
    },
    {
      origin: 'Delhi',
      destination: 'Pune',
      distanceKm: 1420,
      durationHours: 25,
      waypoints: ['Jaipur', 'Kishangarh', 'Ratlam', 'Dhule', 'Nashik', 'Pune'],
      trips: [
        { busPlate: 'MP-09-VB-6622', depHour: 9, depMin: 0, fare: 2450 },
        { busPlate: 'TS-09-VB-3311', depHour: 17, depMin: 30, fare: 2690 },
      ]
    },
    {
      origin: 'Pune',
      destination: 'Delhi',
      distanceKm: 1420,
      durationHours: 25,
      waypoints: ['Nashik', 'Dhule', 'Ratlam', 'Kishangarh', 'Jaipur', 'Delhi'],
      trips: [
        { busPlate: 'MP-09-VB-6622', depHour: 9, depMin: 30, fare: 2450 },
        { busPlate: 'TS-09-VB-3311', depHour: 18, depMin: 0, fare: 2690 },
      ]
    },
    {
      origin: 'Pune',
      destination: 'Shirdi',
      distanceKm: 185,
      durationHours: 4.25,
      waypoints: ['Chakan', 'Alephata', 'Sangamner', 'Shirdi Temple Gate'],
      trips: [
        { busPlate: 'MH-17-SD-1008', depHour: 6, depMin: 30, fare: 420 },
        { busPlate: 'MH-14-BT-3399', depHour: 14, depMin: 0, fare: 550 },
      ]
    },
    {
      origin: 'Mumbai',
      destination: 'Shirdi',
      distanceKm: 240,
      durationHours: 5,
      waypoints: ['Thane', 'Igatpuri', 'Nashik Bypass', 'Sinnar', 'Shirdi'],
      trips: [
        { busPlate: 'MH-17-SD-1008', depHour: 5, depMin: 45, fare: 490 },
        { busPlate: 'MH-01-GA-7711', depHour: 22, depMin: 30, fare: 680 },
      ]
    },
    {
      origin: 'Haridwar',
      destination: 'Delhi',
      distanceKm: 220,
      durationHours: 5.25,
      waypoints: ['Roorkee', 'Muzaffarnagar', 'Meerut Expressway', 'ISBT Anand Vihar'],
      trips: [
        { busPlate: 'UK-07-PA-1008', depHour: 6, depMin: 30, fare: 550 },
        { busPlate: 'DL-01-AX-9933', depHour: 14, depMin: 30, fare: 480 },
        { busPlate: 'UK-07-PA-1008', depHour: 22, depMin: 0, fare: 650 },
      ]
    },
    {
      origin: 'Delhi',
      destination: 'Jaipur',
      distanceKm: 280,
      durationHours: 4.5,
      waypoints: ['Gurugram', 'Manesar', 'Kotputli', 'Shahpura', 'Sindhi Camp'],
      trips: [
        { busPlate: 'RJ-14-VB-2024', depHour: 7, depMin: 0, fare: 450 },
        { busPlate: 'DL-01-AX-9933', depHour: 15, depMin: 30, fare: 480 },
      ]
    }
  ];

  console.log('Seeding real routes...');
  const now = new Date();

  for (const r of REAL_ROUTES) {
    let route = await prisma.route.findFirst({
      where: {
        originCity: { equals: r.origin, mode: 'insensitive' },
        destinationCity: { equals: r.destination, mode: 'insensitive' },
      }
    });

    if (!route) {
      route = await prisma.route.create({
        data: {
          originCity: r.origin,
          destinationCity: r.destination,
          distanceKm: r.distanceKm,
          waypoints: r.waypoints,
        }
      });
    } else {
      await prisma.route.update({
        where: { id: route.id },
        data: {
          distanceKm: r.distanceKm,
          waypoints: r.waypoints,
        }
      });
    }

    // Check if trips already exist for this route
    const existingTrips = await prisma.trip.findMany({ where: { routeId: route.id } });
    if (existingTrips.length === 0) {
      for (let dayOffset = 0; dayOffset <= 2; dayOffset++) {
        const tripDate = new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000);
        for (const t of r.trips) {
          const assignedBus = busMap.get(t.busPlate) || buses[0];
          const dep = new Date(tripDate);
          dep.setHours(t.depHour, t.depMin, 0, 0);
          const arr = new Date(dep.getTime() + Math.round(r.durationHours * 60 * 60 * 1000));

          await prisma.trip.create({
            data: {
              busId: assignedBus.id,
              routeId: route.id,
              departureDatetime: dep,
              arrivalDatetime: arr,
              baseFare: t.fare,
              status: 'Scheduled',
            }
          });
        }
      }
    }
  }

  const allRoutes = await prisma.route.count();
  const allTrips = await prisma.trip.count();
  console.log(`Success! Total routes: ${allRoutes}, Total trips in DB: ${allTrips}`);
}

cleanAndSeedRealRoutes()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
