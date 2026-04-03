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
		await expect(
			page.locator("[data-slot='watchlist-row']").first(),
		).toBeVisible();
	});

	test("displays item count", async ({ page }) => {
		await page.goto("/watchlist");
		await expect(page.getByText(/\d+ items?/i)).toBeVisible();
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
		const deleteBtn = page.getByRole("button", { name: /^delete /i }).first();
		await deleteBtn.click();
		await expect(page.getByText(/This action cannot be undone/)).toBeVisible();
	});

	test("opens edit modal for specific item", async ({ page }) => {
		await page.goto("/watchlist");
		const editBtn = page.getByRole("button", { name: /^edit /i }).first();
		await editBtn.click();
		await expect(page.getByText("Edit Watchlist")).toBeVisible();
	});

	test("closes edit modal on cancel", async ({ page }) => {
		await page.goto("/watchlist");
		const editBtn = page.getByRole("button", { name: /^edit /i }).first();
		await editBtn.click();
		await page.getByRole("button", { name: "Cancel" }).click();
		await expect(page.getByText("Edit Watchlist")).not.toBeVisible();
	});

	test("shows result count in footer", async ({ page }) => {
		await page.goto("/watchlist");
		await expect(page.getByText(/showing 1-\d+ of \d+ results/i)).toBeVisible();
	});
});

test.describe("Watchlist Detail Page", () => {
	async function goToFirstWatchlistDetail(
		page: import("@playwright/test").Page,
	) {
		await page.goto("/watchlist");
		await page
			.locator("[data-slot='watchlist-row'] a, a[data-slot='watchlist-row']")
			.first()
			.click();
		await expect(page.getByText("Back to Watchlists")).toBeVisible();
	}

	test("navigates to watchlist detail", async ({ page }) => {
		await goToFirstWatchlistDetail(page);
		await expect(page.getByText("Back to Watchlists")).toBeVisible();
	});

	test("displays linked tv shows count", async ({ page }) => {
		await goToFirstWatchlistDetail(page);
		await expect(page.getByText(/\d+ Shows?/)).toBeVisible();
	});

	test("has add show button", async ({ page }) => {
		await goToFirstWatchlistDetail(page);
		await expect(page.getByText("Add Show")).toBeVisible();
	});

	test("opens add show modal", async ({ page }) => {
		await goToFirstWatchlistDetail(page);
		await page.getByText("Add Show").click();
		await expect(page.getByText("Add Shows to Watchlist")).toBeVisible();
	});

	test("navigates back to watchlist list", async ({ page }) => {
		await goToFirstWatchlistDetail(page);
		await page.getByText("Back to Watchlists").click();
		await expect(page).toHaveURL("/watchlist");
	});
});
