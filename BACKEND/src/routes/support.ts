import { Router, Response } from 'express';
import { prisma } from '../prisma';
import { authenticateJWT, AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';

const router = Router();

// ── GET /api/support ──────────────────────────────────────────────
// Auth required — user's own tickets only
router.get('/', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const tickets = await prisma.supportTicket.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    });
    return sendSuccess(res, tickets);
  } catch (err) {
    console.error('[support GET]', err);
    return sendError(res, 'Failed to fetch support tickets.', 500);
  }
});

// ── POST /api/support ─────────────────────────────────────────────
// Auth required — open a new support ticket
router.post('/', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return sendError(res, 'subject and message are required.', 400);
    }

    if (subject.trim().length < 5) {
      return sendError(res, 'Subject must be at least 5 characters.', 400);
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        userId:  req.user!.id,
        subject: subject.trim(),
        message: message.trim(),
        status:  'Open',
      },
    });

    return sendSuccess(res, { ticket }, 'Support ticket created. We will respond within 24 hours.', 201);
  } catch (err) {
    console.error('[support POST]', err);
    return sendError(res, 'Failed to create support ticket.', 500);
  }
});

export default router;
