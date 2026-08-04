import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import { HeroSectionDemo, HeroSectionMinimalDemo } from "../../components/ui/hero-section.demo";
import {
  PricingSectionDemo,
  PricingSectionUsageDemo,
} from "../../components/ui/pricing-section.demo";
import {
  TestimonialsSectionDemo,
  TestimonialsSectionThreeUpDemo,
  TestimonialsSectionNoAggregateDemo,
} from "../../components/ui/testimonials-section.demo";
import {
  SiteFooterDemo,
  SiteFooterMinimalDemo,
  SiteFooterFailingDemo,
} from "../../components/ui/site-footer.demo";
import { SiteNavbarDemo, SiteNavbarMinimalDemo } from "../../components/ui/site-navbar.demo";

/**
 * Every demo the e2e suite can mount, keyed by the `?demo=` query parameter.
 * Adding a component means adding its demos here and a spec under tests/e2e.
 */
const REGISTRY: Record<string, React.ComponentType> = {
  "hero": HeroSectionDemo,
  "hero-minimal": HeroSectionMinimalDemo,

  "pricing": PricingSectionDemo,
  "pricing-usage": PricingSectionUsageDemo,

  "testimonials": TestimonialsSectionDemo,
  "testimonials-threeup": TestimonialsSectionThreeUpDemo,
  "testimonials-noagg": TestimonialsSectionNoAggregateDemo,

  "footer": SiteFooterDemo,
  "footer-minimal": SiteFooterMinimalDemo,
  "footer-failing": SiteFooterFailingDemo,

  "navbar": SiteNavbarDemo,
  "navbar-minimal": SiteNavbarMinimalDemo,
};

const name = new URLSearchParams(window.location.search).get("demo") ?? "";
const Demo = REGISTRY[name];

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {Demo ? (
      <Demo />
    ) : (
      <main style={{ fontFamily: "system-ui", padding: 24 }}>
        <h1>Component harness</h1>
        <p>Append ?demo=&lt;name&gt;. Available:</p>
        <ul>
          {Object.keys(REGISTRY).map((key) => (
            <li key={key}>
              <a href={`?demo=${key}`}>{key}</a>
            </li>
          ))}
        </ul>
      </main>
    )}
  </React.StrictMode>,
);
