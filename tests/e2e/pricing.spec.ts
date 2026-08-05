import { test, expect } from "@playwright/test";

test.describe("PricingSection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?demo=pricing");
  });

  test("toggling the billing period swaps prices and pressed state", async ({ page }) => {
    const monthly = page.getByRole("button", { name: /^Monthly$/ });
    const annual = page.getByRole("button", { name: /Annual/ });

    // The demo opens on annual: discounted figure plus the struck-through original.
    await expect(annual).toHaveAttribute("aria-pressed", "true");
    await expect(monthly).toHaveAttribute("aria-pressed", "false");
    await expect(page.getByText("$9", { exact: true })).toBeVisible();
    await expect(page.locator(".line-through")).toHaveCount(2);

    await monthly.click();

    await expect(monthly).toHaveAttribute("aria-pressed", "true");
    await expect(annual).toHaveAttribute("aria-pressed", "false");
    await expect(page.getByText("$12", { exact: true })).toBeVisible();
    // Monthly is the undiscounted price, so nothing is struck through.
    await expect(page.locator(".line-through")).toHaveCount(0);
  });

  test("a tier whose annual and monthly price match shows no strikethrough", async ({ page }) => {
    await page.goto("/?demo=pricing-usage");
    await page.getByRole("button", { name: /Annual/ }).click();

    // The Free tier is $0 either way; Growth is discounted.
    await expect(page.getByText("$0", { exact: true })).toBeVisible();
    await expect(page.locator(".line-through")).toHaveCount(1);
  });

  test("custom tiers keep their label across both periods", async ({ page }) => {
    await expect(page.getByText("Custom", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: /^Monthly$/ }).click();
    await expect(page.getByText("Custom", { exact: true })).toBeVisible();
  });

  test("stacks below lg and shows three columns from lg", async ({ page }) => {
    const cards = page.locator(".pricing-root .grid > div");
    const columnCount = async () => {
      const lefts = await cards.evaluateAll((els) =>
        els.map((el) => Math.round(el.getBoundingClientRect().left)),
      );
      return new Set(lefts).size;
    };

    await page.setViewportSize({ width: 1023, height: 900 });
    expect(await columnCount()).toBe(1);

    await page.setViewportSize({ width: 1024, height: 900 });
    expect(await columnCount()).toBe(3);
  });

  test("the highlighted card grows symmetrically past the row", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const boxes = await page
      .locator(".pricing-root .grid > div")
      .evaluateAll((els) =>
        els.map((el) => {
          const r = el.getBoundingClientRect();
          return { top: Math.round(r.top), bottom: Math.round(r.bottom) };
        }),
      );

    const [first, middle, last] = boxes;
    // Outer cards align with each other...
    expect(first.top).toBe(last.top);
    expect(first.bottom).toBe(last.bottom);
    // ...and the raised one extends equally above and below them.
    expect(first.top - middle.top).toBe(middle.bottom - first.bottom);
    expect(first.top - middle.top).toBeGreaterThan(0);
  });

  test("only the highlighted tier carries a solid primary CTA", async ({ page }) => {
    const solid = page.locator(".pricing-root .grid > div a").filter({ hasText: /Start free trial/ });
    const backgrounds = await solid.evaluateAll((els) =>
      els.map((el) => getComputedStyle(el).backgroundColor),
    );
    // Two tiers share the label; exactly one of them is filled with the primary.
    const filled = backgrounds.filter((c) => c === "rgb(30, 58, 95)");
    expect(filled).toHaveLength(1);
  });
});
