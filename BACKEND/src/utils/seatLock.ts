// ── In-Memory Seat Lock Engine ────────────────────────────────────────────────
// Redis is disabled. All seat holds are managed in-process using a Map with
// auto-expiring timers. This works well for single-server deployments.
//
// To re-enable Redis (for multi-server / distributed locking):
//   1. npm install ioredis
//   2. Set REDIS_URL in .env
//   3. Restore the ioredis connection block and isRedisAvailable guard branches.
// ─────────────────────────────────────────────────────────────────────────────

interface InMemoryLock {
  holderId: string;
  expiresAt: number;
  timer: NodeJS.Timeout;
}

const inMemoryLocks = new Map<string, InMemoryLock>();

function getLockKey(tripId: string, seatNumber: string): string {
  return `seat_lock:${tripId}:${seatNumber}`;
}

// ── Public Interface ──────────────────────────────────────────────────────────

/**
 * Attempts to atomically hold a set of seats for a customer.
 * If any requested seat is already locked by someone else, NO seats are held (all-or-nothing).
 *
 * @param tripId - Trip ID
 * @param seatNumbers - Array of seat IDs (e.g. ['L1', 'L2'])
 * @param lockHolderId - Unique customer session/user identifier
 * @param ttlSeconds - Hold duration in seconds (default: 600 = 10 minutes)
 */
export async function tryHoldSeats(
  tripId: string,
  seatNumbers: string[],
  lockHolderId: string,
  ttlSeconds = 600
): Promise<{ success: boolean; conflictingSeats: string[]; ttlSeconds: number }> {
  const conflictingSeats: string[] = [];
  const now = Date.now();

  // All-or-nothing conflict check
  for (const seat of seatNumbers) {
    const key = getLockKey(tripId, seat);
    const existing = inMemoryLocks.get(key);
    if (existing && existing.expiresAt > now && existing.holderId !== lockHolderId) {
      conflictingSeats.push(seat);
    }
  }

  if (conflictingSeats.length > 0) {
    return { success: false, conflictingSeats, ttlSeconds };
  }

  // Atomically set in-memory locks
  for (const seat of seatNumbers) {
    const key = getLockKey(tripId, seat);
    const existing = inMemoryLocks.get(key);
    if (existing) {
      clearTimeout(existing.timer);
    }

    const timer = setTimeout(() => {
      inMemoryLocks.delete(key);
    }, ttlSeconds * 1000);

    inMemoryLocks.set(key, {
      holderId: lockHolderId,
      expiresAt: now + ttlSeconds * 1000,
      timer,
    });
  }

  return { success: true, conflictingSeats: [], ttlSeconds };
}

/**
 * Releases seats held by the specified customer.
 */
export async function releaseSeats(
  tripId: string,
  seatNumbers: string[],
  lockHolderId: string
): Promise<void> {
  for (const seat of seatNumbers) {
    const key = getLockKey(tripId, seat);
    const existing = inMemoryLocks.get(key);
    if (existing && existing.holderId === lockHolderId) {
      clearTimeout(existing.timer);
      inMemoryLocks.delete(key);
    }
  }
}

/**
 * Retrieves all seat numbers currently held on a trip across all sessions.
 */
export async function getHeldSeats(tripId: string): Promise<string[]> {
  const prefix = `seat_lock:${tripId}:`;
  const now = Date.now();
  const held: string[] = [];

  for (const [key, lock] of inMemoryLocks.entries()) {
    if (key.startsWith(prefix) && lock.expiresAt > now) {
      held.push(key.replace(prefix, ''));
    }
  }

  return held;
}

/**
 * Verifies whether the caller is authorized to book the specified seats.
 */
export async function verifySeatLocks(
  tripId: string,
  seatNumbers: string[],
  lockHolderId: string
): Promise<{ valid: boolean; unauthorizedSeats: string[] }> {
  const unauthorizedSeats: string[] = [];
  const now = Date.now();

  for (const seat of seatNumbers) {
    const key = getLockKey(tripId, seat);
    const existing = inMemoryLocks.get(key);
    if (existing && existing.expiresAt > now && existing.holderId !== lockHolderId) {
      unauthorizedSeats.push(seat);
    }
  }

  return { valid: unauthorizedSeats.length === 0, unauthorizedSeats };
}
