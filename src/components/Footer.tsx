import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-500/10 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm text-dark-400 font-mono">
            © 2026 TokenSpy
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6 text-sm text-dark-400">
            <Link href="/" className="hover:text-brand-400 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-brand-400 transition-colors">
              Blog
            </Link>
            <Link href="/#pricing" className="hover:text-brand-400 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-brand-400 transition-colors">
              About
            </Link>
            <Link href="/terms" className="hover:text-brand-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <a
            href="https://twitter.com/KyproAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-400 hover:text-brand-400 transition-colors"
            aria-label="Twitter"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://reddit.com/u/KyproAI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-400 hover:text-brand-400 transition-colors"
            aria-label="Reddit"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.06c.084.357.127.725.127 1.1 0 3.607-4.03 6.532-9.001 6.532S.19 17.767.19 14.16c0-.374.043-.741.126-1.098a1.854 1.854 0 01-.737-1.49c0-1.03.835-1.866 1.866-1.866.503 0 .96.2 1.296.524 1.266-.89 2.99-1.46 4.93-1.53l.985-4.537.016-.063a.37.37 0 01.44-.28l3.233.715c.213-.49.695-.838 1.257-.838a1.39 1.39 0 010 2.78 1.39 1.39 0 01-1.37-1.168l-2.877-.637-.87 4.015c1.9.086 3.58.66 4.82 1.54.337-.322.792-.52 1.293-.52 1.03 0 1.866.835 1.866 1.866 0 .58-.266 1.1-.684 1.44zM8.4 13.03a1.39 1.39 0 000 2.78 1.39 1.39 0 000-2.78zm5.6 4.882c-.482.482-1.282.72-2.382.72h-.035c-1.1 0-1.9-.238-2.382-.72a.457.457 0 01.646-.646c.336.336.986.512 1.736.512h.035c.75 0 1.4-.176 1.736-.512a.457.457 0 01.646.646zm-.36-2.102a1.39 1.39 0 000-2.78 1.39 1.39 0 000 2.78z" />
            </svg>
          </a>
          <a
            href="https://github.com/kypro-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-400 hover:text-brand-400 transition-colors"
            aria-label="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>

        <p className="mt-6 text-center text-xs text-dark-500 font-mono">
          Built by AI, verified by humans. All pitfall data is based on real testing.
          <br />
          TokenSpy™ 2026. All rights reserved. |{" "}
          <Link href="/terms" className="hover:text-brand-400 transition-colors">
            Terms
          </Link>{" "}
          |{" "}
          <Link href="/api-docs" className="hover:text-brand-400 transition-colors">
            API
          </Link>{" "}
          | contact@tokenspy.ai
        </p>
      </div>
    </footer>
  );
}
