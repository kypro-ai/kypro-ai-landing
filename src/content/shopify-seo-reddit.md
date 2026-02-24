# I Used AI to Take a Shopify Store from 0 to 100 SEO Score in One Day

So last week a buddy asked me to "fix his SEO." Building materials company in Ontario, 115 products on Shopify. What I found was brutal: zero meta descriptions, 75 products with identical copy-pasted descriptions, no schema markup, no Google Search Console. Basically invisible to Google.

I told him I'd knock it out in a day. He laughed.

**End result: Lighthouse SEO 100/100 in one day.**

Here's the short version:

**Blog posts first** — Wrote 6 articles targeting local keywords (comparison posts, cost guides). These become your internal link destinations.

**Batch everything via API** — Instead of clicking through Shopify admin one product at a time, I pulled products via Shopify's JSON API, generated meta descriptions with AI, and pushed them all back. 68 products updated in seconds. Then collections and pages.

**Fixed the copy-paste disaster** — 75 products had the exact same description. Built rotating templates per category (5 for SPC flooring, 10 for tile, etc.) with product-specific specs plugged in. Every product now reads genuinely different.

**The boring stuff** — LocalBusiness schema markup straight into the theme (no $29/month app), Google Search Console setup, internal links across all blog posts, alt text on every image, Google Business Profile optimization.

**Biggest technical gotcha:** Shopify's product API silently ignores meta description updates on PUT requests. Returns 200, changes nothing. You need the metafields endpoint separately. Also, `collections.json` returns 406 on PUT — need `custom_collections` endpoint. Neither is documented anywhere useful.

**Key takeaway:** Shopify SEO is mostly a volume problem. Each fix is simple — multiplied across 100+ products it takes weeks manually. AI compresses it to hours. But you still need a strategy first. AI without a plan is just fast randomness.

Full write-up with the complete playbook: [tokenspy.ai/blog/shopify-seo-ai](https://www.tokenspy.ai/blog/shopify-seo-ai)

What's your experience with AI + Shopify SEO? Anyone else batch-updating via the internal API?
