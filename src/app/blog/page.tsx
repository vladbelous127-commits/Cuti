import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHero, CTABand } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { PhotoPlaceholder } from "@/components/Placeholder";
import { blogPosts } from "@/lib/library";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI for Nigerian businesses, prompt engineering, AI in healthcare and the future of AI — from M.I Tech NG.",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Ideas on AI for African business"
        intro="Practical articles on AI tools, automation and strategy — written to help you put AI to work."
      />

      <section className="section">
        <div className="container">
          {/* Featured */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-brand-500/30 md:grid-cols-2 md:items-center md:p-8"
            >
              <PhotoPlaceholder label={featured.category} ratio="aspect-[16/10]" />
              <div>
                <span className="eyebrow">{featured.category}</span>
                <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-4 text-sm text-muted-soft">
                  <span>{formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-brand-300">
                    Read <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <RevealGroup className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <RevealItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card card-hover group flex h-full flex-col"
                >
                  <PhotoPlaceholder label={post.category} ratio="aspect-[16/10]" />
                  <div className="mt-5 flex flex-1 flex-col">
                    <span className="text-xs font-medium uppercase tracking-wider text-brand-300">
                      {post.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 pt-2 text-xs text-muted-soft">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <CTABand />
    </>
  );
}
