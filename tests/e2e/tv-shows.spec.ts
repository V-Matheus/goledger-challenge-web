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
		await expect(page.locator("[data-slot='badge']").first()).toBeVisible();
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
		const deleteBtn = page.getByRole("button", { name: /^delete /i }).first();
		await deleteBtn.click();
		await expect(page.getByText(/This action cannot be undone/)).toBeVisible();
	});

	test("opens edit modal from show card", async ({ page }) => {
		await page.goto("/tv-shows");
		const editBtn = page.getByRole("button", { name: /^edit /i }).first();
		await editBtn.click();
		await expect(page.getByText("Edit TV Show")).toBeVisible();
	});

	test("navigates to show detail page", async ({ page }) => {
		await page.goto("/tv-shows");
		await page.locator("a.truncate.text-sm.font-semibold").first().click();
		await page.waitForURL(/\/tv-shows\/.+/);
		await expect(page.getByText("Back to TV Shows")).toBeVisible();
	});
});

test.describe("TV Show Detail Page", () => {
	async function goToFirstShowDetail(page: import("@playwright/test").Page) {
		await page.goto("/tv-shows");
		await page.locator("a.truncate.text-sm.font-semibold").first().click();
		await page.waitForURL(/\/tv-shows\/.+/);
		await expect(page.getByText("Back to TV Shows")).toBeVisible();
	}

	test("displays show info", async ({ page }) => {
		await goToFirstShowDetail(page);
		await expect(page.locator("[data-slot='badge']").first()).toBeVisible();
		await expect(page.getByText(/^\d+ Seasons?$/)).toBeVisible();
	});

	test("displays seasons", async ({ page }) => {
		await goToFirstShowDetail(page);
		await expect(page.getByText(/Season \d+/).first()).toBeVisible();
	});

	test("collapses and expands season", async ({ page }) => {
		await goToFirstShowDetail(page);
		const collapseBtn = page
			.getByRole("button", { name: /collapse season/i })
			.first();
		const expandBtn = page
			.getByRole("button", { name: /expand season/i })
			.first();

		if (await collapseBtn.isVisible()) {
			await collapseBtn.click();
			await expect(expandBtn).toBeVisible();
			await expandBtn.click();
			await expect(collapseBtn).toBeVisible();
		}
	});

	test("opens add season modal", async ({ page }) => {
		await goToFirstShowDetail(page);
		await page.getByText("Add Season").click();
		await expect(page.getByText("Season Number")).toBeVisible();
		await expect(page.getByText("Year of Release")).toBeVisible();
	});

	test("opens add episode modal", async ({ page }) => {
		await goToFirstShowDetail(page);
		await page.getByText("Add Episode").first().click();
		await expect(page.getByText("Episode Number")).toBeVisible();
	});

	test("opens edit season modal", async ({ page }) => {
		await goToFirstShowDetail(page);
		const editBtn = page
			.getByRole("button", { name: /edit season \d+/i })
			.first();
		await editBtn.click();
		await expect(page.getByText(/Edit Season \d+/)).toBeVisible();
	});

	test("opens delete season modal", async ({ page }) => {
		await goToFirstShowDetail(page);
		const deleteBtn = page
			.getByRole("button", { name: /delete season \d+/i })
			.first();
		await deleteBtn.click();
		await expect(page.getByText(/Delete Season \d+/)).toBeVisible();
	});

	test("navigates back to tv shows", async ({ page }) => {
		await goToFirstShowDetail(page);
		await page.getByText("Back to TV Shows").click();
		await expect(page).toHaveURL("/tv-shows");
	});
});
