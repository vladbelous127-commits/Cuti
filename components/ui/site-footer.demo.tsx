import { SiteFooter } from "./site-footer";

export function SiteFooterDemo() {
  return <SiteFooter year={2026} />;
}

/** Minimal variant: no newsletter, fewer columns. */
export function SiteFooterMinimalDemo() {
  return (
    <SiteFooter
      brand="Sablefish"
      description="Small tools for small teams."
      showNewsletter={false}
      year={2026}
      columns={[
        {
          title: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Docs", href: "#docs" },
            { label: "Status", href: "#status", external: true },
          ],
        },
      ]}
      socials={[{ label: "GitHub", href: "#github", external: true }]}
    />
  );
}

/** Exercises the error path — the subscribe handler always rejects. */
export function SiteFooterFailingDemo() {
  return (
    <SiteFooter
      year={2026}
      onSubscribe={async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        throw new Error("mailing list unavailable");
      }}
    />
  );
}

export default SiteFooterDemo;
