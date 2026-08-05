import { test, expect } from "@playwright/test";

test.describe("TestimonialsSection", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?demo=testimonials");
  });

  test("each quote uses figure/blockquote/figcaption", async ({ page }) => {
    const figures = page.locator(".tst-root figure");
    const count = await figures.count();
    expect(count).toBeGreaterThan(0);

    await expect(page.locator(".tst-root figure blockquote")).toHaveCount(count);
    await expect(page.locator(".tst-root figure figcaption")).toHaveCount(count);
  });

  test("star ratings fill fractionally rather than rounding", async ({ page }) => {
    // The three-up demo aggregates to 4.6 — rounding would show five full stars.
    await page.goto("/?demo=testimonials-threeup");

    const aggregate = page.locator('.tst-root [role="img"]').first();
    await expect(aggregate).toHaveAttribute("aria-label", /4\.6 out of 5/);

    const ratio = await aggregate.evaluate((el) => {
      const base = el.children[0].getBoundingClientRect().width;
      const fill = el.children[1].getBoundingClientRect().width;
      return fill / base;
    });
    expect(ratio).toBeGreaterThan(0.9);
    expect(ratio).toBeLessThan(0.94);
  });

  test("an integer rating clips on a whole-star boundary", async ({ page }) => {
    const fourStar = page.locator('.tst-root figure [role="img"][aria-label^="Rated 4 "]').first();
    const widths = await fourStar.evaluate((el) => ({
      base: Math.round(el.children[0].getBoundingClientRect().width),
      fill: Math.round(el.children[1].getBoundingClientRect().width),
    }));

    // Five 16px glyphs with four 2px gaps = 88; four glyphs and three gaps = 70.
    expect(widths.base).toBe(88);
    expect(widths.fill).toBe(70);
  });

  test("ratings expose their value to assistive tech", async ({ page }) => {
    const labels = await page
      .locator('.tst-root [role="img"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("aria-label")));

    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(label).toMatch(/out of 5/);
    }
  });

  test("hides star markup entirely when no ratings are supplied", async ({ page }) => {
    await page.goto("/?demo=testimonials-noagg");
    await expect(page.locator('.tst-root [role="img"]')).toHaveCount(0);
    await expect(page.locator(".tst-root figure")).toHaveCount(3);
  });

  test("quote tops align whether or not a verified chip is present", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1100 });

    const rows = await page.locator(".tst-root figure").evaluateAll((els) =>
      els.map((el) => {
        const quote = el.querySelector("blockquote")!.getBoundingClientRect();
        const card = el.getBoundingClientRect();
        return { cardTop: Math.round(card.top), quoteTop: Math.round(quote.top) };
      }),
    );

    // Group by row, then assert every quote in a row starts at the same y.
    const byRow = new Map<number, number[]>();
    for (const r of rows) {
      byRow.set(r.cardTop, [...(byRow.get(r.cardTop) ?? []), r.quoteTop]);
    }
    for (const tops of byRow.values()) {
      expect(new Set(tops).size).toBe(1);
    }
  });

  test("reflows from one column to three across breakpoints", async ({ page }) => {
    const columnCount = async () => {
      const lefts = await page
        .locator(".tst-root figure")
        .evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().left)));
      return new Set(lefts).size;
    };

    await page.setViewportSize({ width: 375, height: 900 });
    expect(await columnCount()).toBe(1);

    await page.setViewportSize({ width: 768, height: 900 });
    expect(await columnCount()).toBe(2);

    await page.setViewportSize({ width: 1280, height: 900 });
    expect(await columnCount()).toBe(3);
  });
});
