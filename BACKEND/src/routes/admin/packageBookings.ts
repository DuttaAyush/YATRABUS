import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma';
import { sendSuccess, sendError } from '../../utils/response';

const router = Router();

// ── GET /api/admin/package-bookings ──────────────────────────────
router.get('/', async (req: Request, res: Response) => {
  try {
    const page     = Math.max(1, parseInt(String(req.query.page     || '1')));
    const limit    = Math.min(50, parseInt(String(req.query.limit    || '20')));
    const skip     = (page - 1) * limit;
    const status   = req.query.status   ? String(req.query.status)   : undefined;
    const category = req.query.category ? String(req.query.category) : undefined;

    const where: any = {};
    if (status)   where.status = status;
    if (category) where.package = { category };

    const [bookings, total] = await Promise.all([
      prisma.packageBooking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { travelDate: 'desc' },
        include: {
          user:    { select: { name: true, email: true, phone: true } },
          package: { select: { title: true, category: true, durationDays: true } },
        },
      }),
      prisma.packageBooking.count({ where }),
    ]);

    return sendSuccess(res, {
      bookings,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('[admin/package-bookings GET]', err);
    return sendError(res, 'Failed to fetch package bookings.', 500);
  }
});

// ── GET /api/admin/package-bookings/:id ──────────────────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const booking = await prisma.packageBooking.findUnique({
      where: { id },
      include: {
        user:    { select: { id: true, name: true, email: true, phone: true } },
        package: true,
      },
    });

    if (!booking) return sendError(res, 'Package booking not found.', 404);
    return sendSuccess(res, booking);
  } catch (err) {
    console.error('[admin/package-bookings/:id GET]', err);
    return sendError(res, 'Failed to fetch package booking.', 500);
  }
});

// ── PATCH /api/admin/package-bookings/:id/status ─────────────────
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const id     = String(req.params.id);
    const { status } = req.body;

    const valid = ['Pending', 'Confirmed', 'Cancelled', 'Refunded'];
    if (!status || !valid.includes(status)) {
      return sendError(res, `status must be one of: ${valid.join(', ')}.`, 400);
    }

    const booking = await prisma.packageBooking.findUnique({ where: { id } });
    if (!booking) return sendError(res, 'Package booking not found.', 404);

    const updated = await prisma.packageBooking.update({
      where: { id },
      data: { status },
    });

    return sendSuccess(res, updated, `Package booking status updated to ${status}.`);
  } catch (err) {
    console.error('[admin/package-bookings/:id/status]', err);
    return sendError(res, 'Failed to update package booking status.', 500);
  }
});

export default router;
