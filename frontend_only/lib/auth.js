/**
 * DEMO MODE – auth.js (frontend_only)
 * Authentication is always mocked. A demo user is auto-seeded into
 * localStorage so all protected pages render without requiring real login.
 */

import { DEMO_USER } from './api';

// ── Seed demo user once on first load ──────────────────────────────────────────
function seedDemoUser() {
  if (typeof window === 'undefined') return;
  try {
    const existing = localStorage.getItem('vedbus_user');
    if (!existing || existing === 'null' || existing === 'undefined') {
      localStorage.setItem('vedbus_user', JSON.stringify(DEMO_USER));
      localStorage.setItem('vedbus_token', 'demo-token-seeded');
    }
  } catch {}
}

if (typeof window !== 'undefined') {
  seedDemoUser();
}

// ── Auth helpers (all return truthy in demo mode) ──────────────────────────────

export function getStoredUser() {
  if (typeof window === 'undefined') return DEMO_USER;
  seedDemoUser();
  try {
    const u = localStorage.getItem('vedbus_user');
    if (!u || u === 'null' || u === 'undefined') return DEMO_USER;
    const parsed = JSON.parse(u);
    return parsed && typeof parsed === 'object' ? parsed : DEMO_USER;
  } catch {
    return DEMO_USER;
  }
}

export function getStoredToken() {
  if (typeof window === 'undefined') return 'demo-token';
  return localStorage.getItem('vedbus_token') || 'demo-token';
}

/** Always returns true in demo mode so AuthGuard passes. */
export function isAuthenticated() {
  return true;
}

/** No-op in demo mode – modal will still open for UX demo purposes. */
export function openAuthModal(mode = 'login') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { mode } }));
  }
}

export async function logoutUser(redirectTo = '/') {
  if (typeof window !== 'undefined') {
    // In demo mode, keep the demo user in localStorage so UI stays intact,
    // but fire the auth-change event so the Header re-renders.
    window.dispatchEvent(new Event('vedbus-auth-change'));
    if (redirectTo) {
      window.location.href = redirectTo;
    }
  }
}

export function getUserAvatar(user) {
  if (user?.avatar && typeof user.avatar === 'string' && user.avatar.startsWith('http')) {
    return user.avatar;
  }
  const seed = String(user?.id || user?.email || user?.phone || user?.name || 'vedbus_user');
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const avatarIndex = (Math.abs(hash) % 70) + 1;
  return `https://i.pravatar.cc/150?img=${avatarIndex}`;
}
