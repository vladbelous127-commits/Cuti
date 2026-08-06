import { test, expect } from "@playwright/test";

/**
 * The rings are wider than the viewport by design — up to 1060px inside a
 * 440px band — so most of what is worth asserting here is geometric: that the
 * clipping holds, that the chips sit on the ring rather than at twelve
 * o'clock, and that they stay upright while the ring turns.
 */

const ROOT = ".orb-root";

test.describe("OrbitingCircles", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?demo=orbiting");
  });

  test("renders three rings with the mirrored icons doubled onto each", async ({ page }) => {
    const rings = page.locator(`${ROOT} > div.rounded-full`);
    await expect(rings).toHaveCount(3);

    // 3 + 2 + 3 icons, each mirrored to the far side of its ring.
    await expect(page.locator(`${ROOT} .orb-chip`)).toHaveCount(16);
  });

  test("the mirrored half is not announced twice", async ({ page }) => {
    // Every ring's icons appear once as named images and once as decoration.
    await expect(page.getByRole("img", { name: "Database" })).toHaveCount(1);
    await expect(page.getByRole("img", { name: "Interface" })).toHaveCount(1);
  });

  test("the particle globe paints onto a sized canvas", async ({ page }) => {
    const canvas = page.locator(`${ROOT} canvas`);
    await expect(canvas).toHaveCount(1);

    // The canvas backing store is sized from the container, so a zero here
    // means the resize observer never fired and nothing is being drawn.
    const painted = await canvas.evaluate((el) => {
      const c = el as HTMLCanvasElement;
      const context = c.getContext("2d");
      if (!context || c.width === 0 || c.height === 0) return null;
      const { data } = context.getImageData(0, 0, c.width, c.height);
      let opaque = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 0) opaque++;
      return { width: c.width, height: c.height, opaque };
    });

    expect(painted).not.toBeNull();
    expect(painted!.width).toBeGreaterThan(0);
    expect(painted!.opaque).toBeGreaterThan(0);
  });

  test("the globe is decorative, so it is skipped by assistive tech", async ({ page }) => {
    await expect(page.locator(`${ROOT} .orb-sphere`)).toHaveAttribute("aria-hidden", "true");
  });

  test("chips are distributed around the ring, not stacked at the top", async ({ page }) => {
    const centres = await page.locator(`${ROOT} .orb-chip`).evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return { x: Math.round(rect.x + rect.width / 2), y: Math.round(rect.y + rect.height / 2) };
      }),
    );

    const distinct = new Set(centres.map((c) => `${c.x},${c.y}`));
    expect(distinct.size).toBe(centres.length);
  });

  test("chips stay upright while their arm rotates", async ({ page }) => {
    const chip = page.locator(`${ROOT} .orb-chip`).first();
    const arm = page.locator(`${ROOT} .orb-arm`).first();

    const angleOf = (locator: typeof chip) =>
      locator.evaluate((el) => {
        const { a, b } = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        // Normalised to [0, 360) so 359.9 and -0.1 compare as neighbours.
        return ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360;
      });

    const armStart = await angleOf(arm);
    const chipStart = await angleOf(chip);

    // The inner ring takes 18s per turn, so a second is ~20 degrees of travel.
    await page.waitForTimeout(1000);

    const armEnd = await angleOf(arm);
    const chipEnd = await angleOf(chip);

    const travelled = (armEnd - armStart + 360) % 360;
    expect(travelled).toBeGreaterThan(5);

    // The chip counter-rotates by the same amount, so the pair cancels out and
    // the icon never appears upside down.
    const composed = (armEnd + chipEnd) % 360;
    const composedStart = (armStart + chipStart) % 360;
    const drift = Math.min(
      Math.abs(composed - composedStart),
      360 - Math.abs(composed - composedStart),
    );
    expect(drift).toBeLessThan(2);
  });

  test("clips the oversized rings instead of widening the page", async ({ page }) => {
    // Narrow enough that even the innermost ring is wider than the viewport.
    await page.setViewportSize({ width: 375, height: 900 });

    const root = page.locator(ROOT);
    await expect(root).toHaveCSS("overflow-x", "hidden");

    const { rootWidth, ringWidth } = await page.evaluate(() => {
      const el = document.querySelector(".orb-root")!;
      const rings = [...el.querySelectorAll(":scope > div.rounded-full")];
      const widest = Math.max(...rings.map((ring) => ring.getBoundingClientRect().width));
      return { rootWidth: el.getBoundingClientRect().width, ringWidth: widest };
    });

    // The premise of the test: at this viewport the ring really is wider.
    expect(ringWidth).toBeGreaterThan(rootWidth);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => window.innerWidth),
    );
  });

  test("mirroring off renders only the icons that were passed", async ({ page }) => {
    await page.goto("/?demo=orbiting-single");
    await expect(page.locator(`${ROOT} > div.rounded-full`)).toHaveCount(1);
    await expect(page.locator(`${ROOT} .orb-chip`)).toHaveCount(3);
  });
});

test.describe("OrbitingCircles with reduced motion", () => {
  test("holds the rings in place rather than collapsing them to the top", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/?demo=orbiting");

    const arms = page.locator(`${ROOT} .orb-arm`);
    await expect(arms.first()).toBeVisible();
    await expect(arms.first()).toHaveCSS("animation-name", "none");

    const first = await arms.first().boundingBox();
    await page.waitForTimeout(600);
    const second = await arms.first().boundingBox();
    expect(second).toEqual(first);

    // The inline transform still applies, so the arms keep their spread.
    const angles = await arms.evaluateAll((nodes) =>
      nodes.map((node) => {
        const { a, b } = new DOMMatrixReadOnly(getComputedStyle(node).transform);
        return Math.round(((Math.atan2(b, a) * 180) / Math.PI + 360) % 360);
      }),
    );
    expect(new Set(angles).size).toBeGreaterThan(1);
  });
});
