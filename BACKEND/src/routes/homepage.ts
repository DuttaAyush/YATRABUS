import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

const DEFAULT_HOMEPAGE_DATA = {
  offers: [
    { code: 'VEDBUS2026', discountPercentage: 15, maxDiscountAmount: 300, validUntil: '2026-12-31' },
    { code: 'YATRA10', discountPercentage: 10, maxDiscountAmount: 200, validUntil: '2026-12-31' },
    { code: 'PILGRIM15', discountPercentage: 15, maxDiscountAmount: 1500, validUntil: '2026-12-31' },
  ],
  popularRoutes: [
    { id: 'nagpur-pune', from: 'Nagpur', to: 'Pune', distanceKm: 720, totalTrips: 4, price: 850, depTime: '20:30', arrTime: '07:00', duration: '10h 30m', plate: 'MH-31-AP-4921', busType: 'BharatBenz AC Sleeper (2+1)', badge: 'Most Popular Express' },
    { id: 'pune-mumbai', from: 'Pune', to: 'Mumbai', distanceKm: 150, totalTrips: 8, price: 450, depTime: '06:00', arrTime: '09:45', duration: '3h 45m', plate: 'MH-12-QZ-8812', busType: 'Multi-Axle Volvo B11R AC Seater', badge: 'High Frequency Shuttle' },
    { id: 'delhi-haridwar', from: 'Delhi', to: 'Haridwar', distanceKm: 220, totalTrips: 6, price: 550, depTime: '06:00', arrTime: '11:30', duration: '5h 30m', plate: 'UK-07-PA-1008', busType: 'Scania Multi-Axle AC Sleeper', badge: 'Devsthan Pilgrimage Express' },
    { id: 'mumbai-goa', from: 'Mumbai', to: 'Goa', distanceKm: 590, totalTrips: 4, price: 1150, depTime: '18:00', arrTime: '07:00', duration: '13h 00m', plate: 'MH-01-GA-7711', busType: 'Volvo B11R Multi-Axle AC Sleeper', badge: 'Scenic Coastal Route' },
    { id: 'bengaluru-hyderabad', from: 'Bengaluru', to: 'Hyderabad', distanceKm: 570, totalTrips: 4, price: 890, depTime: '21:00', arrTime: '06:30', duration: '9h 30m', plate: 'KA-01-HY-5522', busType: 'BharatBenz Executive AC Seater', badge: 'Tech Corridor Express' },
  ],
  featuredPackages: [
    { id: 'chardham', title: 'Char Dham Yatra & Haridwar Special', category: 'Spiritual', price: '₹24,499', durationDays: 10, duration: '10 Days / 9 Nights', image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg', badge: 'VIP Darshan Pass Included' },
    { id: 'dubai-combo', title: 'Dubai Desert Safari & Marina Skyline', category: 'International', price: '₹48,999', durationDays: 5, duration: '5 Days / 4 Nights', image: '/images/vedbus_international_holiday_travel_packages_1.jpg', badge: '4-Star Marina Hotel & Visa Included' },
    { id: 'himachal-manali', title: 'Himachal & Manali Mountain Escape', category: 'Domestic', price: '₹9,499', durationDays: 5, duration: '5 Days / 4 Nights', image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_13.jpg', badge: 'Scenic Hill Station' },
  ]
};

// ── GET /api/homepage & /api/homepage/data ────────────────────────
// Public — aggregated data for the landing page
router.get(['/', '/data'], async (_req: Request, res: Response) => {
  try {
    let offers: any[] = [];
    let popularRoutes: any[] = [];
    let featuredPackages: any[] = [];

    try {
      [offers, popularRoutes, featuredPackages] = await Promise.all([
        prisma.offer.findMany({
          where: { isActive: true, validUntil: { gte: new Date() } },
          take: 3,
          orderBy: { validUntil: 'asc' },
        }),
        prisma.route.findMany({
          take: 6,
          include: { _count: { select: { trips: true } } },
          orderBy: { trips: { _count: 'desc' } },
        }),
        prisma.tourPackage.findMany({
          where: { isActive: true },
          take: 6,
          orderBy: { pricePerPerson: 'asc' },
        }),
      ]);
    } catch {
      // DB offline fallback
    }

    if (popularRoutes.length === 0) {
      return res.status(200).json({
        success: true,
        data: DEFAULT_HOMEPAGE_DATA,
        ...DEFAULT_HOMEPAGE_DATA,
      });
    }

    const shapedRoutes = popularRoutes.map((r) => ({
      id: r.id,
      from: r.originCity,
      to: r.destinationCity,
      distanceKm: r.distanceKm,
      totalTrips: r._count?.trips || 2,
    }));

    const shapedPackages = featuredPackages.map((p) => {
      const it: any = typeof p.itinerary === 'object' && p.itinerary ? p.itinerary : {};
      return {
        id: p.id,
        title: p.title,
        category: p.category,
        durationDays: p.durationDays,
        pricePerPerson: Number(p.pricePerPerson),
        price: `₹${Number(p.pricePerPerson).toLocaleString('en-IN')}`,
        ...it,
      };
    });

    const responseData = {
      offers: offers.length > 0 ? offers : DEFAULT_HOMEPAGE_DATA.offers,
      popularRoutes: shapedRoutes.length > 0 ? shapedRoutes : DEFAULT_HOMEPAGE_DATA.popularRoutes,
      featuredPackages: shapedPackages.length > 0 ? shapedPackages : DEFAULT_HOMEPAGE_DATA.featuredPackages,
    };

    return res.status(200).json({
      success: true,
      data: responseData,
      ...responseData,
    });
  } catch (err) {
    console.error('[homepage GET]', err);
    return res.status(200).json({
      success: true,
      data: DEFAULT_HOMEPAGE_DATA,
      ...DEFAULT_HOMEPAGE_DATA,
    });
  }
});

export default router;
