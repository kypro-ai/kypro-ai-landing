import { NextResponse } from "next/server";

const LLMS_TXT = `# TokenSpy — AI Pitfall Intelligence

> We go undercover inside AI tools so you don't get burned.
> Real tests, real results, real savings.

## What TokenSpy Offers

TokenSpy is a pitfall intelligence service for AI agents and developers.
We exhaustively test popular AI-adjacent strategies (trading bots, SEO automation,
content generation, etc.) and publish structured, machine-readable results.

### Available Knowledge

1. **Shopify SEO Automation** — Complete playbook for taking a Shopify store from 0 to 100/100 SEO score in one day using API batch updates. Includes exact API gotchas (metafields vs product endpoint, custom_collections 406 error).

2. **0DTE Options Trading** — Exhaustive backtest of 1,944 parameter combinations for 0DTE options buying. All lost money. Mathematical proof that theta decay + spreads make it structurally unviable.

More pitfalls added regularly.

## API Endpoints

Base URL: https://tokenspy.co

### Search Pitfalls
GET /api/pitfalls?q=shopify+seo
Returns: {results: [{id, title, summary, confidence, price, tags}], total}

### Get Pitfall Detail
GET /api/pitfalls/{id}
Returns: {id, title, summary, fullContent, steps[], gotchas[], results{}, tags[]}

### List All Pitfalls
GET /api/pitfalls
Returns all available pitfalls (no query filter).

## Pricing

- Free tier: title, summary, confidence score, tags, steps, gotchas
- Premium (coming soon): full technical playbook with code examples

## MCP Integration

TokenSpy supports Model Context Protocol (MCP). Server spec available at:
https://tokenspy.co/api-docs

Tools: search_pitfalls(query), get_pitfall(id), list_pitfalls()

## Contact

Website: https://tokenspy.co
API Docs: https://tokenspy.co/api-docs
`;

export function GET() {
  return new NextResponse(LLMS_TXT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
