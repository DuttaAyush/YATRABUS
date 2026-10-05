import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma';
import { sendSuccess, sendError } from '../../utils/response';

const router = Router();

// ── GET /api/admin/bookings ───────────────────────────────────────
// All bus bookings, paginated + filterable
router.get('/', async (req: Request, res: Response) => {
  try {
    const page   = Math.max(1, parseInt(String(req.query.page  || '1')));
    const limit  = Math.min(50, parseInt(String(req.query.limit || '20')));
    const skip   = (page - 1) * limit;
    const status = req.query.status ? String(req.query.status) : undefined;
    const search = req.query.search ? String(req.query.search) : undefined;

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        { user: { name:  { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const [bookings, total] = await Promise.all([
      prisma.busBooking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { bookingDate: 'desc' },
        include: {
          user: { select: { name: true, email: true, phone: true } },
          trip: { include: { route: true, bus: true } },
        },
      }),
      prisma.busBooking.count({ where }),
    ]);

    return sendSuccess(res, {
      bookings,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('[admin/bookings GET]', err);
    return sendError(res, 'Failed to fetch bookings.', 500);
  }
});

// ── GET /api/admin/bookings/:id ───────────────────────────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const booking = await prisma.busBooking.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        trip: { include: { route: true, bus: true } },
      },
    });

    if (!booking) return sendError(res, 'Booking not found.', 404);
    return sendSuccess(res, booking);
  } catch (err) {
    console.error('[admin/bookings/:id GET]', err);
    return sendError(res, 'Failed to fetch booking.', 500);
  }
});

// ── PATCH /api/admin/bookings/:id/status ─────────────────────────
// Confirm / Cancel / Refund a booking
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const id     = String(req.params.id);
    const { status } = req.body;

    const valid = ['Pending', 'Confirmed', 'Cancelled', 'Refunded'];
    if (!status || !valid.includes(status)) {
      return sendError(res, `status must be one of: ${valid.join(', ')}.`, 400);
    }

    const booking = await prisma.busBooking.findUnique({ where: { id } });
    if (!booking) return sendError(res, 'Booking not found.', 404);

    const updated = await prisma.busBooking.update({
      where: { id },
      data: { status },
    });

    return sendSuccess(res, updated, `Booking status updated to ${status}.`);
  } catch (err) {
    console.error('[admin/bookings/:id/status]', err);
    return sendError(res, 'Failed to update booking status.', 500);
  }
});

export default router;
