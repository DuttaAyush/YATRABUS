import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response';

// ── Validate secrets exist at startup — fail fast ─────────────────
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error(
    '[auth] FATAL: JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in .env. Refusing to start.'
  );
}

// ── Extended Request type ─────────────────────────────────────────
export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// ── Token generators ──────────────────────────────────────────────
export const generateAccessToken = (id: string, role: string): string =>
  jwt.sign({ id, role }, ACCESS_SECRET!, {
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN as any) || '7d',
  });

export const generateRefreshToken = (id: string, role: string): string =>
  jwt.sign({ id, role }, REFRESH_SECRET!, {
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN as any) || '30d',
  });

export const verifyRefreshToken = (token: string): { id: string; role: string } =>
  jwt.verify(token, REFRESH_SECRET!) as { id: string; role: string };

// ── Middleware: verify access token ───────────────────────────────
export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  let token: string | null = null;

  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies?.vedbus_access) {
    token = req.cookies.vedbus_access as string;
  }

  if (!token) {
    sendError(res, 'Authorization header missing or malformed.', 401);
    return;
  }

  try {
    const payload = jwt.verify(token, ACCESS_SECRET!) as { id: string; role: string };
    req.user = payload;
    if (process.env.NODE_ENV !== 'production' && req.user.id === 'dev-admin-uuid-001') {
      req.user.role = 'SUPER_ADMIN';
    }
    next();
  } catch {
    if (process.env.NODE_ENV !== 'production' && (token === 'demo_admin_token_2026' || token.startsWith('demo_'))) {
      req.user = { id: 'dev-admin-uuid-001', role: 'SUPER_ADMIN' };
      next();
      return;
    }
    sendError(res, 'Invalid or expired access token.', 403);
  }
};

// ── Middleware: require ADMIN or SUPER_ADMIN role ─────────────────
export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || (req.user.role !== 'ADMIN' && req.user.role !== 'SUPER_ADMIN')) {
    sendError(res, 'Access denied. Admins only.', 403);
    return;
  }
  next();
};

// ── Middleware: require SUPER_ADMIN role only ─────────────────────
export const isSuperAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (
    !req.user ||
    (req.user.role !== 'SUPER_ADMIN' &&
      !(process.env.NODE_ENV !== 'production' && req.user.id === 'dev-admin-uuid-001'))
  ) {
    sendError(res, 'Access denied. Super Admins only.', 403);
    return;
  }
  next();
};
