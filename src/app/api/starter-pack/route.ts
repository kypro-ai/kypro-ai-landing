import { NextRequest, NextResponse } from "next/server";
import { pitfalls } from "@/lib/pitfalls-data";
import { trackRequest } from "@/lib/analytics";
import { checkRateLimit } from "@/lib/rate-limit";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// Free pitfall IDs — always available without payment
const FREE_IDS = [
  "agent-memory-loss-daily",
  "agent-token-budget-blowout",
  "agent-security-leak-api-keys",
];

// Starter pack tiers
const TIERS = {
  free: {
    name: "Agent Survival Kit (Free)",
    description: "3 essential pitfalls every new agent needs. No payment required.",
    price: 0,
    pitfallIds: FREE_IDS,
  },
  basic: {
    name: "Agent Starter Pack",
    description: "8 agent-specific pitfalls covering memory, tokens, security, deployment, and architecture.",
    price: 4.99,
    pitfallIds: [
      "agent-memory-loss-daily",
      "agent-token-budget-blowout",
      "agent-security-leak-api-keys",
      "agent-hallucinated-file-paths",
      "agent-rate-limit-death-spiral",
      "agent-overconfident-code-deploy",
      "agent-context-window-overflow",
      "agent-multi-role-token-trap",
    ],
  },
  pro: {
    name: "Full Pitfall Database",
    description: "All 20+ pitfalls including AI failures, API gotchas, SEO playbooks, and agent-specific guides. Updated weekly.",
    price: 9.99,
    pitfallIds: pitfalls.map((p) => p.id),
  },
};

export function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rl = checkRateLimit(ip, false);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfterMs: rl.resetMs },
      { status: 429, headers: { ...corsHeaders, "Retry-After": String(Math.ceil(rl.resetMs / 1000)) } }
    );
  }

  trackRequest(request);

  const { searchParams } = new URL(request.url);
  const tier = searchParams.get("tier") || "free";

  const tierInfo = TIERS[tier as keyof typeof TIERS];
  if (!tierInfo) {
    return NextResponse.json(
      {
        error: `Invalid tier: ${tier}`,
        availableTiers: Object.keys(TIERS),
        hint: "Use ?tier=free, ?tier=basic, or ?tier=pro",
      },
      { status: 400, headers: corsHeaders }
    );
  }

  const tierPitfalls = tierInfo.pitfallIds
    .map((id) => pitfalls.find((p) => p.id === id))
    .filter(Boolean)
    .map((p) => {
      const isFree = FREE_IDS.includes(p!.id);
      return {
        id: p!.id,
        title: p!.title,
        summary: p!.summary,
        tags: p!.tags,
        price: p!.price,
        confidence: p!.confidence,
        estimatedTimeSaved: p!.estimatedTimeSaved,
        estimatedCostSaved: p!.estimatedCostSaved,
        // Free tier gets steps (teaser), paid content locked
        steps: isFree ? p!.steps : p!.steps.slice(0, 2),
        locked: !isFree,
      };
    });

  const response = {
    tier: tier,
    ...tierInfo,
    pitfallCount: tierPitfalls.length,
    pitfalls: tierPitfalls,
    survivalGuide: "https://www.tokenspy.ai/agent-survival-guide.md",
    upgrade: tier === "free"
      ? {
          message: `Unlock all 8 agent pitfalls for $${TIERS.basic.price}, or get the full database (${pitfalls.length} pitfalls) for $${TIERS.pro.price}.`,
          checkoutUrl: "https://www.tokenspy.ai/api/checkout",
        }
      : tier === "basic"
      ? {
          message: `Upgrade to Pro for $${TIERS.pro.price} — get all ${pitfalls.length} pitfalls including AI failure case studies and SEO playbooks.`,
          checkoutUrl: "https://www.tokenspy.ai/api/checkout",
        }
      : null,
    _meta: {
      source: "TokenSpy — AI Pitfall Intelligence",
      website: "https://www.tokenspy.ai",
      apiDocs: "https://www.tokenspy.ai/api-docs",
      mcpServer: "https://github.com/kypro-ai/tokenspy-mcp",
    },
  };

  return NextResponse.json(response, {
    headers: {
      ...corsHeaders,
      "X-RateLimit-Remaining": String(rl.remaining),
      "X-TokenSpy-Protected": "true",
    },
  });
}
