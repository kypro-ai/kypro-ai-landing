export interface GadgetResult {
  before: string;
  after: string;
}

export interface Gadget {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  steps: string[];
  gotchas: string[];
  results: GadgetResult;
  tags: string[];
  price: number;
  confidence: number;
  estimatedTimeSaved: string;
  estimatedCostSaved: string;
}

export const gadgets: Gadget[] = [
  {
    id: "test-purchase",
    title: "🧪 Test Purchase — Payment Flow Verification",
    summary:
      "A $0.50 test item to verify the full purchase flow: checkout → Stripe payment → content delivery → API key generation.",
    fullContent: `# 🧪 Test Purchase Successful!

Congratulations — if you're reading this, the entire payment pipeline works:

1. ✅ Checkout API created a Stripe session
2. ✅ Stripe processed the payment
3. ✅ Success page loaded and called /api/deliver
4. ✅ Content was delivered to you
5. ✅ API key was generated (if applicable)

## What This Means
The TokenSpy payment infrastructure is fully operational.

## Technical Details
- Payment processor: Stripe (live mode)
- Content delivery: Direct session verification (no webhook dependency)
- API key: Auto-generated on purchase

This test item will be removed after verification.`,
    steps: [
      "Click Buy → redirected to Stripe Checkout",
      "Enter payment details ($0.50 minimum)",
      "Complete payment → redirected to success page",
      "Verify content delivery on success page",
      "Check API key generation",
    ],
    gotchas: [
      "This is a real $0.50 charge, not a test mode transaction",
      "Stripe minimum charge is $0.50 USD",
    ],
    results: {
      before: "Payment flow untested with real money",
      after: "Full end-to-end payment verification complete",
    },
    tags: ["test", "payment", "verification"],
    price: 0.50,
    confidence: 1.0,
    estimatedTimeSaved: "0 minutes — this is a test",
    estimatedCostSaved: "$0.50 well spent on peace of mind",
  },
];

/**
 * Search gadgets by query string.
 */
export function searchGadgets(query: string): Gadget[] {
  if (!query || query.trim() === "") return gadgets;

  const terms = query
    .toLowerCase()
    .split(/[\s+]+/)
    .filter(Boolean);

  return gadgets
    .map((g) => {
      const searchable = [
        g.title,
        g.summary,
        ...g.tags,
        ...g.gotchas,
        ...g.steps,
      ]
        .join(" ")
        .toLowerCase();

      const matchCount = terms.filter((term) =>
        searchable.includes(term)
      ).length;

      return { gadget: g, score: matchCount / terms.length };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.gadget);
}

/**
 * Get a single gadget by ID.
 */
export function getGadgetById(id: string): Gadget | undefined {
  return gadgets.find((g) => g.id === id);
}
