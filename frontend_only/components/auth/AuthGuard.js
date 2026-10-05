'use client';

/**
 * DEMO MODE – AuthGuard.js (frontend_only)
 * Always renders children immediately. No auth check, no redirect.
 */
export default function AuthGuard({ children }) {
  return children;
}
