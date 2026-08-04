import { PricingSection, type PricingTier } from "./pricing-section";

export function PricingSectionDemo() {
  return <PricingSection />;
}

const USAGE_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Kick the tyres, no card needed.",
    monthly: 0,
    annual: 0,
    features: ["10k events / month", "7-day retention", "Community support"],
    ctaLabel: "Get started",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For products finding their audience.",
    monthly: 79,
    annual: 63,
    features: [
      "2M events / month",
      "12-month retention",
      "Email support",
      "Unlimited dashboards",
      "Slack alerts",
    ],
    ctaLabel: "Upgrade to Growth",
    highlighted: true,
    badge: "Best value",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Volume pricing with a contract.",
    monthly: null,
    annual: null,
    customLabel: "Let's talk",
    features: ["Unlimited events", "Custom retention", "SSO and audit logs", "Dedicated support"],
    ctaLabel: "Book a call",
  },
];

export function PricingSectionUsageDemo() {
  return (
    <PricingSection
      heading="Only pay for what you measure"
      description="Usage-based pricing with no seat minimums. Every plan includes the full feature set."
      tiers={USAGE_TIERS}
      annualSavingPercent={20}
      defaultPeriod="monthly"
      footnote="Overages billed at $0.30 per 10k events."
    />
  );
}

export default PricingSectionDemo;
