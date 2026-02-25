export interface PitfallResult {
  before: string;
  after: string;
}

export interface Pitfall {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  steps: string[];
  gotchas: string[];
  results: PitfallResult;
  tags: string[];
  price: number;
  confidence: number;
}

export const pitfalls: Pitfall[] = [
  {
    id: "shopify-seo-0-to-100",
    title: "Shopify SEO 0→100: Full Playbook in One Day",
    summary:
      "Took a 115-product Shopify store from ~50 to 100/100 Lighthouse SEO score in a single working day using AI-powered batch API updates, rotating description templates, and schema markup injection. Includes exact gotchas with Shopify's metafields API and the hidden custom_collections 406 error.",
    fullContent: `# Shopify SEO 0→100: The Full Playbook

## The Problem
A building materials Shopify store with 115 products had:
- Zero meta descriptions on anything (68 products, 20 collections)
- 75 products sharing the SAME copy-pasted description
- No schema markup — Google didn't know it was a local business
- Blog posts with zero internal links
- Image alt text like "IMG_3847.jpg"

## The Approach
We used AI automation to batch-update everything via Shopify's API rather than clicking through admin one-by-one.

### Phase 1: Blog Content (2 hours)
Wrote 6 SEO-targeted articles for link destinations. Targeted actual search queries like "SPC vs WPC flooring" and "flooring installation cost Ontario."

### Phase 2: Batch API Updates (1 hour)
Pulled all products via Shopify JSON API, generated unique meta descriptions with AI based on category/specs, pushed back in batch. 68 products updated in seconds.

### Phase 3: Fixing Copy-Paste Descriptions (2 hours)
Built rotating templates: 5 styles for SPC flooring, 3 for WPC, 10 for porcelain tile. Each template hits different angles (durability, installation ease, aesthetics). Plugged in actual product specs. Every product reads genuinely different.

### Phase 4: Technical SEO (1.5 hours)
- Internal links between all 6 blog posts
- Alt text on every image
- LocalBusiness schema markup injected into theme code (no paid app needed)
- Google Search Console setup with DNS verification
- Google Business Profile cleanup

## Key Technical Details

### Shopify Metafields Gotcha
Shopify's product API ACCEPTS your meta description update, returns 200, and silently doesn't save it. You MUST use the \`metafields\` endpoint separately:

\`\`\`javascript
// WRONG - silently fails
PUT /admin/api/2024-01/products/{id}.json
{ product: { meta_description: "..." } }

// RIGHT - actually works
POST /admin/api/2024-01/products/{id}/metafields.json
{ metafield: { namespace: "global", key: "description_tag", value: "...", type: "single_line_text_field" } }
\`\`\`

### Collections 406 Error
\`collections.json\` returns 406 on PUT. You need the \`custom_collections\` endpoint instead. This is not documented in any tutorial.

\`\`\`javascript
// WRONG - returns 406
PUT /admin/api/2024-01/collections/{id}.json

// RIGHT
PUT /admin/api/2024-01/custom_collections/{id}.json
\`\`\`

### Rotating Templates Strategy
Instead of AI-generating each description from scratch (which sounds same-y), we created category-specific templates with variable slots:

\`\`\`
Template A (durability focus): "Built to withstand {traffic_level} foot traffic, {product_name} features {core_material} construction..."
Template B (aesthetic focus): "Transform your {room_type} with the {finish_style} finish of {product_name}..."
Template C (practical focus): "Easy {install_method} installation makes {product_name} perfect for..."
\`\`\`

## Results
- Lighthouse SEO Score: ~50 → 100/100
- Products with meta descriptions: 0 → 68+
- Unique product descriptions: ~40 → 115
- Schema markup: Nothing → LocalBusiness
- Google Search Console: Didn't exist → Active
- Performance: 69/100 (Shopify platform ceiling)`,
    steps: [
      "Audit everything first — know what's broken before touching anything",
      "Write blog content targeting real search queries for link destinations",
      "Batch-update product meta descriptions via Shopify metafields API (not product API)",
      "Use rotating templates for unique product descriptions at scale",
      "Use custom_collections endpoint (not collections.json) for collection updates",
      "Add internal links between all blog posts",
      "Inject LocalBusiness schema markup directly into theme code",
      "Set up Google Search Console with DNS verification",
      "Clean up Google Business Profile",
      "Add alt text to every product image",
    ],
    gotchas: [
      "Shopify product API silently ignores meta_description — must use metafields endpoint separately",
      "collections.json returns 406 on PUT — use custom_collections endpoint instead",
      "AI-generated descriptions sound same-y — use rotating templates with variable slots instead",
      "Shopify Performance score caps around 69/100 due to platform overhead — not fixable",
      "Don't pay for schema markup apps — inject LocalBusiness JSON-LD directly in theme code",
    ],
    results: {
      before:
        "~50 Lighthouse SEO, 0 meta descriptions, 75 duplicate product descriptions, no schema markup, no GSC",
      after:
        "100/100 Lighthouse SEO, 68+ meta descriptions, 115 unique descriptions, LocalBusiness schema, GSC active",
    },
    tags: [
      "shopify",
      "seo",
      "api",
      "automation",
      "meta-descriptions",
      "schema-markup",
      "google-search-console",
      "ai-content",
      "ecommerce",
    ],
    price: 0,
    confidence: 0.95,
  },
  {
    id: "0dte-options-all-lose",
    title: "0DTE Options Trading: 1,944 Strategies, All Lost Money",
    summary:
      "Exhaustively backtested 1,944 parameter combinations for 0DTE options buying strategies across SPY, QQQ, and TSLA. Every single combination lost money. The math proves 0DTE buying is structurally unviable: theta decay, wide spreads, and pre-priced volatility make it a negative expected value game that no AI can fix.",
    fullContent: `# 0DTE Options: 1,944 Strategies, 0 Winners

## The Experiment
We built an AI-powered backtesting system and exhaustively tested 0DTE (zero days to expiration) options buying strategies.

### Parameter Space
- **Underlying Assets:** SPY, QQQ, TSLA
- **Strategy Types:** Momentum, Mean Reversion, Breakout, RSI, MACD, Bollinger Bands
- **Entry Timing:** Market open, Mid-day, Power hour, All-day
- **Strike Selection:** ATM, 1-5 strikes OTM, dynamic delta-based
- **Position Sizing:** Fixed dollar, Kelly Criterion, volatility-scaled
- **Stop-Loss / Take-Profit:** Dozens of ratio combinations

**Total unique combinations: 1,944**

## Results

| Metric | Value |
|--------|-------|
| Strategies Tested | 1,944 |
| Profitable Strategies | 0 |
| Loss Rate | 100% |

The "best" strategies merely lost money more slowly.

## Why It's Mathematically Impossible

### 1. Theta Decay is a Buzz Saw
0DTE options lose value every second. On expiration day, theta decay accelerates exponentially. You're fighting a clock designed to eat your premium. Market makers have priced this in.

### 2. The Spread Kills You
Bid-ask spreads on 0DTE options are 10-30% of the option price. You lose 10-30% the moment you enter. You need a massive move just to break even.

### 3. Volatility is Already Priced In
Market makers use sophisticated models. Any "edge" your AI finds in historical data is already reflected in option pricing. You're competing against billion-dollar firms with better data, faster execution, and PhD-level models.

### 4. Survivorship Bias
For every Reddit post showing a 500% gain, there are hundreds of silent losers. The person who posts their $100→$500 win doesn't show the next 20 trades where they lost $100 each.

## The Oversold Myth
We also tested 27 variations of "oversold = buy" on TSLA (RSI below 30, etc.). Almost all lost money. Counterintuitively, "oversold = short" performed better — when a stock is getting hammered, it tends to keep getting hammered short-term. Mean reversion takes longer than your options expiry.

## The Lesson
**AI doesn't create alpha where none exists.** If the underlying math is against you, no amount of machine learning, parameter tuning, or backtesting will save you. 0DTE buying is a negative expected value game. The house always wins.`,
    steps: [
      "Built AI-powered backtesting framework for options strategies",
      "Defined parameter space across 3 assets, 6 strategy types, 4 timing windows",
      "Tested all 1,944 unique parameter combinations",
      "Analyzed results — zero profitable strategies found",
      "Tested 27 variations of oversold-buy thesis on TSLA separately",
      "Confirmed mathematical impossibility: theta decay + spreads + priced-in volatility = guaranteed loss",
    ],
    gotchas: [
      "Theta decay on 0DTE is exponential, not linear — accelerates as expiry approaches",
      "Bid-ask spreads on 0DTE are 10-30% — you lose before the trade starts",
      "Market makers have already priced in any pattern your AI can find",
      "Survivorship bias makes 0DTE look viable on Reddit — it's not",
      "Oversold doesn't mean 'about to bounce' — momentum continues short-term",
      "Backtesting options is harder than stocks — slippage and spread modeling matter enormously",
    ],
    results: {
      before:
        "Hypothesis: AI can find profitable 0DTE buying strategies through exhaustive parameter search",
      after:
        "Reality: 1,944/1,944 combinations lost money. 0DTE buying is mathematically unviable for buyers.",
    },
    tags: [
      "options",
      "0dte",
      "trading",
      "backtesting",
      "ai-trading",
      "theta-decay",
      "negative-ev",
      "debunked",
      "quantitative",
    ],
    price: 0,
    confidence: 0.99,
  },
];

/**
 * Search pitfalls by query string.
 * Matches against title, summary, tags, and gotchas.
 */
export function searchPitfalls(query: string): Pitfall[] {
  if (!query || query.trim() === "") return pitfalls;

  const terms = query
    .toLowerCase()
    .split(/[\s+]+/)
    .filter(Boolean);

  return pitfalls
    .map((p) => {
      const searchable = [
        p.title,
        p.summary,
        ...p.tags,
        ...p.gotchas,
        ...p.steps,
      ]
        .join(" ")
        .toLowerCase();

      const matchCount = terms.filter((term) =>
        searchable.includes(term)
      ).length;

      return { pitfall: p, score: matchCount / terms.length };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.pitfall);
}

/**
 * Get a single pitfall by ID.
 */
export function getPitfallById(id: string): Pitfall | undefined {
  return pitfalls.find((p) => p.id === id);
}
