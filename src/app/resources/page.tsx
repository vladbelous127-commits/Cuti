import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { PageHero, CTABand } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { resources } from "@/lib/library";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free AI resources from M.I Tech NG — the Prompt Book, AI guides, business checklists and downloadable PDFs.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Free tools to get you started with AI"
        intro="Practical, no-fluff resources you can use today — from the M.I Tech Prompt Book to business AI checklists."
      />
      <section className="section">
        <div className="container">
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {resources.map((r) => (
              <RevealItem key={r.title}>
                <div className="card card-hover group flex h-full items-start gap-5">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-300">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{r.title}</h3>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                        {r.type}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {r.desc}
                    </p>
                    <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition group-hover:text-brand-200">
                      <Download className="h-4 w-4" /> Download
                    </button>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <p className="mt-8 text-sm text-muted-soft">
            Downloads are being prepared. Want early access? Reach out via the
            contact page and we&rsquo;ll send them over.
          </p>
        </div>
      </section>
      <CTABand />
    </>
  );
}
