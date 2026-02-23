export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-dark-400">
            © 2026 Kypro AI — A product of Kypro Distribution Inc.
          </div>
          <div className="flex gap-6 text-sm text-dark-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#waitlist" className="hover:text-white transition-colors">Waitlist</a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-dark-500">
          Built by AI, verified by humans. All pitfall data is based on real testing.
        </p>
      </div>
    </footer>
  );
}
