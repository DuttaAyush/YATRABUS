import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma';
import { sendSuccess, sendError } from '../../utils/response';

const router = Router();

// ── GET /api/admin/analytics/revenue ─────────────────────────────
router.get('/revenue', async (req: Request, res: Response) => {
  try {
    const days = Math.min(90, parseInt(String(req.query.days || '30')));
    const from = new Date();
    from.setDate(from.getDate() - days);

    const [busBookings, packageBookings] = await Promise.all([
      prisma.busBooking.findMany({
        where: { status: 'Confirmed', bookingDate: { gte: from } },
        select: { bookingDate: true, totalAmount: true },
        orderBy: { bookingDate: 'asc' },
      }),
      prisma.packageBooking.findMany({
        where: { status: 'Confirmed', travelDate: { gte: from } },
        select: { travelDate: true, totalAmount: true },
        orderBy: { travelDate: 'asc' },
      }),
    ]);

    // Aggregate by day
    const revenueMap: Record<string, { bus: number; packages: number; total: number }> = {};
    for (const b of busBookings) {
      const day = b.bookingDate.toISOString().split('T')[0];
      if (!revenueMap[day]) revenueMap[day] = { bus: 0, packages: 0, total: 0 };
      revenueMap[day].bus   += Number(b.totalAmount);
      revenueMap[day].total += Number(b.totalAmount);
    }
    for (const p of packageBookings) {
      const day = p.travelDate.toISOString().split('T')[0];
      if (!revenueMap[day]) revenueMap[day] = { bus: 0, packages: 0, total: 0 };
      revenueMap[day].packages += Number(p.totalAmount);
      revenueMap[day].total    += Number(p.totalAmount);
    }

    const chart = Object.entries(revenueMap)
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const totalBus      = busBookings.reduce((s, b) => s + Number(b.totalAmount), 0);
    const totalPackages = packageBookings.reduce((s, b) => s + Number(b.totalAmount), 0);

    return sendSuccess(res, {
      summary: { totalBus, totalPackages, total: totalBus + totalPackages },
      chart,
    });
  } catch (err) {
    console.error('[admin/analytics/revenue]', err);
    return sendError(res, 'Failed to fetch revenue analytics.', 500);
  }
});

// ── GET /api/admin/analytics/bookings ────────────────────────────
router.get('/bookings', async (req: Request, res: Response) => {
  try {
    const days = Math.min(90, parseInt(String(req.query.days || '30')));
    const from = new Date();
    from.setDate(from.getDate() - days);

    const [busCounts, pkgCounts, statusBreakdown] = await Promise.all([
      prisma.busBooking.count({ where: { bookingDate: { gte: from } } }),
      prisma.packageBooking.count({ where: { travelDate: { gte: from } } }),
      prisma.busBooking.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    return sendSuccess(res, {
      period: `last ${days} days`,
      busBookings:     busCounts,
      packageBookings: pkgCounts,
      total:           busCounts + pkgCounts,
      statusBreakdown: statusBreakdown.map((s) => ({ status: s.status, count: s._count.status })),
    });
  } catch (err) {
    console.error('[admin/analytics/bookings]', err);
    return sendError(res, 'Failed to fetch booking analytics.', 500);
  }
});

// ── GET /api/admin/analytics/routes ──────────────────────────────
// Most popular routes by booking count and revenue
router.get('/routes', async (_req: Request, res: Response) => {
  try {
    const routeBookings = await prisma.busBooking.findMany({
      where: { status: 'Confirmed' },
      select: {
        totalAmount: true,
        trip: {
          select: {
            route: { select: { id: true, originCity: true, destinationCity: true } },
          },
        },
      },
    });

    const routeMap: Record<string, { name: string; bookings: number; revenue: number }> = {};
    for (const b of routeBookings) {
      const r = b.trip.route;
      const key = r.id;
      if (!routeMap[key]) {
        routeMap[key] = { name: `${r.originCity} → ${r.destinationCity}`, bookings: 0, revenue: 0 };
      }
      routeMap[key].bookings += 1;
      routeMap[key].revenue  += Number(b.totalAmount);
    }

    const routes = Object.entries(routeMap)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 10);

    return sendSuccess(res, routes);
  } catch (err) {
    console.error('[admin/analytics/routes]', err);
    return sendError(res, 'Failed to fetch route analytics.', 500);
  }
});

export default router;
