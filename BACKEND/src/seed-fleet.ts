import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const EXPANDED_FLEET = [
  { plateNumber: "MH-31-AP-4921", type: "BharatBenz AC Sleeper (2+1)", totalSeats: 40, amenities: { wifi: true, charging: true, blanket: true, gps: true, water: true }, status: "Active" as const, busStyle: "sleeper" },
  { plateNumber: "MH-12-QZ-8812", type: "Multi-Axle Volvo B11R AC Seater (2+2)", totalSeats: 42, amenities: { wifi: true, charging: true, blanket: false, gps: true }, status: "Active" as const, busStyle: "seater" },
  { plateNumber: "UK-07-PA-1008", type: "Scania Multi-Axle AC Sleeper (2+1)", totalSeats: 45, amenities: { wifi: true, charging: true, blanket: true, gps: true, sos: true }, status: "Active" as const, busStyle: "sleeper" },
  { plateNumber: "MH-01-GA-7711", type: "Volvo B11R Multi-Axle AC Sleeper", totalSeats: 40, amenities: { wifi: true, charging: true, blanket: true, gps: true, sos: true, water: true }, status: "Active" as const, busStyle: "sleeper" },
  { plateNumber: "KA-01-HY-5522", type: "BharatBenz Executive AC Seater (2+2)", totalSeats: 48, amenities: { wifi: false, charging: true, blanket: false, gps: true }, status: "Active" as const, busStyle: "seater" },
  { plateNumber: "DL-01-AX-9933", type: "Volvo 9600 AC Seater Pushback (2+2)", totalSeats: 44, amenities: { wifi: true, charging: true, blanket: false, gps: true, sos: true }, status: "Active" as const, busStyle: "seater" },
  { plateNumber: "RJ-14-VB-2024", type: "Scania Intercity Luxury Seater (2+2)", totalSeats: 46, amenities: { wifi: true, charging: true, blanket: false, gps: true }, status: "Active" as const, busStyle: "seater" },
  { plateNumber: "MH-14-BT-3399", type: "BharatBenz Gold Club AC Sleeper (2+1)", totalSeats: 38, amenities: { wifi: true, charging: true, blanket: true, gps: true, water: true }, status: "Active" as const, busStyle: "sleeper" },
  { plateNumber: "MP-09-VB-6622", type: "Volvo 9600 Multi-Axle AC Sleeper", totalSeats: 42, amenities: { wifi: true, charging: true, blanket: true, gps: true, sos: true }, status: "Active" as const, busStyle: "sleeper" },
  { plateNumber: "TS-09-VB-3311", type: "Scania Metrolink AC Sleeper (2+1)", totalSeats: 40, amenities: { wifi: true, charging: true, blanket: true, gps: true }, status: "Active" as const, busStyle: "sleeper" },
  { plateNumber: "MH-17-SD-1008", type: "BharatBenz Divine Express Seater (2+2)", totalSeats: 45, amenities: { wifi: false, charging: true, blanket: false, gps: true, sos: true }, status: "Active" as const, busStyle: "seater" },
  { plateNumber: "GA-03-Z-9901", type: "Volvo B11R Coastal Luxury Sleeper", totalSeats: 36, amenities: { wifi: true, charging: true, blanket: true, gps: true, water: true }, status: "Active" as const, busStyle: "sleeper" },
];

async function seedFleet() {
  console.log('Seeding / updating fleet...');
  for (const b of EXPANDED_FLEET) {
    await prisma.bus.upsert({
      where: { plateNumber: b.plateNumber },
      update: {
        type: b.type,
        totalSeats: b.totalSeats,
        amenities: b.amenities,
        status: b.status,
        busStyle: b.busStyle,
      },
      create: {
        plateNumber: b.plateNumber,
        type: b.type,
        totalSeats: b.totalSeats,
        amenities: b.amenities,
        status: b.status,
        busStyle: b.busStyle,
        lastServiced: new Date(),
      },
    });
  }
  const count = await prisma.bus.count();
  console.log(`Fleet synced! Total buses in DB: ${count}`);
}

seedFleet()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
