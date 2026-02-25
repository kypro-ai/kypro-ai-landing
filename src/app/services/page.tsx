"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    id: "full-setup",
    name: "Full AI Assistant Setup",
    price: 99,
    period: null,
    description:
      "Complete OpenClaw installation + Telegram/Signal connection + custom personality (SOUL.md) + memory system + 3 skills of your choice. Ready to use in 24h.",
    features: [
      "Full OpenClaw installation & configuration",
      "Telegram or Signal bot connection",
      "Custom SOUL.md personality profile",
      "Memory system (MEMORY.md + daily logs)",
      "3 skills of your choice installed",
      "Ready to use within 24 hours",
    ],
    highlight: true,
  },
  {
    id: "custom-skill",
    name: "Custom Skill Development",
    price: 149,
    period: null,
    description:
      "We build a custom skill for your AI assistant. Anything from web scraping to API integrations to automated workflows. Includes testing + documentation.",
    features: [
      "Custom skill built to your spec",
      "Web scraping, API integrations, or workflows",
      "Full testing & QA",
      "Documentation & usage guide",
      "1 round of revisions included",
      "Delivered within 3-5 days",
    ],
    highlight: false,
  },
  {
    id: "node-connection",
    name: "Node Connection (Mac/Phone)",
    price: 39,
    period: null,
    description:
      "Connect your MacBook or phone to your AI assistant. Remote access, camera, screen, file management. Full walkthrough + troubleshooting.",
    features: [
      "MacBook or iPhone/Android node pairing",
      "Remote file access & management",
      "Camera & screen capture setup",
      "Full walkthrough via screen share",
      "Troubleshooting & verification",
      "30-min support session included",
    ],
    highlight: false,
  },
  {
    id: "trading-signals",
    name: "Trading Signal Setup",
    price: 79,
    period: null,
    description:
      "Automated TSLA/SPY/QQQ trading signals delivered to your Telegram. Includes backtested strategies, cron scheduling, and position sizing guidance.",
    features: [
      "TSLA, SPY & QQQ signal strategies",
      "Backtested with real market data",
      "Cron job scheduling setup",
      "Position sizing guidance",
      "Telegram delivery integration",
      "Strategy documentation included",
    ],
    highlight: false,
  },
  {
    id: "memory-personality",
    name: "Agent Memory & Personality",
    price: 49,
    period: null,
    description:
      "Professional SOUL.md, AGENTS.md, and MEMORY.md configuration. Make your AI actually useful — custom personality, workflows, and long-term memory.",
    features: [
      "Professional SOUL.md personality design",
      "AGENTS.md workflow configuration",
      "MEMORY.md long-term memory setup",
      "Custom tone, style & behavior rules",
      "Workflow automation templates",
      "Personality iteration & tuning",
    ],
    highlight: false,
  },
  {
    id: "monthly-maintenance",
    name: "Monthly AI Maintenance",
    price: 29,
    period: "/mo",
    description:
      "Ongoing maintenance: skill updates, memory cleanup, config optimization, priority support via Telegram.",
    features: [
      "Monthly skill updates & patches",
      "Memory cleanup & optimization",
      "Config tuning & performance review",
      "Priority Telegram support",
      "New feature recommendations",
      "Cancel anytime",
    ],
    highlight: false,
  },
];

export default function ServicesPage() {
  // Track page visit
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "/services" }),
    }).catch(() => {});
  }, []);

  const handleBuy = async (serviceId: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
              Professional Services
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-mono">
              <span className="gradient-text">AI Assistant Setup</span>
            </h1>
            <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
              We configure OpenClaw for you — from installation to custom skills.
              Stop wrestling with configs. Start using your AI in 24 hours.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className={`glass-card relative rounded-2xl p-8 flex flex-col transition-all hover:scale-[1.02] ${
                  service.highlight
                    ? "border-brand-500/50 ring-1 ring-brand-500/20 glow-hover"
                    : ""
                }`}
              >
                {service.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold font-mono text-white shadow-lg shadow-brand-600/30">
                    Most Popular
                  </div>
                )}

                <h3 className="text-lg font-semibold text-white font-mono">
                  {service.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-mono text-brand-400">
                    ${service.price}
                  </span>
                  {service.period && (
                    <span className="text-dark-400">{service.period}</span>
                  )}
                </div>

                <p className="mt-2 text-sm text-dark-400 leading-relaxed">
                  {service.description}
                </p>

                <ul className="mt-6 space-y-3 flex-1">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-dark-200"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleBuy(service.id)}
                  className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold font-mono transition-all active:scale-[0.98] cursor-pointer ${
                    service.highlight
                      ? "bg-brand-600 text-white hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20"
                      : "bg-emerald-500/5 border border-emerald-500/20 text-white/80 hover:bg-emerald-500/10 hover:text-white hover:border-emerald-500/40"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-white font-mono mb-3">
                Need something custom?
              </h2>
              <p className="text-dark-300 text-sm mb-4">
                We build bespoke AI workflows, integrations, and automations.
                Tell us what you need.
              </p>
              <a
                href="mailto:contact@tokenspy.ai"
                className="inline-block rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-sm font-semibold font-mono text-white hover:bg-white/10 transition-colors"
              >
                contact@tokenspy.ai
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
