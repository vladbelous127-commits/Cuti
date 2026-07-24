import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
      <div className="container relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="bg-gradient-to-br from-brand-300 to-gold bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
          404
        </span>
        <h1 className="mt-6 text-2xl font-semibold text-white md:text-3xl">
          This page took a different path
        </h1>
        <p className="mt-3 max-w-md text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
          Let&rsquo;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link href="/services" className="btn-outline">
            <ArrowLeft className="h-4 w-4" /> Explore services
          </Link>
        </div>
      </div>
    </section>
  );
}
