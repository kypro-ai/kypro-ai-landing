"use client";

import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="waitlist" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl font-mono">
          Join the Waitlist
        </h2>
        <p className="mt-4 text-lg text-dark-300">
          Be the first to access our AI gadget database and token optimization
          toolkit. Free early access for waitlist members.
        </p>

        {status === "success" ? (
          <div className="mt-10 glass-card rounded-2xl p-8 border-brand-500/20 bg-brand-500/5">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-brand-300 font-mono">You&apos;re In!</h3>
            <p className="mt-2 text-dark-200">{message}</p>
          </div>
        ) : (
          <form
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3.5 text-white font-mono placeholder:text-dark-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              required
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Joining..." : "Get Early Access"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-400 font-mono">{message}</p>
        )}

        {status !== "success" && (
          <p className="mt-4 text-sm text-dark-400">
            No spam. Unsubscribe anytime. We respect your inbox (and your
            tokens).
          </p>
        )}
      </div>
    </section>
  );
}
