import { Router } from 'express';
import { authenticateJWT } from '../../middleware/auth';
import { isAdmin } from '../../middleware/auth';

import dashboardRoutes      from './dashboard';
import userRoutes           from './users';
import bookingRoutes        from './bookings';
import packageBookingRoutes from './packageBookings';
import tripRoutes           from './trips';
import fleetRoutes          from './fleet';
import busRouteRoutes       from './routes';
import packageRoutes        from './packages';
import supportRoutes        from './support';
import offerRoutes          from './offers';
import analyticsRoutes      from './analytics';
import adminManagementRoutes from './admins';

const router = Router();

// Apply auth + admin guard to every route under /api/admin/*
router.use(authenticateJWT);
router.use(isAdmin);

router.use('/dashboard',        dashboardRoutes);
router.use('/users',            userRoutes);
router.use('/bookings',         bookingRoutes);
router.use('/package-bookings', packageBookingRoutes);
router.use('/trips',            tripRoutes);
router.use('/fleet',            fleetRoutes);
router.use('/routes',           busRouteRoutes);
router.use('/packages',         packageRoutes);
router.use('/support',          supportRoutes);
router.use('/offers',           offerRoutes);
router.use('/analytics',        analyticsRoutes);
// Super-admin only — has its own isSuperAdmin guard inside
router.use('/admins',           adminManagementRoutes);

export default router;

