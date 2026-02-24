import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import AiMoneyMethodsContent from "@/components/blog/AiMoneyMethodsContent";
import ZeroDteOptionsContent from "@/components/blog/ZeroDteOptionsContent";

const contentMap: Record<string, React.ComponentType> = {
  "ai-money-methods-what-actually-works": AiMoneyMethodsContent,
  "0dte-options-ai-guaranteed-loss": ZeroDteOptionsContent,
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — TokenGuard Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const Content = contentMap[params.slug];
  if (!Content) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-sm font-mono text-dark-400 hover:text-brand-400 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight font-mono">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-4 text-sm text-dark-400 font-mono">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>By TokenGuard Research Team</span>
          </div>

          {/* Divider */}
          <div className="my-10 border-t border-emerald-500/10" />

          {/* Content */}
          <Content />
        </div>
      </article>

      <Footer />
    </main>
  );
}
