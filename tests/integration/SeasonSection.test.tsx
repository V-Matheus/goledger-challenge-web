import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SeasonSection } from "@/app/tv-shows/[id]/_components/SeasonSection";
import type { Episode, Season } from "@/lib/types";
import { renderWithProviders } from "../helpers/render";

const episodes: Episode[] = [
	{
		"@assetType": "episodes",
		"@key": "episodes:1",
		"@lastTouchBy": "org1MSP",
		"@lastTx": "tx1",
		"@lastTxID": "txid1",
		"@lastUpdated": "2024-01-15T00:00:00Z",
		season: { "@assetType": "seasons", "@key": "seasons:1" },
		episodeNumber: 1,
		title: "The Ghost in the Circuit",
		description: "A mysterious signal disrupts the network.",
		releaseDate: "2024-01-15T00:00:00Z",
		rating: 8.5,
	},
	{
		"@assetType": "episodes",
		"@key": "episodes:2",
		"@lastTouchBy": "org1MSP",
		"@lastTx": "tx2",
		"@lastTxID": "txid2",
		"@lastUpdated": "2024-01-22T00:00:00Z",
		season: { "@assetType": "seasons", "@key": "seasons:1" },
		episodeNumber: 2,
		title: "Static Equilibrium",
		description: "Tensions rise as alliances shift.",
		releaseDate: "2024-01-22T00:00:00Z",
	},
];

const season: Season = {
	"@assetType": "seasons",
	"@key": "seasons:1",
	"@lastTouchBy": "org1MSP",
	"@lastTx": "tx1",
	"@lastTxID": "txid1",
	"@lastUpdated": "2024-01-01T00:00:00Z",
	number: 2,
	year: 2024,
	tvShow: { "@assetType": "tvShows", "@key": "tvShows:1" },
};

const emptySeason: Season = {
	...season,
	"@key": "seasons:2",
	number: 1,
	year: 2023,
};

vi.mock("@/lib/queries/episodes", () => ({
	useEpisodes: (ref: { "@key": string }) => {
		if (ref["@key"] === "seasons:1") {
			return { data: { result: episodes }, isLoading: false };
		}
		return { data: { result: [] }, isLoading: false };
	},
	episodeKeys: { all: ["episodes"] },
}));

vi.mock("@/app/tv-shows/actions", () => ({
	updateSeasonAction: vi.fn(),
	deleteSeasonAction: vi.fn(),
	updateEpisodeAction: vi.fn(),
	deleteEpisodeAction: vi.fn(),
	createEpisodeAction: vi.fn(),
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

describe("SeasonSection", () => {
	it("renders season number and year", () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		expect(screen.getByText("Season 2")).toBeInTheDocument();
		expect(screen.getByText(/released 2024/i)).toBeInTheDocument();
	});

	it("renders episode count", () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		expect(screen.getByText(/2 episodes/i)).toBeInTheDocument();
	});

	it("renders episode titles", () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		expect(screen.getByText("The Ghost in the Circuit")).toBeInTheDocument();
		expect(screen.getByText("Static Equilibrium")).toBeInTheDocument();
	});

	it("renders episode rating when provided", () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		expect(screen.getByText("8.5")).toBeInTheDocument();
	});

	it("collapses episodes when chevron is clicked", async () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		expect(screen.getByText("The Ghost in the Circuit")).toBeInTheDocument();
		await userEvent.click(
			screen.getByRole("button", { name: /collapse season/i }),
		);
		expect(
			screen.queryByText("The Ghost in the Circuit"),
		).not.toBeInTheDocument();
	});

	it("expands episodes when clicked again", async () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		await userEvent.click(
			screen.getByRole("button", { name: /collapse season/i }),
		);
		await userEvent.click(
			screen.getByRole("button", { name: /expand season/i }),
		);
		expect(screen.getByText("The Ghost in the Circuit")).toBeInTheDocument();
	});

	it("opens delete episode modal", async () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		await userEvent.click(
			screen.getByRole("button", { name: /delete the ghost in the circuit/i }),
		);
		expect(
			screen.getByText(/delete .the ghost in the circuit./i),
		).toBeInTheDocument();
	});

	it("opens edit episode modal with pre-filled data", async () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		await userEvent.click(
			screen.getByRole("button", { name: /edit the ghost in the circuit/i }),
		);
		expect(screen.getByText(/edit episode/i)).toBeInTheDocument();
		expect(
			screen.getByDisplayValue("The Ghost in the Circuit"),
		).toBeInTheDocument();
	});

	it("opens edit season modal", async () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		await userEvent.click(
			screen.getByRole("button", { name: /edit season 2/i }),
		);
		expect(screen.getByText(/edit season 2/i)).toBeInTheDocument();
		expect(screen.getByDisplayValue("2024")).toBeInTheDocument();
	});

	it("opens delete season modal", async () => {
		renderWithProviders(<SeasonSection season={season} showKey="tvShows:1" />);
		await userEvent.click(
			screen.getByRole("button", { name: /delete season 2/i }),
		);
		expect(screen.getByText(/delete season 2\?/i)).toBeInTheDocument();
	});

	it("shows empty state when no episodes", () => {
		renderWithProviders(
			<SeasonSection season={emptySeason} showKey="tvShows:1" />,
		);
		expect(screen.getByText(/no episodes yet/i)).toBeInTheDocument();
	});
});
