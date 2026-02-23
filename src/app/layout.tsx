import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kypro AI — AI Pitfall Guide & Token Optimizer',
  description:
    'We burned thousands in AI tokens so you don\'t have to. Get verified results, optimized prompts, and a map of what works.',
  openGraph: {
    title: 'Kypro AI — Stop Wasting AI Tokens',
    description:
      'Verified AI pitfalls, token optimization, and proven methods. We test so you don\'t waste.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
