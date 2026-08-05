import { test, expect } from "@playwright/test";

/**
 * Cross-cutting checks that apply to every component: both themes resolve,
 * nothing overflows horizontally, and interactive targets are big enough.
 */

const DEMOS = ["hero", "pricing", "testimonials", "footer", "navbar"] as const;

const WIDTHS = [375, 768, 1024, 1440];

// Root element and the background each theme must resolve to.
const ROOTS: Record<(typeof DEMOS)[number], { selector: string; light: string; dark: string }> = {
  hero: { selector: ".hero-root", light: "rgb(248, 250, 252)", dark: "rgb(11, 18, 32)" },
  pricing: { selector: ".pricing-root", light: "rgb(248, 250, 252)", dark: "rgb(11, 18, 32)" },
  testimonials: { selector: ".tst-root", light: "rgb(248, 250, 252)", dark: "rgb(11, 18, 32)" },
  footer: { selector: ".footer-root", light: "rgb(239, 243, 248)", dark: "rgb(8, 14, 26)" },
  navbar: { selector: ".nav-root", light: "rgb(248, 250, 252)", dark: "rgb(11, 18, 32)" },
};

for (const demo of DEMOS) {
  test.describe(demo, () => {
    for (const width of WIDTHS) {
      test(`no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/?demo=${demo}`);

        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        }));
        expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth);
      });
    }

    test("resolves the light theme", async ({ page }) => {
      await page.emulateMedia({ colorScheme: "light" });
      await page.goto(`/?demo=${demo}`);
      const { selector, light } = ROOTS[demo];
      await expect
        .poll(async () =>
          page.locator(selector).evaluate((el) => getComputedStyle(el).backgroundColor),
        )
        .toBe(light);
    });

    test("resolves the dark theme", async ({ page }) => {
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto(`/?demo=${demo}`);
      const { selector, dark } = ROOTS[demo];
      await expect
        .poll(async () =>
          page.locator(selector).evaluate((el) => getComputedStyle(el).backgroundColor),
        )
        .toBe(dark);
    });

    test("renders without console or page errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      page.on("console", (m) => {
        if (m.type() === "error" && !m.text().includes("favicon")) errors.push(m.text());
      });

      await page.goto(`/?demo=${demo}`);
      await expect(page.locator(ROOTS[demo].selector)).toBeVisible();
      expect(errors).toEqual([]);
    });
  });
}

/**
 * The 44px minimum applies to controls — buttons, inputs, and links styled to
 * look tappable (they carry a background or a border). Plain text links in a
 * footer list are not controls in that sense; WCAG 2.5.8 covers those through
 * its spacing exception instead, so holding them to 44px would be wrong rather
 * than strict.
 */
test.describe("touch targets", () => {
  test.use({ viewport: { width: 375, height: 900 } });

  for (const demo of DEMOS) {
    test(`${demo}: controls are at least 44px tall`, async ({ page }) => {
      await page.goto(`/?demo=${demo}`);

      const undersized = await page.evaluate(() => {
        const root = document.querySelector(
          ".hero-root, .pricing-root, .tst-root, .footer-root, .nav-root",
        );
        if (!root) return [];

        const isControl = (el: Element) => {
          if (el.tagName === "BUTTON" || el.tagName === "INPUT") return true;
          const style = getComputedStyle(el);
          const filled = style.backgroundColor !== "rgba(0, 0, 0, 0)";
          const bordered = ["Top", "Right", "Bottom", "Left"].some(
            (side) =>
              parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0 &&
              style.getPropertyValue(`border-${side.toLowerCase()}-style`) !== "none",
          );
          return filled || bordered;
        };

        return [...root.querySelectorAll("a, button, input")]
          .filter((el) => {
            const style = getComputedStyle(el);
            if (style.display === "none" || style.visibility === "hidden") return false;
            const rect = el.getBoundingClientRect();
            // Not laid out, e.g. inside a closed disclosure.
            if (rect.width === 0 && rect.height === 0) return false;
            if (!isControl(el)) return false;
            return rect.height < 44;
          })
          .map((el) => `${el.tagName}:${(el.textContent ?? "").trim().slice(0, 24)}`);
      });

      expect(undersized).toEqual([]);
    });
  }
});
