import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma';
import { sendSuccess, sendError } from '../../utils/response';

const router = Router();

// ── GET /api/admin/offers ─────────────────────────────────────────
// All offers (including expired/inactive — admin sees everything)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { validUntil: 'desc' },
    });
    return sendSuccess(res, offers);
  } catch (err) {
    console.error('[admin/offers GET]', err);
    return sendError(res, 'Failed to fetch offers.', 500);
  }
});

// ── POST /api/admin/offers ────────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const { code, discountPercentage, maxDiscountAmount, validUntil } = req.body;

    if (!code || !discountPercentage || !maxDiscountAmount || !validUntil) {
      return sendError(res, 'code, discountPercentage, maxDiscountAmount, and validUntil are required.', 400);
    }
    if (discountPercentage < 1 || discountPercentage > 100) {
      return sendError(res, 'discountPercentage must be between 1 and 100.', 400);
    }

    const expiry = new Date(validUntil);
    if (isNaN(expiry.getTime()) || expiry <= new Date()) {
      return sendError(res, 'validUntil must be a valid future date.', 400);
    }

    const existing = await prisma.offer.findUnique({ where: { code: code.trim().toUpperCase() } });
    if (existing) return sendError(res, 'An offer with this code already exists.', 409);

    const offer = await prisma.offer.create({
      data: {
        code:               code.trim().toUpperCase(),
        discountPercentage: Number(discountPercentage),
        maxDiscountAmount:  Number(maxDiscountAmount),
        validUntil:         expiry,
        isActive:           true,
      },
    });

    return sendSuccess(res, offer, 'Offer created.', 201);
  } catch (err) {
    console.error('[admin/offers POST]', err);
    return sendError(res, 'Failed to create offer.', 500);
  }
});

// ── PATCH /api/admin/offers/:id ───────────────────────────────────
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { discountPercentage, maxDiscountAmount, validUntil, isActive } = req.body;

    const offer = await prisma.offer.findUnique({ where: { id } });
    if (!offer) return sendError(res, 'Offer not found.', 404);

    const updated = await prisma.offer.update({
      where: { id },
      data: {
        ...(discountPercentage && { discountPercentage: Number(discountPercentage) }),
        ...(maxDiscountAmount  && { maxDiscountAmount:  Number(maxDiscountAmount) }),
        ...(validUntil         && { validUntil:         new Date(validUntil) }),
        ...(typeof isActive === 'boolean' && { isActive }),
      },
    });

    return sendSuccess(res, updated, 'Offer updated.');
  } catch (err) {
    console.error('[admin/offers/:id PATCH]', err);
    return sendError(res, 'Failed to update offer.', 500);
  }
});

// ── DELETE /api/admin/offers/:id ──────────────────────────────────
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const offer = await prisma.offer.findUnique({ where: { id } });
    if (!offer) return sendError(res, 'Offer not found.', 404);

    await prisma.offer.delete({ where: { id } });
    return sendSuccess(res, null, 'Offer deleted.');
  } catch (err) {
    console.error('[admin/offers/:id DELETE]', err);
    return sendError(res, 'Failed to delete offer.', 500);
  }
});

export default router;
