import { expect, test } from "@playwright/test";

test.describe("TV Shows Page", () => {
	test("navigates to tv shows page", async ({ page }) => {
		await page.goto("/");
		await page.getByRole("link", { name: "TV Shows" }).click();
		await expect(page).toHaveURL("/tv-shows");
		await expect(page.locator("h1")).toContainText("TV Shows");
	});

	test("displays show cards", async ({ page }) => {
		await page.goto("/tv-shows");
		await expect(page.getByText("Game of Thrones")).toBeVisible();
	});

	test("opens create modal", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByText("New Show").click();
		await expect(page.getByText("Add New TV Show")).toBeVisible();
		await expect(page.getByPlaceholder("e.g. Midnight Horizon")).toBeVisible();
		await expect(page.getByPlaceholder("e.g. 16")).toBeVisible();
	});

	test("closes create modal on cancel", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByText("New Show").click();
		await page.getByRole("button", { name: "Cancel" }).click();
		await expect(page.getByText("Add New TV Show")).not.toBeVisible();
	});

	test("closes create modal on backdrop click", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByText("New Show").click();
		await expect(page.getByText("Add New TV Show")).toBeVisible();
		const dialog = page.locator("dialog[data-slot='modal']").first();
		await dialog.click({ position: { x: 5, y: 5 } });
		await expect(page.getByText("Add New TV Show")).not.toBeVisible();
	});

	test("opens delete modal from show card", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("button", { name: /delete game of thrones/i }).click();
		await expect(page.getByText(/This action cannot be undone/)).toBeVisible();
	});

	test("opens edit modal from show card", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("button", { name: /edit game of thrones/i }).click();
		await expect(page.getByText("Edit TV Show")).toBeVisible();
		await expect(page.locator('input[value="Game of Thrones"]')).toBeVisible();
	});

	test("navigates to show detail page", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await expect(page.locator("h1")).toContainText("Game of Thrones");
		await expect(page.getByText("Back to TV Shows")).toBeVisible();
	});
});

test.describe("TV Show Detail Page", () => {
	test("displays show info", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await expect(page.getByText("18+")).toBeVisible();
		await expect(page.getByText(/Seasons/)).toBeVisible();
		await expect(page.getByText(/\d+ Episodes?$/).first()).toBeVisible();
	});

	test("displays seasons with episodes", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await expect(page.getByText("Season 2")).toBeVisible();
		await expect(page.getByText("The Ghost in the Circuit")).toBeVisible();
	});

	test("collapses and expands season", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await expect(page.getByText("The Ghost in the Circuit")).toBeVisible();
		await page
			.getByRole("button", { name: /collapse season/i })
			.first()
			.click();
		await expect(page.getByText("The Ghost in the Circuit")).not.toBeVisible();
		await page
			.getByRole("button", { name: /expand season/i })
			.first()
			.click();
		await expect(page.getByText("The Ghost in the Circuit")).toBeVisible();
	});

	test("opens add season modal", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await page.getByText("Add Season").click();
		await expect(page.getByText("Season Number")).toBeVisible();
		await expect(page.getByText("Year of Release")).toBeVisible();
	});

	test("opens add episode modal", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await page.getByText("Add Episode").first().click();
		await expect(page.getByText("Episode Number")).toBeVisible();
	});

	test("opens edit episode modal", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await page
			.getByRole("button", { name: /edit the ghost in the circuit/i })
			.click();
		await expect(page.getByText("Edit Episode")).toBeVisible();
		await expect(
			page.locator('input[value="The Ghost in the Circuit"]'),
		).toBeVisible();
	});

	test("opens delete episode modal", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await page
			.getByRole("button", { name: /delete the ghost in the circuit/i })
			.click();
		await expect(
			page.getByText(/This episode will be permanently removed/),
		).toBeVisible();
	});

	test("opens edit season modal", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await page.getByRole("button", { name: /edit season 2/i }).click();
		await expect(page.getByText("Edit Season 2")).toBeVisible();
		await expect(page.locator('input[value="2024"]')).toBeVisible();
	});

	test("opens delete season modal", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await page.getByRole("button", { name: /delete season 2/i }).click();
		await expect(page.getByText(/Delete Season 2/)).toBeVisible();
	});

	test("navigates back to tv shows", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.getByRole("link", { name: "Game of Thrones" }).first().click();
		await page.getByText("Back to TV Shows").click();
		await expect(page).toHaveURL("/tv-shows");
	});
});
