import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import AI101 from '@/components/AI101';
import Projects from '@/components/Projects';
import Report from '@/components/Report';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <UseCases />
      <AI101 />
      <Projects />
      <Report />
      <Pricing />
      <Footer />
    </main>
  );
}
