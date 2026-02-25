import { randomBytes } from "crypto";

export interface RequestLogEntry {
  timestamp: number;
  path: string;
  resourceId?: string; // pitfallId or signalId
}

export interface ApiKeyRecord {
  key: string;
  pitfallIds: string[];
  createdAt: number;
  sessionId?: string; // Stripe checkout session id
  // Usage tracking
  totalRequests: number;
  requestLog: RequestLogEntry[];
}

/**
 * In-memory API key store.
 * Will be replaced by a database later.
 */
const keys = new Map<string, ApiKeyRecord>();

const MAX_LOG_ENTRIES = 1000;

/** Generate a new API key granting access to the given pitfall IDs. */
export function createApiKey(pitfallIds: string[], sessionId?: string): ApiKeyRecord {
  const key = `tspy_${randomBytes(24).toString("hex")}`;
  const record: ApiKeyRecord = {
    key,
    pitfallIds,
    createdAt: Date.now(),
    sessionId,
    totalRequests: 0,
    requestLog: [],
  };
  keys.set(key, record);
  return record;
}

/** Look up a key. Returns undefined if not found. */
export function getApiKey(key: string): ApiKeyRecord | undefined {
  return keys.get(key);
}

/** Add pitfall access to an existing key. */
export function grantAccess(key: string, pitfallId: string): boolean {
  const record = keys.get(key);
  if (!record) return false;
  if (!record.pitfallIds.includes(pitfallId)) {
    record.pitfallIds.push(pitfallId);
  }
  return true;
}

/** Find a key by Stripe session ID. */
export function findKeyBySession(sessionId: string): ApiKeyRecord | undefined {
  let found: ApiKeyRecord | undefined;
  keys.forEach((record) => {
    if (!found && record.sessionId === sessionId) {
      found = record;
    }
  });
  return found;
}

/**
 * Track a request against an API key.
 * Call this whenever a valid key is used.
 */
export function trackKeyUsage(key: string, path: string, resourceId?: string): void {
  const record = keys.get(key);
  if (!record) return;

  record.totalRequests++;
  record.requestLog.push({
    timestamp: Date.now(),
    path,
    resourceId,
  });

  // Keep only the last MAX_LOG_ENTRIES entries
  if (record.requestLog.length > MAX_LOG_ENTRIES) {
    record.requestLog = record.requestLog.slice(-MAX_LOG_ENTRIES);
  }
}

/**
 * Check if a key is being abused.
 * Returns true if:
 * - More than 50 requests in the last 10 minutes
 * - Requested ALL pitfalls within 5 minutes (bulk scraping pattern)
 * - More than 200 requests in the last hour
 */
export function isAbusingKey(key: string): boolean {
  const record = keys.get(key);
  if (!record) return false;

  const now = Date.now();
  const tenMinutesAgo = now - 10 * 60 * 1000;
  const fiveMinutesAgo = now - 5 * 60 * 1000;
  const oneHourAgo = now - 60 * 60 * 1000;

  const recentLog = record.requestLog;

  // Check: More than 50 requests in 10 minutes
  const requestsIn10Min = recentLog.filter((r) => r.timestamp > tenMinutesAgo).length;
  if (requestsIn10Min > 50) return true;

  // Check: More than 200 requests in 1 hour
  const requestsIn1Hour = recentLog.filter((r) => r.timestamp > oneHourAgo).length;
  if (requestsIn1Hour > 200) return true;

  // Check: Requested ALL pitfalls within 5 minutes (bulk scraping)
  // We import pitfall count dynamically to avoid circular deps
  const recentResourceIds = new Set(
    recentLog
      .filter((r) => r.timestamp > fiveMinutesAgo && r.resourceId)
      .map((r) => r.resourceId)
  );
  // If they've accessed 10+ unique resources in 5 minutes, flag as scraping
  if (recentResourceIds.size >= 10) return true;

  return false;
}

/**
 * Get usage statistics for a key.
 */
export function getKeyUsage(key: string): {
  totalRequests: number;
  requestsLastHour: number;
  requestsLast10Min: number;
  uniqueResourcesAccessed: number;
  lastRequestAt: number | null;
} | null {
  const record = keys.get(key);
  if (!record) return null;

  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  const tenMinutesAgo = now - 10 * 60 * 1000;

  const requestsLastHour = record.requestLog.filter((r) => r.timestamp > oneHourAgo).length;
  const requestsLast10Min = record.requestLog.filter((r) => r.timestamp > tenMinutesAgo).length;
  const uniqueResources = new Set(
    record.requestLog.filter((r) => r.resourceId).map((r) => r.resourceId)
  );
  const lastEntry = record.requestLog.length > 0
    ? record.requestLog[record.requestLog.length - 1]
    : null;

  return {
    totalRequests: record.totalRequests,
    requestsLastHour,
    requestsLast10Min,
    uniqueResourcesAccessed: uniqueResources.size,
    lastRequestAt: lastEntry ? lastEntry.timestamp : null,
  };
}
