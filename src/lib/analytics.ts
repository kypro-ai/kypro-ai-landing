import { NextRequest } from "next/server";

// Known AI agent / bot patterns in User-Agent strings
const AGENT_PATTERNS = [
  "GPT",
  "OpenAI",
  "Claude",
  "Anthropic",
  "LangChain",
  "python-requests",
  "axios",
  "node-fetch",
  "curl",
  "httpie",
  "Go-http-client",
  "Postman",
];

// Common browser identifiers
const BROWSER_PATTERNS = ["Chrome", "Firefox", "Safari", "Edge", "Opera", "Brave"];

export interface RequestLog {
  timestamp: string;
  path: string;
  queryParams: Record<string, string>;
  userAgent: string;
  ip: string;
  isAgent: boolean;
  agentMatch: string | null;
}

const MAX_ENTRIES = 10000;
const requests: RequestLog[] = [];

/**
 * Detect whether a User-Agent string belongs to an AI agent/bot.
 * Returns the matched pattern or null.
 */
function detectAgent(userAgent: string): { isAgent: boolean; match: string | null } {
  if (!userAgent) {
    return { isAgent: true, match: "empty-ua" };
  }

  // Check for known agent patterns
  for (const pattern of AGENT_PATTERNS) {
    if (userAgent.toLowerCase().includes(pattern.toLowerCase())) {
      return { isAgent: true, match: pattern };
    }
  }

  // If no known agent pattern matched, check if it looks like a browser
  const isBrowser = BROWSER_PATTERNS.some((b) =>
    userAgent.includes(b)
  );

  if (!isBrowser) {
    return { isAgent: true, match: "unknown-non-browser" };
  }

  return { isAgent: false, match: null };
}

/**
 * Track an incoming API request.
 */
export function trackRequest(req: NextRequest): void {
  const url = new URL(req.url);
  const userAgent = req.headers.get("user-agent") || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const { isAgent, match } = detectAgent(userAgent);

  const queryParams: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  const entry: RequestLog = {
    timestamp: new Date().toISOString(),
    path: url.pathname,
    queryParams,
    userAgent,
    ip,
    isAgent,
    agentMatch: match,
  };

  requests.push(entry);

  // FIFO: cap at MAX_ENTRIES
  if (requests.length > MAX_ENTRIES) {
    requests.splice(0, requests.length - MAX_ENTRIES);
  }
}

/**
 * Get recent requests (most recent first).
 */
export function getRecentRequests(limit: number = 20): RequestLog[] {
  return requests.slice(-limit).reverse();
}

/**
 * Get aggregate analytics stats.
 */
export function getStats() {
  const totalRequests = requests.length;

  // Unique visitors by IP
  const uniqueIPs = new Set(requests.map((r) => r.ip));
  const uniqueVisitors = uniqueIPs.size;

  // Agent vs human breakdown
  const agentRequests = requests.filter((r) => r.isAgent).length;
  const humanRequests = totalRequests - agentRequests;

  // Top paths
  const pathCounts: Record<string, number> = {};
  for (const r of requests) {
    pathCounts[r.path] = (pathCounts[r.path] || 0) + 1;
  }
  const topPaths = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  // Top user agents
  const uaCounts: Record<string, number> = {};
  for (const r of requests) {
    const ua = r.userAgent || "(empty)";
    uaCounts[ua] = (uaCounts[ua] || 0) + 1;
  }
  const topUserAgents = Object.entries(uaCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([userAgent, count]) => ({ userAgent, count }));

  // Agent match breakdown
  const agentMatchCounts: Record<string, number> = {};
  for (const r of requests) {
    if (r.agentMatch) {
      agentMatchCounts[r.agentMatch] = (agentMatchCounts[r.agentMatch] || 0) + 1;
    }
  }
  const agentBreakdown = Object.entries(agentMatchCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([agent, count]) => ({ agent, count }));

  return {
    totalRequests,
    uniqueVisitors,
    agentRequests,
    humanRequests,
    agentPercentage:
      totalRequests > 0
        ? Math.round((agentRequests / totalRequests) * 100 * 10) / 10
        : 0,
    topPaths,
    topUserAgents,
    agentBreakdown,
    recentRequests: getRecentRequests(20),
  };
}
