import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TokenSpy — AI Undercover Testing & Pitfall Intelligence',
  description:
    'We go undercover inside AI tools so you don\'t get burned. Real tests, real results, real savings.',
  openGraph: {
    title: 'TokenSpy — We Test AI So You Don\'t Get Burned',
    description:
      'Undercover AI testing, verified pitfalls, and proven methods. Intelligence you can trust.',
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
