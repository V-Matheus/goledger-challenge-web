import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AddShowButton } from "@/app/watchlist/[id]/_components/AddShowButton";
import type { TvShow, Watchlist } from "@/lib/types";
import { renderWithProviders } from "../helpers/render";

vi.mock("@/app/watchlist/actions", () => ({
	updateWatchlistShowsAction: vi.fn(),
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

const watchlist: Watchlist = {
	"@assetType": "watchlist",
	"@key": "watchlist:1",
	"@lastTouchBy": "org1MSP",
	"@lastTx": "tx1",
	"@lastTxID": "txid1",
	"@lastUpdated": "2026-04-03T12:00:00Z",
	title: "My Watchlist",
	description: "A test watchlist",
	tvShows: [{ "@assetType": "tvShows", "@key": "tvShows:1" }],
};

const allShows: TvShow[] = [
	{
		"@assetType": "tvShows",
		"@key": "tvShows:1",
		"@lastTouchBy": "org1MSP",
		"@lastTx": "tx1",
		"@lastTxID": "txid1",
		"@lastUpdated": "2026-04-03T12:00:00Z",
		title: "Breaking Bad",
		description: "A chemistry teacher turns to crime.",
		recommendedAge: 16,
	},
	{
		"@assetType": "tvShows",
		"@key": "tvShows:2",
		"@lastTouchBy": "org1MSP",
		"@lastTx": "tx2",
		"@lastTxID": "txid2",
		"@lastUpdated": "2026-04-02T10:00:00Z",
		title: "Game of Thrones",
		description: "Noble families fight for the throne.",
		recommendedAge: 18,
	},
	{
		"@assetType": "tvShows",
		"@key": "tvShows:3",
		"@lastTouchBy": "org1MSP",
		"@lastTx": "tx3",
		"@lastTxID": "txid3",
		"@lastUpdated": "2026-04-01T10:00:00Z",
		title: "GoLedger Labs",
		description: "Blockchain documentary.",
		recommendedAge: 0,
	},
];

describe("AddShowButton", () => {
	it("renders Add Show button", () => {
		renderWithProviders(
			<AddShowButton
				watchlistKey="watchlist:1"
				watchlist={watchlist}
				allShows={allShows}
			/>,
		);
		expect(screen.getByText("Add Show")).toBeInTheDocument();
	});

	it("opens modal when clicked", async () => {
		renderWithProviders(
			<AddShowButton
				watchlistKey="watchlist:1"
				watchlist={watchlist}
				allShows={allShows}
			/>,
		);
		await userEvent.click(screen.getByText("Add Show"));
		expect(screen.getByText(/add shows to watchlist/i)).toBeInTheDocument();
	});

	it("only shows shows not already in watchlist", async () => {
		renderWithProviders(
			<AddShowButton
				watchlistKey="watchlist:1"
				watchlist={watchlist}
				allShows={allShows}
			/>,
		);
		await userEvent.click(screen.getByText("Add Show"));
		expect(screen.queryByText("Breaking Bad")).not.toBeInTheDocument();
		expect(screen.getByText("Game of Thrones")).toBeInTheDocument();
		expect(screen.getByText("GoLedger Labs")).toBeInTheDocument();
	});

	it("shows empty state when all shows are added", async () => {
		const fullWatchlist: Watchlist = {
			...watchlist,
			tvShows: allShows.map((s) => ({
				"@assetType": "tvShows" as const,
				"@key": s["@key"],
			})),
		};
		renderWithProviders(
			<AddShowButton
				watchlistKey="watchlist:1"
				watchlist={fullWatchlist}
				allShows={allShows}
			/>,
		);
		await userEvent.click(screen.getByText("Add Show"));
		expect(
			screen.getByText(/all available shows are already/i),
		).toBeInTheDocument();
	});

	it("selects a show when clicked", async () => {
		renderWithProviders(
			<AddShowButton
				watchlistKey="watchlist:1"
				watchlist={watchlist}
				allShows={allShows}
			/>,
		);
		await userEvent.click(screen.getByText("Add Show"));
		await userEvent.click(screen.getByText("Game of Thrones"));
		expect(screen.getByText("Add (1)")).toBeInTheDocument();
	});

	it("deselects a show when clicked again", async () => {
		renderWithProviders(
			<AddShowButton
				watchlistKey="watchlist:1"
				watchlist={watchlist}
				allShows={allShows}
			/>,
		);
		await userEvent.click(screen.getByText("Add Show"));
		await userEvent.click(screen.getByText("Game of Thrones"));
		await userEvent.click(screen.getByText("Game of Thrones"));
		expect(screen.getByText("Add")).toBeInTheDocument();
	});

	it("submit button is disabled when no shows selected", async () => {
		renderWithProviders(
			<AddShowButton
				watchlistKey="watchlist:1"
				watchlist={watchlist}
				allShows={allShows}
			/>,
		);
		await userEvent.click(screen.getByText("Add Show"));
		expect(screen.getByRole("button", { name: /^add\s*$/i })).toBeDisabled();
	});

	it("closes modal on cancel", async () => {
		renderWithProviders(
			<AddShowButton
				watchlistKey="watchlist:1"
				watchlist={watchlist}
				allShows={allShows}
			/>,
		);
		await userEvent.click(screen.getByText("Add Show"));
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(
			screen.queryByText(/add shows to watchlist/i),
		).not.toBeInTheDocument();
	});
});
