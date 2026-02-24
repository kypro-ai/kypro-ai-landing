# I Used AI to Take a Shopify Store from 0 to 100 SEO Score in One Day — Here's Exactly How

**Published:** February 2026 · **Author:** TokenSpy Team · **Reading time:** 8 min

---

So last week a buddy of mine who runs a building materials company in Ontario asked me to "fix his SEO." I pulled up his Shopify store expecting maybe some missing meta tags. What I found was... worse.

115 products. Zero meta descriptions. 75 of them had literally the same copy-pasted paragraph. No schema markup. No internal links. Google Search Console? Never heard of it. His store was basically a ghost on Google.

I told him I'd knock it out in a day. He laughed. Here's how it went.

---

## The Damage Report

First thing I did was run an audit. Not with some fancy $200/month SEO tool — just AI and the sitemap. Thirty minutes later I had a list that made me want to cry:

- Not a single meta description. On anything. 68 products, 20 collections, all blank.
- 75 products sharing the SAME description. Copy. Paste. Repeat.
- No schema markup. Google literally didn't know this was a local business.
- Blog posts existed but had zero internal links. Just... floating in space.
- Featured images with alt text like "IMG_3847.jpg." Chef's kiss.

My friend was paying good money for his Shopify theme but nobody told him the content underneath was invisible.

---

## How I Actually Did It

### The blog posts came first (2 hours)

I wrote 6 articles targeting stuff people actually search for — "SPC vs WPC flooring which is better," "how much does flooring installation cost in Ontario," that kind of thing. Why blogs first? Because you need somewhere to link TO later.

### Then I went full automation mode (1 hour)

Here's where it gets nerdy. Clicking through Shopify admin to add meta descriptions one product at a time? At 68 products that's literally a full day of brain-melting boredom.

Instead I pulled everything through Shopify's JSON API, had AI write unique descriptions for each product based on its category and specs, and pushed them all back. 68 products. Updated in seconds. I actually laughed out loud when it worked.

Did the same for 13 collections and 3 pages. Every single page on the site went from "nothing" to "optimized."

### The part that almost broke me (1 hour of debugging)

Shopify has this fun thing where the product API ACCEPTS your meta description update, returns a happy 200 status code, and then... doesn't save it. Just pretends it worked. I spent an hour going "WHY ISN'T THIS UPDATING" before I found out you need to use a completely separate metafields endpoint. Cool. Very cool, Shopify.

Oh, and if you try to update a collection via the normal endpoint? 406 error. You need the `custom_collections` endpoint. This is not in any tutorial I've ever seen.

### Fixing the copy-paste disaster (2 hours)

75 identical product descriptions. This was the big one. My approach: I built rotating templates. 5 different description styles for SPC flooring, 3 for WPC, 10 for porcelain tile. Each template hits different angles — one talks about durability, another about installation ease, another about aesthetics. Then I plugged in each product's actual specs.

End result: every single product reads differently. Not AI-generic-differently. Actually-different-differently.

### The boring stuff that actually matters (1.5 hours)

Internal links between all 6 blog posts. Alt text on every image. LocalBusiness schema markup injected straight into the theme code (no $29/month app needed, thank you). Google Search Console setup with DNS verification. Google Business Profile cleaned up.

None of this is exciting. All of it matters.

---

## The Scoreboard

| Metric | Before | After |
|--------|--------|-------|
| Lighthouse SEO Score | ~50 | **100/100** |
| Products with meta descriptions | 0 | 68+ |
| Unique product descriptions | ~40 | 115 |
| Schema markup | Nothing | LocalBusiness |
| Google Search Console | Didn't exist | Active |
| Performance | — | 69/100 (Shopify ceiling) |

My buddy texted me "wait seriously?" when I showed him the Lighthouse report. Yeah. Seriously.

---

## Steal This Playbook

1. **Audit everything first.** Know what's broken before you touch anything.
2. **Write blog content targeting keywords people actually search.** This gives you link destinations.
3. **Batch-update via API.** Never click through admin one-by-one. Life's too short.
4. **Use rotating templates for product descriptions.** Unique AND scalable.
5. **Internal links + schema + alt text.** The boring stuff wins.
6. **Set up Google Search Console day one.** You need data to improve.
7. **Don't forget Google Business Profile.** Local search is where the money is.

The dirty secret of Shopify SEO? It's not hard. It's just tedious. AI makes it not tedious.

One day. One hundred out of one hundred. My buddy owes me dinner.

---

*TokenSpy.ai — We test AI tools so you don't have to. Want us to audit your store next? [Get in touch](/contact).*
