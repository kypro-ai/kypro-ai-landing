import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AI101 from '@/components/AI101';
import Report from '@/components/Report';
import Pricing from '@/components/Pricing';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <AI101 />
      <Report />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
