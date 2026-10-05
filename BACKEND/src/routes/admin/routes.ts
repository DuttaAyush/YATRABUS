import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma';
import { sendSuccess, sendError } from '../../utils/response';

const router = Router();

// ── GET /api/admin/routes ─────────────────────────────────────────
router.get('/', async (_req: Request, res: Response) => {
  try {
    const routes = await prisma.route.findMany({
      orderBy: { originCity: 'asc' },
      include: { _count: { select: { trips: true } } },
    });
    return sendSuccess(res, routes);
  } catch (err) {
    console.error('[admin/routes GET]', err);
    return sendError(res, 'Failed to fetch routes.', 500);
  }
});

// ── POST /api/admin/routes ────────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const { originCity, destinationCity, waypoints, distanceKm } = req.body;

    if (!originCity || !destinationCity || !distanceKm) {
      return sendError(res, 'originCity, destinationCity, and distanceKm are required.', 400);
    }
    if (originCity.trim().toLowerCase() === destinationCity.trim().toLowerCase()) {
      return sendError(res, 'Origin and destination cannot be the same city.', 400);
    }
    if (isNaN(Number(distanceKm)) || Number(distanceKm) <= 0) {
      return sendError(res, 'distanceKm must be a positive number.', 400);
    }

    const route = await prisma.route.create({
      data: {
        originCity:      originCity.trim(),
        destinationCity: destinationCity.trim(),
        waypoints:       Array.isArray(waypoints) ? waypoints : [],
        distanceKm:      Number(distanceKm),
      },
    });

    return sendSuccess(res, route, 'Route created.', 201);
  } catch (err) {
    console.error('[admin/routes POST]', err);
    return sendError(res, 'Failed to create route.', 500);
  }
});

// ── GET /api/admin/routes/:id ─────────────────────────────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const route = await prisma.route.findUnique({
      where: { id },
      include: {
        trips: {
          orderBy: { departureDatetime: 'desc' },
          take: 10,
          include: { bus: true },
        },
        _count: { select: { trips: true } },
      },
    });

    if (!route) return sendError(res, 'Route not found.', 404);
    return sendSuccess(res, route);
  } catch (err) {
    console.error('[admin/routes/:id GET]', err);
    return sendError(res, 'Failed to fetch route.', 500);
  }
});

// ── PATCH /api/admin/routes/:id ───────────────────────────────────
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { originCity, destinationCity, waypoints, distanceKm } = req.body;

    const route = await prisma.route.findUnique({ where: { id } });
    if (!route) return sendError(res, 'Route not found.', 404);

    const updated = await prisma.route.update({
      where: { id },
      data: {
        ...(originCity      && { originCity:      originCity.trim() }),
        ...(destinationCity && { destinationCity: destinationCity.trim() }),
        ...(waypoints       && { waypoints: Array.isArray(waypoints) ? waypoints : [] }),
        ...(distanceKm      && { distanceKm: Number(distanceKm) }),
      },
    });

    return sendSuccess(res, updated, 'Route updated.');
  } catch (err) {
    console.error('[admin/routes/:id PATCH]', err);
    return sendError(res, 'Failed to update route.', 500);
  }
});

// ── DELETE /api/admin/routes/:id ──────────────────────────────────
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const force = req.query.force === 'true';
    const route = await prisma.route.findUnique({
      where: { id },
      include: { _count: { select: { trips: true } } },
    });

    if (!route) return sendError(res, 'Route not found.', 404);

    if (route._count.trips > 0) {
      if (force) {
        const trips = await prisma.trip.findMany({ where: { routeId: id }, select: { id: true } });
        const tripIds = trips.map(t => t.id);
        if (tripIds.length > 0) {
          await prisma.busBooking.deleteMany({ where: { tripId: { in: tripIds } } });
          await prisma.trip.deleteMany({ where: { routeId: id } });
        }
      } else {
        return sendError(res, `Cannot delete route with ${route._count.trips} associated trip(s).`, 409);
      }
    }

    await prisma.route.delete({ where: { id } });
    return sendSuccess(res, null, 'Route deleted.');
  } catch (err) {
    console.error('[admin/routes/:id DELETE]', err);
    return sendError(res, 'Failed to delete route.', 500);
  }
});

export default router;
