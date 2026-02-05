import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have the correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Thumbly/);
  });

  test("should display the main hero heading", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Self-Hosted Feedback");
  });

  test("should show the live demo section", async ({ page }) => {
    const demoSection = page.locator("#demo");
    await expect(demoSection).toBeVisible();
    await expect(demoSection).toContainText("demo.thumbly.dev");
  });

  test("should display the 'Why Thumbly?' features", async ({ page }) => {
    const featureHeading = page.getByRole("heading", { name: "Why Thumbly?" });
    await expect(featureHeading).toBeVisible();

    const features = page.locator("section").filter({ hasText: "Why Thumbly?" }).locator("div.grid > div");
    await expect(features).toHaveCount(6);
  });

  test("should navigate to documentation via primary CTA", async ({ page }) => {
    await page.getByRole("link", { name: "Get Started", exact: true }).click();
    await expect(page).toHaveURL(/\/docs/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Introduction");
  });
});
