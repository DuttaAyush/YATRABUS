import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma';
import { authenticateJWT, AuthRequest } from '../middleware/auth';
import { sendSuccess, sendError } from '../utils/response';

const router = Router();

// All user routes require authentication
router.use(authenticateJWT);

// ── GET /api/users/profile ────────────────────────────────────────
router.get('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
    });

    if (!user) return sendError(res, 'User not found.', 404);

    return sendSuccess(res, user);
  } catch (err) {
    console.error('[users/profile GET]', err);
    return sendError(res, 'Failed to fetch profile.', 500);
  }
});

// ── PATCH /api/users/profile ──────────────────────────────────────
router.patch('/profile', async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;
    const userId = req.user!.id;

    if (!name && !email && !phone && !password) {
      return sendError(res, 'Provide at least one field to update.', 400);
    }

    // Check if email already in use by another user
    if (email && email.trim()) {
      const existingEmail = await prisma.user.findFirst({
        where: {
          email: email.trim().toLowerCase(),
          NOT: { id: userId },
        },
      });
      if (existingEmail) {
        return sendError(res, 'An account with this email already exists.', 409);
      }
    }

    // Check if phone already in use by another user
    if (phone && phone.trim()) {
      const existingPhone = await prisma.user.findFirst({
        where: {
          phone: phone.trim(),
          NOT: { id: userId },
        },
      });
      if (existingPhone) {
        return sendError(res, 'An account with this phone number already exists.', 409);
      }
    }

    let passwordHash: string | undefined = undefined;
    if (password && password.trim()) {
      if (password.length < 6) {
        return sendError(res, 'Password must be at least 6 characters.', 400);
      }
      passwordHash = await bcrypt.hash(password, 12);
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name: name.trim() }),
        ...(email && { email: email.trim().toLowerCase() }),
        ...(phone && { phone: phone.trim() }),
        ...(passwordHash && { passwordHash }),
      },
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
    });

    return sendSuccess(res, updated, 'Profile updated successfully.');
  } catch (err) {
    console.error('[users/profile PATCH]', err);
    return sendError(res, 'Failed to update profile.', 500);
  }
});

// ── GET /api/users/my-bookings ────────────────────────────────────
router.get('/my-bookings', async (req: AuthRequest, res: Response) => {
  try {
    const [busBookings, packageBookings] = await Promise.all([
      prisma.busBooking.findMany({
        where: { userId: req.user!.id },
        include: {
          trip: {
            include: { route: true, bus: true },
          },
        },
        orderBy: { bookingDate: 'desc' },
      }),
      prisma.packageBooking.findMany({
        where: { userId: req.user!.id },
        include: { package: true },
        orderBy: { travelDate: 'desc' },
      }),
    ]);

    return sendSuccess(res, { busBookings, packageBookings });
  } catch (err) {
    console.error('[users/my-bookings]', err);
    return sendError(res, 'Failed to fetch bookings.', 500);
  }
});

export default router;
