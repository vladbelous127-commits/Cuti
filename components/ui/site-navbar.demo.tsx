import { SiteNavbar } from "./site-navbar";

/** Navbar over enough content to exercise the sticky behaviour. */
export function SiteNavbarDemo() {
  return (
    <div>
      <SiteNavbar />
      <main id="main" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h1 className="text-3xl font-bold">Main content</h1>
        <p className="mt-4 max-w-prose text-slate-600 dark:text-slate-300">
          The bar above is sticky rather than fixed, so this content starts below it
          instead of underneath it. Scroll to see the hairline appear.
        </p>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="mt-4 max-w-prose text-slate-600 dark:text-slate-300">
            Filler paragraph {i + 1}.
          </p>
        ))}
      </main>
    </div>
  );
}

/** Marketing variant: no secondary action, different active item. */
export function SiteNavbarMinimalDemo() {
  return (
    <div>
      <SiteNavbar
        brand="Sablefish"
        links={[
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing", current: true },
          { label: "Blog", href: "#blog" },
        ]}
        secondaryLabel=""
        ctaLabel="Get started"
      />
      <main id="main" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h1 className="text-3xl font-bold">Pricing</h1>
      </main>
    </div>
  );
}

export default SiteNavbarDemo;
