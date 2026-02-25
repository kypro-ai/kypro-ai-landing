"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [pitfallId, setPitfallId] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    // Verify payment and get API key
    fetch(`/api/keys`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.apiKey) {
          setApiKey(data.apiKey);
          setPitfallId(data.pitfallId || null);
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-2xl text-center">
          {status === "loading" && (
            <div>
              <div className="text-5xl mb-6">⏳</div>
              <h1 className="text-3xl font-extrabold text-white font-mono">
                Verifying Payment...
              </h1>
              <p className="mt-4 text-dark-300">
                Please wait while we confirm your purchase.
              </p>
            </div>
          )}

          {status === "success" && (
            <div>
              <div className="text-5xl mb-6">🎉</div>
              <h1 className="text-3xl font-extrabold text-white font-mono">
                Purchase Complete!
              </h1>
              <p className="mt-4 text-dark-300 text-lg">
                Thank you! Here&apos;s your API key for accessing premium content:
              </p>

              {/* API Key Display */}
              <div className="mt-8 glass-card rounded-2xl p-6 border border-brand-500/20">
                <p className="text-xs font-mono text-dark-400 mb-2">YOUR API KEY</p>
                <code className="text-brand-400 font-mono text-sm break-all select-all">
                  {apiKey}
                </code>
                <p className="mt-4 text-xs text-dark-500">
                  Save this key! Use it to access full content via the API.
                </p>
              </div>

              {/* How to use */}
              <div className="mt-8 glass-card rounded-2xl p-6 text-left">
                <h3 className="text-sm font-bold text-white font-mono mb-3">How to use:</h3>
                <pre className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed">
                  <code>{`curl "https://www.tokenspy.ai/api/pitfalls/${pitfallId || "YOUR_PITFALL_ID"}?key=${apiKey}"`}</code>
                </pre>
              </div>

              {/* Links */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                {pitfallId && (
                  <Link
                    href={`/pitfalls/${pitfallId}`}
                    className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white font-mono text-sm hover:bg-brand-500 transition-colors"
                  >
                    View Pitfall →
                  </Link>
                )}
                <Link
                  href="/pitfalls"
                  className="rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-semibold text-white font-mono text-sm hover:bg-white/10 transition-colors"
                >
                  Browse More Pitfalls
                </Link>
              </div>
            </div>
          )}

          {status === "error" && (
            <div>
              <div className="text-5xl mb-6">❌</div>
              <h1 className="text-3xl font-extrabold text-white font-mono">
                Something Went Wrong
              </h1>
              <p className="mt-4 text-dark-300">
                We couldn&apos;t verify your payment. If you were charged, please contact us at contact@tokenspy.ai with your session ID.
              </p>
              <Link
                href="/pitfalls"
                className="mt-8 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white font-mono text-sm hover:bg-brand-500 transition-colors"
              >
                Back to Pitfalls
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white font-mono">Loading...</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
