import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { CTABand } from "@/components/ui";
import { PhotoPlaceholder } from "@/components/Placeholder";
import { blogPosts } from "@/lib/library";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article className="section">
        <div className="container max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-brand-300"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          <span className="eyebrow mt-8">{post.category}</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-soft">
            <span>{date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>

          <PhotoPlaceholder
            label={post.category}
            ratio="aspect-[16/9]"
            className="mt-8"
          />

          <div className="mt-10 space-y-5 leading-relaxed text-muted">
            <p className="text-lg text-foreground/90">{post.excerpt}</p>
            <p>
              This article is part of the M.I Tech NG insights series. Our full
              write-up is being prepared — in the meantime, our team is happy to
              walk you through these ideas and how they apply to your business.
            </p>
            <p>
              At M.I Tech, we believe AI should be practical and profitable. If
              a topic here sparks a question about your own operations, reach
              out and let&rsquo;s talk specifics.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-brand-500/20 bg-brand-500/[0.04] p-6">
            <p className="text-sm text-muted">
              Want this article as a full guide, or a session on the topic for
              your team?{" "}
              <Link href="/contact" className="font-medium text-brand-300">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
      <CTABand />
    </>
  );
}
