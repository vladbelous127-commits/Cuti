import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { DiscoveryForm } from "@/components/DiscoveryForm";

export const metadata: Metadata = {
  title: "Book an AI Discovery Session",
  description:
    "Answer a few questions about your business and get a personalized report showing where AI can save time, cut costs and improve operations.",
};

export default function DiscoveryPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Discovery Session"
        title="Find out where AI can transform your business"
        intro="Answer a few quick questions and get a personalized report showing exactly where AI can save you time, reduce costs and improve operations — in under two minutes."
      />
      <section className="section">
        <div className="container">
          <DiscoveryForm />
        </div>
      </section>
    </>
  );
}
