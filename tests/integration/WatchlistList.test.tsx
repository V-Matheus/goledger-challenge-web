import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WatchlistList } from "@/app/watchlist/_components/WatchlistList";
import type { Watchlist } from "@/lib/types";
import { renderWithProviders } from "../helpers/render";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
		...props
	}: { children: React.ReactNode; href: string } & Record<string, unknown>) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

vi.mock("@/app/watchlist/actions", () => ({
	updateWatchlistAction: vi.fn(),
	deleteWatchlistAction: vi.fn(),
}));

beforeEach(() => {
	HTMLDialogElement.prototype.showModal = vi.fn(function (
		this: HTMLDialogElement,
	) {
		this.setAttribute("open", "");
	});
	HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
		this.removeAttribute("open");
	});
});

const items: Watchlist[] = [
	{
		"@assetType": "watchlist",
		"@key": "watchlist:1",
		"@lastTouchBy": "org1MSP",
		"@lastTx": "tx1",
		"@lastTxID": "txid1",
		"@lastUpdated": "2026-04-03T12:00:00Z",
		title: "Sci-Fi Curations",
		description: "Best sci-fi series.",
		tvShows: [
			{ "@assetType": "tvShows", "@key": "tvShows:1" },
			{ "@assetType": "tvShows", "@key": "tvShows:2" },
			{ "@assetType": "tvShows", "@key": "tvShows:3" },
		],
	},
	{
		"@assetType": "watchlist",
		"@key": "watchlist:2",
		"@lastTouchBy": "org1MSP",
		"@lastTx": "tx2",
		"@lastTxID": "txid2",
		"@lastUpdated": "2026-04-02T10:00:00Z",
		title: "Weekend Binge",
		description: "Quick series.",
		tvShows: [{ "@assetType": "tvShows", "@key": "tvShows:1" }],
	},
];

describe("WatchlistList", () => {
	it("renders all watchlist items", () => {
		renderWithProviders(<WatchlistList items={items} />);
		expect(screen.getByText("Sci-Fi Curations")).toBeInTheDocument();
		expect(screen.getByText("Weekend Binge")).toBeInTheDocument();
	});

	it("renders links to watchlist detail pages", () => {
		renderWithProviders(<WatchlistList items={items} />);
		const links = screen.getAllByRole("link");
		expect(
			links.some((l) => l.getAttribute("href")?.includes("watchlist%3A1")),
		).toBe(true);
	});

	it("opens delete modal when delete button is clicked", async () => {
		renderWithProviders(<WatchlistList items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /delete sci-fi curations/i }),
		);
		expect(screen.getByText(/delete .sci-fi curations./i)).toBeInTheDocument();
	});

	it("closes delete modal on cancel", async () => {
		renderWithProviders(<WatchlistList items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /delete sci-fi curations/i }),
		);
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(
			screen.queryByText(/delete .sci-fi curations./i),
		).not.toBeInTheDocument();
	});

	it("opens edit modal when edit button is clicked", async () => {
		renderWithProviders(<WatchlistList items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /edit sci-fi curations/i }),
		);
		expect(screen.getByText(/edit watchlist/i)).toBeInTheDocument();
	});

	it("edit modal has pre-filled fields", async () => {
		renderWithProviders(<WatchlistList items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /edit sci-fi curations/i }),
		);
		expect(screen.getByDisplayValue("Sci-Fi Curations")).toBeInTheDocument();
		expect(screen.getByDisplayValue("Best sci-fi series.")).toBeInTheDocument();
	});

	it("closes edit modal on cancel", async () => {
		renderWithProviders(<WatchlistList items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /edit sci-fi curations/i }),
		);
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(screen.queryByText(/edit watchlist/i)).not.toBeInTheDocument();
	});
});
