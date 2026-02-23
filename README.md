# Kypro AI — Intelligent Trading Signals

A modern, dark-themed landing page for Kypro AI, an AI-powered TSLA trading signals platform.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel

## Features

- 🎨 Modern dark theme with glassmorphism effects
- ⚡ Real-time Signals showcase
- 📊 Backtested Strategies section
- 🔔 Automated Alerts feature
- 💰 4-tier pricing (Free / Basic $49 / Pro $149 / VIP $499)
- 📧 Email waitlist collection with client-side state
- 📱 Fully responsive design
- 🚀 Optimized for Vercel deployment

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

## Deploy to Vercel

1. Push to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

Or use the Vercel CLI:

```bash
npx vercel
```

## Project Structure

```
kypro-ai-landing/
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind + custom styles
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── page.tsx           # Main landing page
│   └── components/
│       ├── Hero.tsx           # Hero section with stats
│       ├── Features.tsx       # 3 feature cards
│       ├── Pricing.tsx        # 4-tier pricing table
│       ├── Waitlist.tsx       # Email collection form
│       └── Footer.tsx         # Footer with disclaimer
├── public/
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vercel.json
├── package.json
└── README.md
```

## License

Proprietary — © 2026 Kypro AI
