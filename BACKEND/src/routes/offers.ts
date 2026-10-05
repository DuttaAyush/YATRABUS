import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { sendSuccess, sendError } from '../utils/response';

const router = Router();

// ── GET /api/offers ───────────────────────────────────────────────
// Public — all currently active and valid offers
router.get('/', async (_req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany({
      where: {
        isActive: true,
        validUntil: { gte: new Date() }, // exclude expired offers
      },
      orderBy: { validUntil: 'asc' },
    });
    return sendSuccess(res, offers);
  } catch (err) {
    console.error('[offers GET]', err);
    return sendError(res, 'Failed to fetch offers.', 500);
  }
});

// ── POST /api/offers/validate ─────────────────────────────────────
// Public — validate a promo code at checkout
router.post('/validate', async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
      return sendError(res, 'Offer code is required.', 400);
    }

    const offer = await prisma.offer.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (!offer || !offer.isActive || new Date(offer.validUntil) < new Date()) {
      return sendError(res, 'Invalid or expired offer code.', 400);
    }

    return sendSuccess(res, {
      code:               offer.code,
      discountPercentage: offer.discountPercentage,
      maxDiscountAmount:  Number(offer.maxDiscountAmount),
      validUntil:         offer.validUntil,
    }, 'Offer code is valid.');
  } catch (err) {
    console.error('[offers/validate]', err);
    return sendError(res, 'Failed to validate offer code.', 500);
  }
});

export default router;
