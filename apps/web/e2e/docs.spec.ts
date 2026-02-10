import { test, expect } from "@playwright/test";

test.describe("Documentation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/docs");
  });

  test("should display the introduction page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Introduction", level: 1 })).toBeVisible();
  });

  test("should navigate through sidebar links", async ({ page }) => {
    // Navigate to Getting Started
    await page.getByRole("link", { name: "Getting Started" }).click();
    await expect(page).toHaveURL(/\/docs\/getting-started/);
    await expect(page.getByRole("heading", { name: "Getting Started", level: 1 })).toBeVisible();

    // Navigate to Bring Your Own Backend
    await page.getByRole("link", { name: "Bring Your Own Backend" }).click();
    await expect(page).toHaveURL(/\/docs\/byob/);
    await expect(page.getByRole("heading", { name: "Bring Your Own Backend", level: 1 })).toBeVisible();

    // Navigate to API Reference
    await page.getByRole("link", { name: "API Reference" }).click();
    await expect(page).toHaveURL(/\/docs\/api/);
    await expect(page.getByRole("heading", { name: "API Reference", level: 1 })).toBeVisible();
  });

  test("should show code blocks with correct styling", async ({ page }) => {
    await page.goto("/docs/getting-started");
    const codeBlock = page.locator(".not-prose").first();
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toHaveClass(/bg-slate-950/);
  });
});
