import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma';
import { sendSuccess, sendError } from '../../utils/response';

const router = Router();

// ── GET /api/admin/fleet ──────────────────────────────────────────
router.get('/', async (req: Request, res: Response) => {
  try {
    const status = req.query.status ? String(req.query.status) : undefined;
    const where: any = {};
    if (status) where.status = status;

    const buses = await prisma.bus.findMany({
      where,
      orderBy: { plateNumber: 'asc' },
      include: { _count: { select: { trips: true } } },
    });

    return sendSuccess(res, buses);
  } catch (err) {
    console.error('[admin/fleet GET]', err);
    return sendError(res, 'Failed to fetch fleet.', 500);
  }
});

// ── POST /api/admin/fleet ─────────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const { plateNumber, type, totalSeats, amenities, busStyle } = req.body;

    if (!plateNumber || !type || !totalSeats) {
      return sendError(res, 'plateNumber, type, and totalSeats are required.', 400);
    }
    if (isNaN(Number(totalSeats)) || Number(totalSeats) < 1) {
      return sendError(res, 'totalSeats must be a positive number.', 400);
    }

    const existing = await prisma.bus.findUnique({ where: { plateNumber } });
    if (existing) return sendError(res, 'A bus with this plate number already exists.', 409);

    const bus = await prisma.bus.create({
      data: {
        plateNumber,
        type,
        totalSeats:  Number(totalSeats),
        amenities:   amenities || {},
        busStyle:    busStyle || 'seater',
        status:      'Active',
      },
    });

    return sendSuccess(res, bus, 'Bus added to fleet.', 201);
  } catch (err) {
    console.error('[admin/fleet POST]', err);
    return sendError(res, 'Failed to add bus.', 500);
  }
});

// ── GET /api/admin/fleet/:id ──────────────────────────────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const bus = await prisma.bus.findUnique({
      where: { id },
      include: {
        trips: {
          orderBy: { departureDatetime: 'desc' },
          take: 10,
          include: { route: true },
        },
        _count: { select: { trips: true } },
      },
    });

    if (!bus) return sendError(res, 'Bus not found.', 404);
    return sendSuccess(res, bus);
  } catch (err) {
    console.error('[admin/fleet/:id GET]', err);
    return sendError(res, 'Failed to fetch bus.', 500);
  }
});

// ── PATCH /api/admin/fleet/:id ────────────────────────────────────
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { type, totalSeats, amenities, busStyle, status, lastServiced } = req.body;

    const bus = await prisma.bus.findUnique({ where: { id } });
    if (!bus) return sendError(res, 'Bus not found.', 404);

    const validStatuses = ['Active', 'In_Maintenance', 'Retired'];
    if (status && !validStatuses.includes(status)) {
      return sendError(res, `status must be one of: ${validStatuses.join(', ')}.`, 400);
    }

    const updated = await prisma.bus.update({
      where: { id },
      data: {
        ...(type         && { type }),
        ...(totalSeats   && { totalSeats: Number(totalSeats) }),
        ...(amenities    && { amenities }),
        ...(busStyle     && { busStyle }),
        ...(status       && { status }),
        ...(lastServiced && { lastServiced: new Date(lastServiced) }),
      },
    });

    return sendSuccess(res, updated, 'Bus updated.');
  } catch (err) {
    console.error('[admin/fleet/:id PATCH]', err);
    return sendError(res, 'Failed to update bus.', 500);
  }
});

// ── DELETE /api/admin/fleet/:id ───────────────────────────────────
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const force = req.query.force === 'true';
    const bus = await prisma.bus.findUnique({
      where: { id },
      include: { _count: { select: { trips: true } } },
    });

    if (!bus) return sendError(res, 'Bus not found.', 404);

    if (bus._count.trips > 0) {
      if (force) {
        const trips = await prisma.trip.findMany({ where: { busId: id }, select: { id: true } });
        const tripIds = trips.map(t => t.id);
        if (tripIds.length > 0) {
          await prisma.busBooking.deleteMany({ where: { tripId: { in: tripIds } } });
          await prisma.trip.deleteMany({ where: { busId: id } });
        }
      } else {
        return sendError(res, `Cannot delete bus with ${bus._count.trips} associated trip(s). Retire it instead, or use ?force=true.`, 409);
      }
    }

    await prisma.bus.delete({ where: { id } });
    return sendSuccess(res, null, 'Bus removed from fleet.');
  } catch (err) {
    console.error('[admin/fleet/:id DELETE]', err);
    return sendError(res, 'Failed to delete bus.', 500);
  }
});

export default router;
