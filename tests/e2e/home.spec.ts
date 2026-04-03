import { expect, test } from "@playwright/test";

test.describe("Dashboard", () => {
	test("loads successfully with heading", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("h1")).toContainText("Network Dashboard");
	});

	test("displays stat cards", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByText("Total TV Shows")).toBeVisible();
		await expect(page.getByText("Seasons")).toBeVisible();
		await expect(page.getByText("Episodes")).toBeVisible();
		await expect(page.getByText("Watchlists", { exact: true })).toBeVisible();
	});

	test("displays recently added shows section", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByText("Recently Added")).toBeVisible();
	});

	test("displays active watchlists section", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByText("Active Watchlists")).toBeVisible();
	});

	test("sidebar has navigation links", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
		await expect(page.getByRole("link", { name: "TV Shows" })).toBeVisible();
		await expect(page.getByRole("link", { name: "Watchlist" })).toBeVisible();
	});

	test("theme toggle works", async ({ page }) => {
		await page.goto("/");
		const toggle = page.getByRole("button", { name: /toggle theme/i });
		await expect(toggle).toBeVisible();
		await toggle.click();
		const html = page.locator("html");
		const theme = await html.getAttribute("data-theme");
		expect(theme).toBeTruthy();
	});
});
