import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — TokenSpy",
  description:
    "TokenSpy Terms of Service — usage terms, licensing, prohibited activities, and enforcement policies.",
  openGraph: {
    title: "Terms of Service — TokenSpy",
    description:
      "Read the TokenSpy Terms of Service before using our API and content.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-dark-900 text-dark-100">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="text-4xl font-bold font-mono text-brand-400 mb-2">
          Terms of Service
        </h1>
        <p className="text-dark-400 text-sm font-mono mb-12">
          Last updated: February 25, 2026
        </p>

        <div className="space-y-10">
          {/* 1. License */}
          <section>
            <h2 className="text-xl font-bold text-dark-100 mb-3 flex items-center gap-2">
              <span className="text-brand-400">§1</span> License
            </h2>
            <div className="space-y-3 text-dark-300 leading-relaxed">
              <p>
                All content, data, and analyses provided through TokenSpy (&ldquo;the Service&rdquo;) are licensed
                on a <strong className="text-dark-100">single-user, non-transferable</strong> basis.
              </p>
              <p>
                Each API key is issued to a single individual or entity. Your license grants you
                the right to use the content for your personal or internal business purposes only.
              </p>
              <p>
                This license does not grant you ownership of the content. TokenSpy retains all
                intellectual property rights.
              </p>
            </div>
          </section>

          {/* 2. Prohibited Activities */}
          <section>
            <h2 className="text-xl font-bold text-dark-100 mb-3 flex items-center gap-2">
              <span className="text-brand-400">§2</span> Prohibited Activities
            </h2>
            <div className="space-y-3 text-dark-300 leading-relaxed">
              <p>The following activities are strictly prohibited:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>
                    <strong className="text-dark-100">Redistribution</strong> — Sharing, republishing,
                    or distributing purchased content in any form, including excerpts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>
                    <strong className="text-dark-100">Resale</strong> — Selling, sublicensing, or
                    commercially exploiting any TokenSpy content.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>
                    <strong className="text-dark-100">Bulk Scraping</strong> — Automated or systematic
                    downloading of content beyond normal usage patterns.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>
                    <strong className="text-dark-100">API Key Sharing</strong> — Sharing your API key
                    with other individuals or entities.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>
                    <strong className="text-dark-100">Rate Limit Evasion</strong> — Circumventing rate
                    limits through IP rotation, multiple accounts, or other means.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* 3. Enforcement */}
          <section>
            <h2 className="text-xl font-bold text-dark-100 mb-3 flex items-center gap-2">
              <span className="text-brand-400">§3</span> Enforcement
            </h2>
            <div className="space-y-3 text-dark-300 leading-relaxed">
              <p>
                Violation of these terms will result in{" "}
                <strong className="text-dark-100">immediate API key revocation</strong> without
                refund.
              </p>
              <p>
                TokenSpy reserves the right to pursue legal action for willful violations,
                including but not limited to claims for damages, injunctive relief, and
                recovery of legal costs.
              </p>
              <p>
                We employ automated abuse detection systems that monitor usage patterns in
                real time. Unusual activity may trigger temporary or permanent access
                restrictions.
              </p>
            </div>
          </section>

          {/* 4. Content Fingerprinting */}
          <section>
            <h2 className="text-xl font-bold text-dark-100 mb-3 flex items-center gap-2">
              <span className="text-brand-400">§4</span> Digital Fingerprinting
            </h2>
            <div className="space-y-3 text-dark-300 leading-relaxed">
              <p>
                Content delivered through the TokenSpy API is{" "}
                <strong className="text-dark-100">digitally fingerprinted</strong> for abuse
                detection purposes.
              </p>
              <p>
                Each piece of premium content contains invisible, unique markers tied to
                the API key used to access it. If content appears on unauthorized platforms
                or is shared in violation of these terms, we can trace it to the originating
                API key.
              </p>
              <p className="text-dark-400 text-sm italic">
                Fingerprints are invisible and do not alter the readable content.
              </p>
            </div>
          </section>

          {/* 5. Rate Limits */}
          <section>
            <h2 className="text-xl font-bold text-dark-100 mb-3 flex items-center gap-2">
              <span className="text-brand-400">§5</span> Rate Limits
            </h2>
            <div className="space-y-3 text-dark-300 leading-relaxed">
              <p>API access is subject to the following rate limits:</p>
              <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-4 font-mono text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-dark-400">Free tier</span>
                  <span className="text-dark-200">30 requests/minute</span>
                </div>
                <div className="border-t border-dark-700 my-1" />
                <div className="flex justify-between py-1">
                  <span className="text-dark-400">With API key</span>
                  <span className="text-brand-400">100 requests/minute</span>
                </div>
              </div>
              <p>
                Rate-limited responses return HTTP 429 with a{" "}
                <code className="text-brand-400 bg-dark-800 px-1.5 py-0.5 rounded text-sm">
                  Retry-After
                </code>{" "}
                header.
              </p>
            </div>
          </section>

          {/* 6. Refund Policy */}
          <section>
            <h2 className="text-xl font-bold text-dark-100 mb-3 flex items-center gap-2">
              <span className="text-brand-400">§6</span> Refund Policy
            </h2>
            <div className="space-y-3 text-dark-300 leading-relaxed">
              <p>
                We offer a <strong className="text-dark-100">24-hour refund window</strong> from the
                time of purchase.
              </p>
              <p>
                To request a refund, contact us within 24 hours of your purchase. Refunds are
                processed to the original payment method.
              </p>
              <p>
                Refunds are not available after the 24-hour window, or if our systems detect
                that the content was accessed, downloaded, or otherwise consumed before the
                refund request.
              </p>
            </div>
          </section>

          {/* 7. Disclaimer */}
          <section>
            <h2 className="text-xl font-bold text-dark-100 mb-3 flex items-center gap-2">
              <span className="text-brand-400">§7</span> Disclaimer
            </h2>
            <div className="space-y-3 text-dark-300 leading-relaxed">
              <p>
                TokenSpy content, including trading signals, is provided{" "}
                <strong className="text-dark-100">&ldquo;as is&rdquo;</strong> for informational
                purposes only. This is not financial, legal, or professional advice.
              </p>
              <p>
                Past performance of trading signals does not guarantee future results. Trade
                at your own risk. TokenSpy is not a registered investment advisor.
              </p>
            </div>
          </section>

          {/* 8. Contact */}
          <section>
            <h2 className="text-xl font-bold text-dark-100 mb-3 flex items-center gap-2">
              <span className="text-brand-400">§8</span> Contact
            </h2>
            <div className="space-y-3 text-dark-300 leading-relaxed">
              <p>
                For questions about these terms, contact us at{" "}
                <a
                  href="mailto:legal@tokenspy.ai"
                  className="text-brand-400 hover:text-brand-300 underline underline-offset-2"
                >
                  legal@tokenspy.ai
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 pt-8 border-t border-emerald-500/10 text-center">
          <p className="text-dark-500 text-xs font-mono">
            🛡️ TokenSpy — Content protected by digital fingerprinting and automated abuse detection.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
