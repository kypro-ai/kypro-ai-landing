import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kypro AI — Intelligent Trading Signals',
  description:
    'AI-powered TSLA trading signals. Backtested. Data-driven. Automated.',
  openGraph: {
    title: 'Kypro AI — Intelligent Trading Signals',
    description:
      'AI-powered TSLA trading signals. Backtested. Data-driven. Automated.',
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
