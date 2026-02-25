import { getRedis } from "./redis";

/**
 * Log an API visit to Redis for persistent tracking.
 * Uses a sorted set with timestamp as score for easy range queries.
 * Also increments daily counters.
 */
export async function logVisit(path: string, ua: string, ip: string, isAgent: boolean) {
  const redis = getRedis();
  if (!redis) return;

  try {
    const now = Date.now();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const entry = JSON.stringify({
      path,
      ua: ua.slice(0, 200),
      ip,
      isAgent,
      t: new Date().toISOString(),
    });

    // Recent visits log (sorted set, keep last 200)
    await redis.zadd("tspy:visits", { score: now, member: entry });
    // Trim to last 200
    const count = await redis.zcard("tspy:visits");
    if (count > 200) {
      await redis.zremrangebyrank("tspy:visits", 0, count - 201);
    }

    // Daily counters
    await redis.hincrby(`tspy:daily:${today}`, "total", 1);
    if (isAgent) {
      await redis.hincrby(`tspy:daily:${today}`, "agents", 1);
    }

    // Track unique IPs per day
    await redis.sadd(`tspy:ips:${today}`, ip);

    // If it's a checkout attempt, log separately (high priority!)
    if (path.includes("/checkout")) {
      await redis.lpush("tspy:checkouts", entry);
      await redis.ltrim("tspy:checkouts", 0, 49);
    }
  } catch (e) {
    // Don't let analytics errors break the API
    console.error("[visit-log]", e);
  }
}

/**
 * Get recent visits from Redis.
 */
export async function getRecentVisits(limit: number = 50) {
  const redis = getRedis();
  if (!redis) return [];

  try {
    const entries = await redis.zrange("tspy:visits", -limit, -1);
    return entries.reverse().map((e: unknown) => {
      try { return JSON.parse(e as string); } catch { return e; }
    });
  } catch {
    return [];
  }
}

/**
 * Get daily stats from Redis.
 */
export async function getDailyStats(date?: string) {
  const redis = getRedis();
  if (!redis) return null;

  const d = date || new Date().toISOString().slice(0, 10);
  try {
    const stats = await redis.hgetall(`tspy:daily:${d}`);
    const uniqueIPs = await redis.scard(`tspy:ips:${d}`);
    return {
      date: d,
      total: Number(stats?.total || 0),
      agents: Number(stats?.agents || 0),
      uniqueVisitors: uniqueIPs || 0,
    };
  } catch {
    return null;
  }
}
