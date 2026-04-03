import { expect, test } from "@playwright/test";

test.describe("Watchlist Page", () => {
	test("navigates to watchlist page", async ({ page }) => {
		await page.goto("/");
		await page.getByRole("link", { name: "Watchlist" }).click();
		await expect(page).toHaveURL("/watchlist");
		await expect(page.locator("h1")).toContainText("My Watchlist");
	});

	test("displays watchlist items", async ({ page }) => {
		await page.goto("/watchlist");
		await expect(page.getByText("Game of Thrones")).toBeVisible();
		await expect(page.getByText("The Vampire Diaries")).toBeVisible();
	});

	test("displays item count", async ({ page }) => {
		await page.goto("/watchlist");
		await expect(page.getByText("4 items")).toBeVisible();
	});

	test("opens create modal", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByText("New Watchlist").click();
		await expect(page.getByText("Create a new collection")).toBeVisible();
		await expect(page.getByPlaceholder("e.g. Weekend Binge")).toBeVisible();
	});

	test("closes create modal on cancel", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByText("New Watchlist").click();
		await page.getByRole("button", { name: "Cancel" }).click();
		await expect(page.getByText("Create a new collection")).not.toBeVisible();
	});

	test("opens clear all confirmation modal", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByText("Clear All").click();
		await expect(
			page.getByText(/are you sure you want to clear all/i),
		).toBeVisible();
	});

	test("opens delete modal for specific item", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByRole("button", { name: /delete game of thrones/i }).click();
		await expect(page.getByText(/This action cannot be undone/)).toBeVisible();
	});

	test("opens edit modal for specific item", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByRole("button", { name: /edit game of thrones/i }).click();
		await expect(page.getByText("Edit Watchlist")).toBeVisible();
		await expect(page.locator('input[value="Game of Thrones"]')).toBeVisible();
	});

	test("closes edit modal on cancel", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByRole("button", { name: /edit game of thrones/i }).click();
		await page.getByRole("button", { name: "Cancel" }).click();
		await expect(page.getByText("Edit Watchlist")).not.toBeVisible();
	});

	test("shows result count in footer", async ({ page }) => {
		await page.goto("/watchlist");
		await expect(page.getByText(/showing 1-4 of 4 results/i)).toBeVisible();
	});
});

test.describe("Watchlist Detail Page", () => {
	test("navigates to watchlist detail", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByRole("link", { name: "Game of Thrones" }).click();
		await expect(page.getByText("Back to Watchlists")).toBeVisible();
	});

	test("displays linked tv shows", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByRole("link", { name: "Game of Thrones" }).click();
		await expect(page.getByText("2 Shows")).toBeVisible();
	});

	test("has add show button", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByRole("link", { name: "Game of Thrones" }).click();
		await expect(page.getByText("Add Show")).toBeVisible();
	});

	test("opens add show modal", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByRole("link", { name: "Game of Thrones" }).click();
		await page.getByText("Add Show").click();
		await expect(page.getByText("Add Shows to Watchlist")).toBeVisible();
	});

	test("navigates back to watchlist list", async ({ page }) => {
		await page.goto("/watchlist");
		await page.getByRole("link", { name: "Game of Thrones" }).click();
		await page.getByText("Back to Watchlists").click();
		await expect(page).toHaveURL("/watchlist");
	});
});
