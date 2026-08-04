import { test, expect } from "@playwright/test";

test.describe("SiteFooter newsletter", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?demo=footer");
  });

  test("the input has a real label, not a placeholder standing in for one", async ({ page }) => {
    const input = page.getByLabel("Email address");
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute("autocomplete", "email");
    await expect(input).not.toHaveAttribute("aria-invalid", "true");
  });

  test("submitting empty shows an error and moves focus to the field", async ({ page }) => {
    const input = page.getByLabel("Email address");
    await page.getByRole("button", { name: "Subscribe" }).click();

    await expect(page.locator('[role="status"]')).toHaveText(/Enter your email address/);
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toBeFocused();
  });

  test("a malformed address gets a specific message, and typing clears it", async ({ page }) => {
    const input = page.getByLabel("Email address");
    await input.fill("not-an-email");
    await page.getByRole("button", { name: "Subscribe" }).click();

    await expect(page.locator('[role="status"]')).toHaveText(/check for a typo/);
    await expect(input).toHaveAttribute("aria-invalid", "true");
    // Every failing branch must hand focus back, not just the empty one.
    await expect(input).toBeFocused();

    await input.fill("someone@example.com");
    await expect(page.locator('[role="status"]')).toHaveText("");
    await expect(input).not.toHaveAttribute("aria-invalid", "true");
  });

  test("a valid submit disables the button, then succeeds and clears the field", async ({ page }) => {
    const input = page.getByLabel("Email address");
    const button = page.getByRole("button", { name: /Subscrib/ });

    await input.fill("someone@example.com");
    await button.click();

    // In flight: disabled, with the label switched to the progress wording.
    await expect(button).toBeDisabled();
    await expect(button).toHaveText(/Subscribing/);

    await expect(page.locator('[role="status"]')).toHaveText(/You're subscribed/, {
      timeout: 5000,
    });
    await expect(input).toHaveValue("");
    await expect(button).toBeEnabled();
  });

  test("a rejected handler surfaces an error and returns focus", async ({ page }) => {
    await page.goto("/?demo=footer-failing");
    const input = page.getByLabel("Email address");

    await input.fill("someone@example.com");
    await page.getByRole("button", { name: /Subscrib/ }).click();

    await expect(page.locator('[role="status"]')).toHaveText(/Something went wrong/, {
      timeout: 5000,
    });
    await expect(input).toBeFocused();
  });

  test("the status line reserves height so messages do not shift layout", async ({ page }) => {
    const status = page.locator('[role="status"]');
    const before = (await status.boundingBox())!.height;

    await page.getByRole("button", { name: "Subscribe" }).click();
    await expect(status).toHaveText(/Enter your email/);

    const after = (await status.boundingBox())!.height;
    expect(after).toBe(before);
  });

  test("link groups are individually labelled and external links are safe", async ({ page }) => {
    const navs = page.locator("footer nav[aria-label]");
    await expect(navs).toHaveCount(4);

    const external = page.locator('footer a[target="_blank"]').first();
    await expect(external).toHaveAttribute("rel", /noopener/);
    await expect(external).toHaveAttribute("rel", /noreferrer/);
  });
});
