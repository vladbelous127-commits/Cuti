"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems, portfolioCategories } from "@/lib/library";
import { PhotoPlaceholder } from "./Placeholder";

export function PortfolioGrid() {
  const [active, setActive] = useState<string>("All");
  const filters = ["All", ...portfolioCategories];
  const items =
    active === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active === f
                ? "border-brand-500/50 bg-brand-500/15 text-brand-200"
                : "border-white/10 bg-white/[0.02] text-muted hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              <PhotoPlaceholder label={item.category} ratio="aspect-[4/3]" />
              <div className="mt-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <span className="text-xs uppercase tracking-wider text-brand-300">
                    {item.category}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
