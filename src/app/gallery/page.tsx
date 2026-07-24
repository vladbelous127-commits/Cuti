import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { PhotoPlaceholder } from "@/components/Placeholder";
import { galleryCategories } from "@/lib/library";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from M.I Tech NG — speaking, networking, events, behind the scenes, workstation and office.",
};

// A varied set of tiles across categories for a masonry-style feel.
const tiles = [
  { c: "Speaking", span: "sm:col-span-2 sm:row-span-2", ratio: "aspect-square sm:aspect-auto sm:h-full" },
  { c: "Events", span: "", ratio: "aspect-square" },
  { c: "Networking", span: "", ratio: "aspect-square" },
  { c: "Behind the Scenes", span: "sm:col-span-2", ratio: "aspect-[2/1]" },
  { c: "Workstation", span: "", ratio: "aspect-square" },
  { c: "Office", span: "", ratio: "aspect-square" },
  { c: "Events", span: "", ratio: "aspect-square" },
  { c: "Speaking", span: "", ratio: "aspect-square" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Behind the M.I Tech brand"
        intro="Moments from speaking, events, networking and the day-to-day of building an AI consultancy."
      />

      <section className="section">
        <div className="container">
          <div className="mb-8 flex flex-wrap gap-2.5">
            {galleryCategories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-muted"
              >
                {c}
              </span>
            ))}
          </div>

          <RevealGroup className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-4 sm:grid-cols-4">
            {tiles.map((t, i) => (
              <RevealItem key={i} className={t.span}>
                <PhotoPlaceholder label={t.c} ratio={t.ratio} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTABand />
    </>
  );
}
