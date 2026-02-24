import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TokenGuard — AI Pitfall Guide & Token Optimizer',
  description:
    'We burned thousands in AI tokens so you don\'t have to. Get verified results, optimized prompts, and a map of what works.',
  openGraph: {
    title: 'TokenGuard — Stop Wasting AI Tokens',
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
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        {/* Scanline overlay */}
        <div className="scanline-overlay" />
        {children}
      </body>
    </html>
  );
}
