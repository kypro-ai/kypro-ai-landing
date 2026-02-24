import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog — Kypro AI | Real AI Testing, Real Results",
  description:
    "Read our latest findings from real-world AI testing. No hype, no affiliate links — just honest data on what works and what doesn't.",
  openGraph: {
    title: "Kypro AI Blog — Real AI Testing, Real Results",
    description:
      "Honest AI research backed by real experiments. We test so you don't waste.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-medium text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
              Blog
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              <span className="gradient-text">Research & Insights</span>
            </h1>
            <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
              We test AI methods with real money and real time, then write about
              what we find. No hype, no affiliate traps — just data.
            </p>
          </div>

          {/* Post Cards */}
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="glass-card rounded-2xl p-8 transition-all hover:bg-white/[0.06] hover:scale-[1.01] cursor-pointer group">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-brand-400 bg-brand-500/10 rounded-full px-2.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold text-white sm:text-2xl group-hover:text-brand-300 transition-colors">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-dark-300 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-sm text-dark-400">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
