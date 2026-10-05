import { Response } from 'express';

/**
 * Standard success response envelope.
 * All routes must use this — never call res.json() directly.
 */
export const sendSuccess = (
  res: Response,
  data: unknown,
  message = 'Success',
  statusCode = 200
) => {
  return res.status(statusCode).json({ success: true, message, data });
};

/**
 * Standard error response envelope.
 * All routes must use this — never call res.json({ error }) directly.
 */
export const sendError = (
  res: Response,
  message = 'Something went wrong.',
  statusCode = 500
) => {
  return res.status(statusCode).json({ success: false, message });
};
