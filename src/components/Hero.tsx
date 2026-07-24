"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:56px_56px] opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-[110px]" />

      <div className="container relative py-24 md:py-32 lg:py-40">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={item} className="flex justify-center">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> AI-focused technology company
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            AI &amp; Automation{" "}
            <span className="text-gradient">Solutions</span> for Modern
            Businesses
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl"
          >
            We help businesses automate operations, save time, increase sales,
            and grow using Artificial Intelligence.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap justify-center gap-4"
          >
            <Link href="/discovery" className="btn-primary !px-7 !py-3.5">
              Book Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/portfolio" className="btn-outline !px-7 !py-3.5">
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
