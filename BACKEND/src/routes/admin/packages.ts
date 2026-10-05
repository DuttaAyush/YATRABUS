import { Router, Request, Response } from 'express';
import { prisma } from '../../prisma';
import { sendSuccess, sendError } from '../../utils/response';

const router = Router();

// ── GET /api/admin/packages ───────────────────────────────────────
router.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category ? String(req.query.category) : undefined;
    const where: any = {};
    if (category) where.category = category;

    const packages = await prisma.tourPackage.findMany({
      where,
      orderBy: { pricePerPerson: 'asc' },
      include: { _count: { select: { bookings: true } } },
    });

    return sendSuccess(res, packages);
  } catch (err) {
    console.error('[admin/packages GET]', err);
    return sendError(res, 'Failed to fetch packages.', 500);
  }
});

// ── POST /api/admin/packages ──────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, category, pricePerPerson, durationDays, itinerary } = req.body;

    if (!title || !category || !pricePerPerson || !durationDays) {
      return sendError(res, 'title, category, pricePerPerson, and durationDays are required.', 400);
    }

    const validCategories = ['Domestic', 'International', 'Spiritual'];
    if (!validCategories.includes(category)) {
      return sendError(res, `category must be one of: ${validCategories.join(', ')}.`, 400);
    }
    if (isNaN(Number(pricePerPerson)) || Number(pricePerPerson) <= 0) {
      return sendError(res, 'pricePerPerson must be a positive number.', 400);
    }

    const pkg = await prisma.tourPackage.create({
      data: {
        title,
        category,
        pricePerPerson: Number(pricePerPerson),
        durationDays:   Number(durationDays),
        itinerary:      itinerary || {},
        isActive:       true,
      },
    });

    return sendSuccess(res, pkg, 'Package created.', 201);
  } catch (err) {
    console.error('[admin/packages POST]', err);
    return sendError(res, 'Failed to create package.', 500);
  }
});

// ── GET /api/admin/packages/:id ───────────────────────────────────
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const pkg = await prisma.tourPackage.findUnique({
      where: { id },
      include: {
        bookings: {
          orderBy: { travelDate: 'desc' },
          take: 10,
          include: { user: { select: { name: true, email: true } } },
        },
        _count: { select: { bookings: true } },
      },
    });

    if (!pkg) return sendError(res, 'Package not found.', 404);
    return sendSuccess(res, pkg);
  } catch (err) {
    console.error('[admin/packages/:id GET]', err);
    return sendError(res, 'Failed to fetch package.', 500);
  }
});

// ── PATCH /api/admin/packages/:id ────────────────────────────────
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const { title, category, pricePerPerson, durationDays, itinerary, isActive } = req.body;

    const pkg = await prisma.tourPackage.findUnique({ where: { id } });
    if (!pkg) return sendError(res, 'Package not found.', 404);

    const updated = await prisma.tourPackage.update({
      where: { id },
      data: {
        ...(title          && { title }),
        ...(category       && { category }),
        ...(pricePerPerson && { pricePerPerson: Number(pricePerPerson) }),
        ...(durationDays   && { durationDays:   Number(durationDays) }),
        ...(itinerary      && { itinerary }),
        ...(typeof isActive === 'boolean' && { isActive }),
      },
    });

    return sendSuccess(res, updated, 'Package updated.');
  } catch (err) {
    console.error('[admin/packages/:id PATCH]', err);
    return sendError(res, 'Failed to update package.', 500);
  }
});

// ── DELETE /api/admin/packages/:id ───────────────────────────────
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const pkg = await prisma.tourPackage.findUnique({
      where: { id },
      include: { _count: { select: { bookings: true } } },
    });

    if (!pkg) return sendError(res, 'Package not found.', 404);

    if (pkg._count.bookings > 0) {
      // Soft deactivate instead of hard delete to preserve booking records
      await prisma.tourPackage.update({ where: { id }, data: { isActive: false } });
      return sendSuccess(res, null, `Package deactivated (has ${pkg._count.bookings} booking(s) — cannot hard delete).`);
    }

    await prisma.tourPackage.delete({ where: { id } });
    return sendSuccess(res, null, 'Package deleted.');
  } catch (err) {
    console.error('[admin/packages/:id DELETE]', err);
    return sendError(res, 'Failed to delete package.', 500);
  }
});

export default router;
