export default function ShopifySeoContent() {
  return (
    <div className="prose-custom">
      <p className="text-lg text-dark-200 leading-relaxed">
        So last week a buddy of mine who runs a building materials company in Ontario
        asked me to &quot;fix his SEO.&quot; I pulled up his Shopify store expecting maybe
        some missing meta tags. What I found was... worse.
      </p>

      <p className="text-dark-300">
        115 products. Zero meta descriptions. 75 of them had literally the same
        copy-pasted paragraph. No schema markup. No internal links. Google Search
        Console? Never heard of it. His store was basically a ghost on Google.
      </p>

      <p className="text-dark-300">
        I told him I&apos;d knock it out in a day. He laughed. Here&apos;s how it went.
      </p>

      {/* TL;DR */}
      <div className="my-10 glass-card rounded-2xl p-6 border-brand-500/20 bg-brand-500/5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <h3 className="text-lg font-semibold text-brand-300 font-mono">
              TL;DR — From Ghost to Perfect
            </h3>
            <p className="mt-1 text-dark-200">
              Took a Shopify store from ~50 to <strong className="text-brand-400">100/100 Lighthouse SEO score</strong> in
              one working day. 115 products, 20 collections, 6 blog articles — all optimized
              with AI automation. Here&apos;s the exact playbook.
            </p>
          </div>
        </div>
      </div>

      {/* The Damage Report */}
      <h2 className="text-2xl font-bold text-white font-mono mt-12 mb-6">
        🔍 The Damage Report
      </h2>

      <p className="text-dark-300">
        First thing I did was run an audit. Not with some fancy $200/month SEO tool — just
        AI and the sitemap. Thirty minutes later I had a list that made me want to cry:
      </p>

      <ul className="space-y-2 my-6">
        <li className="text-dark-200">❌ Not a single meta description. On anything. 68 products, 20 collections, all blank.</li>
        <li className="text-dark-200">❌ 75 products sharing the <strong className="text-red-400">SAME description</strong>. Copy. Paste. Repeat.</li>
        <li className="text-dark-200">❌ No schema markup. Google literally didn&apos;t know this was a local business.</li>
        <li className="text-dark-200">❌ Blog posts existed but had zero internal links. Just... floating in space.</li>
        <li className="text-dark-200">❌ Featured images with alt text like &quot;IMG_3847.jpg.&quot; Chef&apos;s kiss.</li>
      </ul>

      <p className="text-dark-300">
        My friend was paying good money for his Shopify theme but nobody told him
        the content underneath was invisible.
      </p>

      {/* How I Did It */}
      <h2 className="text-2xl font-bold text-white font-mono mt-12 mb-6">
        ⚡ How I Actually Did It
      </h2>

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">
        The blog posts came first (2 hours)
      </h3>

      <p className="text-dark-300">
        I wrote 6 articles targeting stuff people actually search for — &quot;SPC vs WPC
        flooring which is better,&quot; &quot;how much does flooring installation cost in Ontario,&quot;
        that kind of thing. Why blogs first? Because you need somewhere to link TO later.
      </p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-4">
        Then I went full automation mode
      </h3>

      <p className="text-dark-300">
        Here&apos;s where it gets nerdy. Clicking through Shopify admin to add meta descriptions
        one product at a time? At 68 products that&apos;s literally a full day of brain-melting boredom.
      </p>

      <p className="text-dark-300">
        Instead I pulled everything through Shopify&apos;s JSON API, had AI write unique descriptions
        for each product based on its category and specs, and pushed them all back. The key insight:
        you need the <code className="text-brand-400">metafields</code> endpoint, not the product API.
      </p>

      {/* Technical Gotcha - keep this as teaser */}
      <div className="my-6 glass-card rounded-2xl p-6 border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="text-lg font-semibold text-yellow-300 font-mono">
              Shopify API Gotcha
            </h3>
            <p className="mt-1 text-dark-200">
              Shopify&apos;s product API <strong>ACCEPTS</strong> your meta description update,
              returns a happy 200 status code, and then... doesn&apos;t save it. Just pretends it worked.
              You need to use the <code className="text-brand-400">metafields</code> endpoint separately.
            </p>
            <p className="mt-2 text-dark-200">
              Also: <code className="text-brand-400">collections.json</code> returns 406 on PUT.
              Need <code className="text-brand-400">custom_collections</code> endpoint instead.
              Not in any tutorial I&apos;ve ever seen.
            </p>
          </div>
        </div>
      </div>

      <p className="text-dark-300">
        Sounds simple enough, right? But the devil is in the details — the exact API calls,
        the CSRF workaround, the batch update script that handles rate limits, and the schema
        markup injection that doesn&apos;t need a $29/month app...
      </p>

      {/* BLUR LOCK — hides the actual how-to, code, and scripts */}
      <div className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 overflow-hidden mt-8">
        <div className="blur-sm select-none pointer-events-none text-dark-200 text-sm leading-relaxed space-y-2 max-h-48 overflow-hidden">
          <p>Step 1: Connect to Shopify Admin API using private app credentials and set up the metafields batch endpoint...</p>
          <p>Step 2: Batch update all 68 product meta descriptions via metafields API with rate-limit handling script...</p>
          <p>Step 3: Handle the collections.json 406 gotcha — switch to custom_collections endpoint with CSRF token workaround...</p>
          <p>Step 4: Rotating description templates — 5 SPC styles, 3 WPC styles, 10 porcelain tile variations with spec injection...</p>
          <p>Step 5: LocalBusiness schema markup injection directly into theme.liquid (no paid app needed)...</p>
          <p>Step 6: Internal link automation script — auto-link blog posts bidirectionally based on keyword matching...</p>
          <p>Step 7: Alt text batch updater — pull image filenames, generate descriptive alt text with AI, push back via API...</p>
          <p>Step 8: Google Search Console DNS verification shortcut and initial sitemap submission...</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] flex items-end justify-center pb-8">
          <div className="text-center">
            <p className="text-sm text-dark-300 font-mono mb-3">
              🔒 Full step-by-step playbook with code examples
            </p>
            <a href="/pitfalls/shopify-seo-0-to-100" className="inline-block rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20 active:scale-[0.98] font-mono">
              Unlock Full Playbook — $7.99
            </a>
          </div>
        </div>
      </div>

      {/* Scoreboard — keep for SEO value */}
      <h2 className="text-2xl font-bold text-white font-mono mt-12 mb-6">
        📊 The Scoreboard
      </h2>

      <div className="my-6 glass-card rounded-2xl p-6">
        <div className="space-y-3">
          {[
            { metric: "Lighthouse SEO Score", before: "~50", after: "100/100 ✅", highlight: true },
            { metric: "Products with meta descriptions", before: "0", after: "68+" },
            { metric: "Unique product descriptions", before: "~40", after: "115" },
            { metric: "Schema markup", before: "Nothing", after: "LocalBusiness" },
            { metric: "Google Search Console", before: "Didn't exist", after: "Active" },
            { metric: "Performance", before: "—", after: "69/100 (Shopify ceiling)" },
          ].map((row) => (
            <div key={row.metric} className="flex items-center justify-between py-2 border-b border-dark-600/30 last:border-0">
              <span className="text-dark-200 text-sm">{row.metric}</span>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-red-400">{row.before}</span>
                <span className="text-dark-400">→</span>
                <span className={row.highlight ? "text-brand-400 font-bold" : "text-brand-300"}>
                  {row.after}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-dark-300">
        My buddy texted me &quot;wait seriously?&quot; when I showed him the Lighthouse report.
        Yeah. Seriously.
      </p>

      {/* Playbook — teaser version */}
      <h2 className="text-2xl font-bold text-white font-mono mt-12 mb-6">
        🎯 The Playbook (Overview)
      </h2>

      <ol className="space-y-3 my-6">
        <li className="text-dark-200"><strong className="text-white">1. Audit everything first.</strong> Know what&apos;s broken before you touch anything.</li>
        <li className="text-dark-200"><strong className="text-white">2. Write blog content targeting keywords people actually search.</strong> This gives you link destinations.</li>
        <li className="text-dark-200"><strong className="text-white">3. Batch-update via API.</strong> Never click through admin one-by-one. Life&apos;s too short.</li>
        <li className="text-dark-200"><strong className="text-white">4. Use rotating templates for product descriptions.</strong> Unique AND scalable.</li>
        <li className="text-dark-200"><strong className="text-white">5. Internal links + schema + alt text.</strong> The boring stuff wins.</li>
        <li className="text-dark-200"><strong className="text-white">6. Set up Google Search Console day one.</strong> You need data to improve.</li>
        <li className="text-dark-200"><strong className="text-white">7. Don&apos;t forget Google Business Profile.</strong> Local search is where the money is.</li>
      </ol>

      <p className="text-dark-300">
        The dirty secret of Shopify SEO? It&apos;s not hard. It&apos;s just tedious. AI makes it not tedious.
        But the specific scripts, API calls, and workarounds took us a full day of debugging to figure out.
      </p>

      <p className="text-lg text-white font-semibold mt-8">
        One day. One hundred out of one hundred. My buddy owes me dinner.
      </p>

      {/* Bottom CTA */}
      <div className="mt-10 text-center">
        <a
          href="/pitfalls"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20 active:scale-[0.98]"
        >
          Get Pitfall Intel — From $2.99
        </a>
      </div>
    </div>
  );
}
