import { test, expect } from "@playwright/test";

test.describe("Dashboard (Authenticated)", () => {
  test("should show login page when unauthenticated", async ({ page }) => {
    await page.goto("/app");
    await expect(page.getByRole("heading", { name: "Get Started" })).toBeVisible();
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Your Password")).toBeVisible();
  });

  test("should allow signing in with seeded credentials", async ({ page }) => {
    await page.goto("/app");

    // Fill login form
    await page.getByLabel("Email address").fill("test@test.com");
    await page.getByLabel("Your Password").fill("1234asdf");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();

    // Should navigate to dashboard
    await expect(page.getByRole("heading", { name: "My Surveys" })).toBeVisible();

    // Should see at least one survey (from seed)
    const surveyCards = page.locator(".group.rounded-3xl.border");
    await expect(surveyCards.first()).toBeVisible();
  });

  test("should handle survey interactions", async ({ page }) => {
    // Perform login first (or use storageState if optimized)
    await page.goto("/app");
    await page.getByLabel("Email address").fill("test@test.com");
    await page.getByLabel("Your Password").fill("1234asdf");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();

    // Check integration snippet switching
    const firstSurvey = page.locator(".group.rounded-3xl.border").first();
    await expect(firstSurvey).toContainText("ThumblyBinary");

    await firstSurvey.getByRole("button", { name: "StarRating" }).click();
    await expect(firstSurvey).toContainText("ThumblyStarRating");

    await firstSurvey.getByRole("button", { name: "NPS" }).click();
    await expect(firstSurvey).toContainText("ThumblyNPS");
  });

  test("should allow logging out", async ({ page }) => {
    await page.goto("/app");
    await page.getByLabel("Email address").fill("test@test.com");
    await page.getByLabel("Your Password").fill("1234asdf");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();

    // Click logout (it's an icon button next to New Survey)
    // We updated it to be a Button with variant="outline" and LogOut icon
    const logoutButton = page
      .locator("button")
      .filter({ has: page.locator("svg") })
      .nth(1); // Second button in the top right flex container
    // Better locator:
    await page.locator('button:has(svg[class*="lucide-log-out"])').click();

    await expect(page.getByRole("heading", { name: "Get Started" })).toBeVisible();
  });
});
