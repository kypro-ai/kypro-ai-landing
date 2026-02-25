/**
 * In-memory rate limiter by IP address.
 * No external dependencies — lightweight and fast.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();
const MAX_IPS = 10000;

// Requests per minute
const DEFAULT_LIMIT = 30;
const PREMIUM_LIMIT = 100;
const WINDOW_MS = 60 * 1000; // 1 minute

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetMs: number;
}

/**
 * Check rate limit for a given IP.
 * @param ip - Client IP address
 * @param isPremium - Whether the request includes an API key
 */
export function checkRateLimit(ip: string, isPremium: boolean = false): RateLimitResult {
  const now = Date.now();
  const limit = isPremium ? PREMIUM_LIMIT : DEFAULT_LIMIT;

  // FIFO cleanup if we hit the cap
  if (store.size >= MAX_IPS && !store.has(ip)) {
    const firstKey = store.keys().next().value;
    if (firstKey !== undefined) {
      store.delete(firstKey);
    }
  }

  let entry = store.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(ip, entry);
  }

  // Remove timestamps outside the window
  const windowStart = now - WINDOW_MS;
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  if (entry.timestamps.length >= limit) {
    // Rate limited
    const oldestInWindow = entry.timestamps[0];
    const resetMs = oldestInWindow + WINDOW_MS - now;
    return {
      allowed: false,
      remaining: 0,
      resetMs: Math.max(resetMs, 0),
    };
  }

  // Allow request
  entry.timestamps.push(now);
  const remaining = limit - entry.timestamps.length;

  return {
    allowed: true,
    remaining,
    resetMs: 0,
  };
}
