export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-money-methods-what-actually-works",
    title:
      "I Spent a Weekend Testing 15 'Make Money with AI' Methods — Here's What Actually Works",
    description:
      "We analyzed 15 popular AI money-making methods from 6+ sources including Reddit community data. 3 brutal truths, 5 winners, 5 traps. Real data, no hype.",
    date: "2026-02-23",
    readTime: "12 min read",
    tags: ["AI Money", "Side Hustle", "Research"],
  },
  {
    slug: "0dte-options-ai-guaranteed-loss",
    title:
      "Why 0DTE Options Trading with AI is a Guaranteed Way to Lose Money",
    description:
      "We tested 1,944 parameter combinations for 0DTE options buying strategies. Every single one lost money. Here's exactly why, with the data to prove it.",
    date: "2026-02-22",
    readTime: "8 min read",
    tags: ["Trading", "Options", "AI Testing"],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
