import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Report from '@/components/Report';
import Pricing from '@/components/Pricing';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Report />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
