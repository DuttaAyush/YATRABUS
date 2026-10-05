import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma';
import { sendSuccess, sendError } from '../../utils/response';

const router = Router();

// ── GET /api/admin/support ────────────────────────────────────────
// Admin sees ALL tickets across all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const page   = Math.max(1, parseInt(String(req.query.page   || '1')));
    const limit  = Math.min(50, parseInt(String(req.query.limit  || '20')));
    const skip   = (page - 1) * limit;
    const status = req.query.status ? String(req.query.status) : undefined;

    const where: any = {};
    if (status) where.status = status;

    const [tickets, total] = await Promise.all([
      prisma.supportTicket.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true, phone: true } },
        },
      }),
      prisma.supportTicket.count({ where }),
    ]);

    return sendSuccess(res, {
      tickets,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('[admin/support GET]', err);
    return sendError(res, 'Failed to fetch support tickets.', 500);
  }
});

// ── GET /api/admin/support/:id ────────────────────────────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!ticket) return sendError(res, 'Ticket not found.', 404);
    return sendSuccess(res, ticket);
  } catch (err) {
    console.error('[admin/support/:id GET]', err);
    return sendError(res, 'Failed to fetch ticket.', 500);
  }
});

// ── PATCH /api/admin/support/:id ─────────────────────────────────
// Update ticket status (In_Progress, Resolved, Closed)
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id     = String(req.params.id);
    const { status } = req.body;

    const valid = ['Open', 'In_Progress', 'Resolved', 'Closed'];
    if (!status || !valid.includes(status)) {
      return sendError(res, `status must be one of: ${valid.join(', ')}.`, 400);
    }

    const ticket = await prisma.supportTicket.findUnique({ where: { id } });
    if (!ticket) return sendError(res, 'Ticket not found.', 404);

    const updated = await prisma.supportTicket.update({
      where: { id },
      data: { status },
    });

    return sendSuccess(res, updated, `Ticket marked as ${status}.`);
  } catch (err) {
    console.error('[admin/support/:id PATCH]', err);
    return sendError(res, 'Failed to update ticket.', 500);
  }
});

export default router;
