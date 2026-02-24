"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/#report", label: "Report" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold text-white tracking-tight">
          <span className="gradient-text">TokenGuard</span>{" "}
          <span className="text-lg">🛡️</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-dark-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#waitlist"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-500 active:scale-[0.98]"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-dark-950/95 backdrop-blur-xl px-6 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-dark-300 transition-colors hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              className="mt-2 rounded-lg bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-brand-500"
              onClick={() => setOpen(false)}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
