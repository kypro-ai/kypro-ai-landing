import { randomBytes } from "crypto";
import { getRedis } from "./redis";

export interface RequestLogEntry {
  timestamp: number;
  path: string;
  resourceId?: string;
}

export interface ApiKeyRecord {
  key: string;
  gadgetIds: string[];
  /** @deprecated Use gadgetIds instead */
  pitfallIds?: string[];
  createdAt: number;
  sessionId?: string;
  totalRequests: number;
  requestLog: RequestLogEntry[];
}

// In-memory fallback (used when Redis unavailable)
const memKeys = new Map<string, ApiKeyRecord>();

const KEY_PREFIX = "apikey:";
const SESSION_PREFIX = "session:";

/** Generate a new API key granting access to the given gadget IDs. */
export async function createApiKey(gadgetIds: string[], sessionId?: string): Promise<ApiKeyRecord> {
  const key = `tspy_${randomBytes(24).toString("hex")}`;
  const record: ApiKeyRecord = {
    key,
    gadgetIds,
    createdAt: Date.now(),
    sessionId,
    totalRequests: 0,
    requestLog: [],
  };

  const redis = getRedis();
  if (redis) {
    // Store key record (expire in 1 year)
    await redis.set(`${KEY_PREFIX}${key}`, JSON.stringify(record), { ex: 365 * 86400 });
    // Index by session ID for lookup
    if (sessionId) {
      await redis.set(`${SESSION_PREFIX}${sessionId}`, key, { ex: 365 * 86400 });
    }
  } else {
    memKeys.set(key, record);
  }

  return record;
}

/** Look up a key. Returns undefined if not found. */
export async function getApiKey(key: string): Promise<ApiKeyRecord | undefined> {
  const redis = getRedis();
  if (redis) {
    const data = await redis.get(`${KEY_PREFIX}${key}`);
    if (!data) return undefined;
    return typeof data === "string" ? JSON.parse(data) : data as ApiKeyRecord;
  }
  return memKeys.get(key);
}

/** Find a key by Stripe session ID. */
export async function findKeyBySession(sessionId: string): Promise<ApiKeyRecord | undefined> {
  const redis = getRedis();
  if (redis) {
    const key = await redis.get(`${SESSION_PREFIX}${sessionId}`);
    if (!key) return undefined;
    return getApiKey(key as string);
  }
  // Fallback to memory
  let found: ApiKeyRecord | undefined;
  memKeys.forEach((record) => {
    if (!found && record.sessionId === sessionId) found = record;
  });
  return found;
}

/** Add gadget access to an existing key. */
export async function grantAccess(key: string, gadgetId: string): Promise<boolean> {
  const record = await getApiKey(key);
  if (!record) return false;
  if (!record.gadgetIds.includes(gadgetId)) {
    record.gadgetIds.push(gadgetId);
    const redis = getRedis();
    if (redis) {
      await redis.set(`${KEY_PREFIX}${key}`, JSON.stringify(record), { ex: 365 * 86400 });
    }
  }
  return true;
}

/** Track a request against an API key. */
export async function trackKeyUsage(key: string, path: string, resourceId?: string): Promise<void> {
  const redis = getRedis();
  if (redis) {
    // Use a sorted set for rate tracking (score = timestamp)
    const trackKey = `usage:${key}`;
    const now = Date.now();
    await redis.zadd(trackKey, { score: now, member: `${now}:${path}:${resourceId || ""}` });
    // Keep only last hour of data
    await redis.zremrangebyscore(trackKey, 0, now - 3600000);
    // Expire the tracking key after 2 hours
    await redis.expire(trackKey, 7200);
    // Increment total count
    await redis.hincrby(`stats:${key}`, "total", 1);
  } else {
    const record = memKeys.get(key);
    if (!record) return;
    record.totalRequests++;
    record.requestLog.push({ timestamp: Date.now(), path, resourceId });
    if (record.requestLog.length > 1000) {
      record.requestLog = record.requestLog.slice(-1000);
    }
  }
}

/** Check if a key is being abused. */
export async function isAbusingKey(key: string): Promise<boolean> {
  const redis = getRedis();
  if (redis) {
    const trackKey = `usage:${key}`;
    const now = Date.now();
    const tenMinAgo = now - 600000;
    const count10min = await redis.zcount(trackKey, tenMinAgo, now);
    if (count10min > 50) return true;
    const countHour = await redis.zcount(trackKey, now - 3600000, now);
    if (countHour > 200) return true;
    return false;
  }
  // Fallback memory check
  const record = memKeys.get(key);
  if (!record) return false;
  const now = Date.now();
  const recent = record.requestLog.filter((r) => r.timestamp > now - 600000);
  return recent.length > 50;
}

/** Get usage statistics for a key. */
export async function getKeyUsage(key: string) {
  const redis = getRedis();
  if (redis) {
    const trackKey = `usage:${key}`;
    const now = Date.now();
    const total = (await redis.hget(`stats:${key}`, "total")) || 0;
    const lastHour = await redis.zcount(trackKey, now - 3600000, now);
    const last10min = await redis.zcount(trackKey, now - 600000, now);
    return {
      totalRequests: Number(total),
      requestsLastHour: lastHour,
      requestsLast10Min: last10min,
      uniqueResourcesAccessed: 0,
      lastRequestAt: null,
    };
  }
  return null;
}
