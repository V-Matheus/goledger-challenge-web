import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
	test("navigates between all main pages", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("h1")).toContainText("Network Dashboard");

		await page.getByRole("link", { name: "TV Shows" }).click();
		await expect(page).toHaveURL("/tv-shows");
		await expect(page.locator("h1")).toContainText("TV Shows");

		await page.getByRole("link", { name: "Watchlist" }).click();
		await expect(page).toHaveURL("/watchlist");
		await expect(page.locator("h1")).toContainText("My Watchlist");

		await page.getByRole("link", { name: "Dashboard" }).click();
		await expect(page).toHaveURL("/");
		await expect(page.locator("h1")).toContainText("Network Dashboard");
	});

	test("View All link on dashboard goes to tv shows", async ({ page }) => {
		await page.goto("/");
		await page.getByRole("link", { name: "View All" }).click();
		await expect(page).toHaveURL("/tv-shows");
	});

	test("Explore All Collections link goes to watchlist", async ({ page }) => {
		await page.goto("/");
		await page.getByRole("link", { name: /explore all collections/i }).click();
		await expect(page).toHaveURL("/watchlist");
	});

	test("sidebar highlights active page", async ({ page }) => {
		await page.goto("/tv-shows");
		const tvShowsLink = page.getByRole("link", { name: "TV Shows" });
		await expect(tvShowsLink).toHaveClass(/text-primary-text/);
	});
});
