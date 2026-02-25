import { randomBytes } from "crypto";

export interface ApiKeyRecord {
  key: string;
  pitfallIds: string[];
  createdAt: number;
  sessionId?: string; // Stripe checkout session id
}

/**
 * In-memory API key store.
 * Will be replaced by a database later.
 */
const keys = new Map<string, ApiKeyRecord>();

/** Generate a new API key granting access to the given pitfall IDs. */
export function createApiKey(pitfallIds: string[], sessionId?: string): ApiKeyRecord {
  const key = `tspy_${randomBytes(24).toString("hex")}`;
  const record: ApiKeyRecord = {
    key,
    pitfallIds,
    createdAt: Date.now(),
    sessionId,
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
