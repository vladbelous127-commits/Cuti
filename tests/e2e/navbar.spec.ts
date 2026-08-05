import { test, expect } from "@playwright/test";

test.describe("SiteNavbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?demo=navbar");
  });

  test("sticky bar does not overlap the first section", async ({ page }) => {
    const geometry = await page.evaluate(() => {
      const header = document.querySelector("header")!.getBoundingClientRect();
      const main = document.querySelector("main")!.getBoundingClientRect();
      return { navBottom: Math.round(header.bottom), mainTop: Math.round(main.top) };
    });
    expect(geometry.mainTop).toBeGreaterThanOrEqual(geometry.navBottom);
  });

  test("stays pinned while scrolling and grows a hairline", async ({ page }) => {
    // A short viewport guarantees the demo page actually scrolls.
    await page.setViewportSize({ width: 1280, height: 400 });
    await expect
      .poll(async () =>
        page.evaluate(() => document.documentElement.scrollHeight > window.innerHeight),
      )
      .toBe(true);

    const borderAtRest = await page.evaluate(
      () => getComputedStyle(document.querySelector("header")!).borderBottomColor,
    );
    expect(borderAtRest).toBe("rgba(0, 0, 0, 0)");

    await page.evaluate(() => window.scrollTo(0, 400));

    await expect
      .poll(async () =>
        page.evaluate(() => getComputedStyle(document.querySelector("header")!).borderBottomColor),
      )
      .not.toBe("rgba(0, 0, 0, 0)");

    const top = await page.evaluate(() =>
      Math.round(document.querySelector("header")!.getBoundingClientRect().top),
    );
    expect(top).toBe(0);
  });

  test("the skip link is the first focusable element and stays off-screen until focused", async ({
    page,
  }) => {
    const skip = page.getByRole("link", { name: "Skip to main content" });

    const hiddenBox = await skip.boundingBox();
    expect(hiddenBox!.y).toBeLessThan(0);

    await page.keyboard.press("Tab");
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#main");

    // It slides in over 150ms, so poll rather than sampling mid-transition.
    await expect.poll(async () => (await skip.boundingBox())!.y >= 0).toBe(true);
  });

  test("the active link is marked with aria-current", async ({ page }) => {
    const current = page.locator("header nav a[aria-current='page']").first();
    await expect(current).toHaveText("Product");
  });

  test.describe("mobile disclosure", () => {
    test.use({ viewport: { width: 375, height: 720 } });

    test("opens, locks scroll, and closes on Escape returning focus", async ({ page }) => {
      const toggle = page.getByRole("button", { name: "Open menu" });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");

      await toggle.click();

      const opened = page.getByRole("button", { name: "Close menu" });
      await expect(opened).toHaveAttribute("aria-expanded", "true");
      await expect
        .poll(async () => page.evaluate(() => document.body.style.overflow))
        .toBe("hidden");

      await page.keyboard.press("Escape");

      await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
      await expect.poll(async () => page.evaluate(() => document.body.style.overflow)).toBe("");
    });

    test("closes on an outside click", async ({ page }) => {
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

      await page.mouse.click(180, 650);

      await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    test("closes when a menu link is chosen", async ({ page }) => {
      await page.getByRole("button", { name: "Open menu" }).click();

      // The desktop nav is display:none at this width, so a visible "Pricing"
      // link can only be the one inside the disclosure panel.
      await page.getByRole("link", { name: "Pricing" }).click();

      await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    });

    test("the toggle meets the minimum touch target", async ({ page }) => {
      const box = (await page.getByRole("button", { name: "Open menu" }).boundingBox())!;
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    });
  });
});
