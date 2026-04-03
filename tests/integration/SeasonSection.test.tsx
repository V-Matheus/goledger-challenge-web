import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SeasonSection } from "@/app/tv-shows/[id]/_components/SeasonSection";

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

const episodes = [
	{
		key: "episodes:1",
		episodeNumber: 1,
		title: "The Ghost in the Circuit",
		description: "A mysterious signal disrupts the network.",
		releaseDate: "2024-01-15T00:00:00Z",
		rating: 8.5,
	},
	{
		key: "episodes:2",
		episodeNumber: 2,
		title: "Static Equilibrium",
		description: "Tensions rise as alliances shift.",
		releaseDate: "2024-01-22T00:00:00Z",
	},
];

describe("SeasonSection", () => {
	it("renders season number and year", () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={2}
				year={2024}
				episodes={episodes}
			/>,
		);
		expect(screen.getByText("Season 2")).toBeInTheDocument();
		expect(screen.getByText(/released 2024/i)).toBeInTheDocument();
	});

	it("renders episode count", () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={1}
				year={2023}
				episodes={episodes}
			/>,
		);
		expect(screen.getByText(/2 episodes/i)).toBeInTheDocument();
	});

	it("renders episode titles", () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={1}
				year={2023}
				episodes={episodes}
			/>,
		);
		expect(screen.getByText("The Ghost in the Circuit")).toBeInTheDocument();
		expect(screen.getByText("Static Equilibrium")).toBeInTheDocument();
	});

	it("renders episode rating when provided", () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={1}
				year={2023}
				episodes={episodes}
			/>,
		);
		expect(screen.getByText("8.5")).toBeInTheDocument();
	});

	it("collapses episodes when chevron is clicked", async () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={1}
				year={2023}
				episodes={episodes}
			/>,
		);
		expect(screen.getByText("The Ghost in the Circuit")).toBeInTheDocument();
		await userEvent.click(
			screen.getByRole("button", { name: /collapse season/i }),
		);
		expect(
			screen.queryByText("The Ghost in the Circuit"),
		).not.toBeInTheDocument();
	});

	it("expands episodes when clicked again", async () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={1}
				year={2023}
				episodes={episodes}
			/>,
		);
		await userEvent.click(
			screen.getByRole("button", { name: /collapse season/i }),
		);
		await userEvent.click(
			screen.getByRole("button", { name: /expand season/i }),
		);
		expect(screen.getByText("The Ghost in the Circuit")).toBeInTheDocument();
	});

	it("opens delete episode modal", async () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={1}
				year={2023}
				episodes={episodes}
			/>,
		);
		await userEvent.click(
			screen.getByRole("button", { name: /delete the ghost in the circuit/i }),
		);
		expect(
			screen.getByText(/delete .the ghost in the circuit./i),
		).toBeInTheDocument();
	});

	it("opens edit episode modal with pre-filled data", async () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={1}
				year={2023}
				episodes={episodes}
			/>,
		);
		await userEvent.click(
			screen.getByRole("button", { name: /edit the ghost in the circuit/i }),
		);
		expect(screen.getByText(/edit episode/i)).toBeInTheDocument();
		expect(
			screen.getByDisplayValue("The Ghost in the Circuit"),
		).toBeInTheDocument();
	});

	it("opens edit season modal", async () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={1}
				year={2023}
				episodes={episodes}
			/>,
		);
		await userEvent.click(
			screen.getByRole("button", { name: /edit season 1/i }),
		);
		expect(screen.getByText(/edit season 1/i)).toBeInTheDocument();
		expect(screen.getByDisplayValue("2023")).toBeInTheDocument();
	});

	it("opens delete season modal", async () => {
		render(
			<SeasonSection
				seasonKey="s:1"
				number={1}
				year={2023}
				episodes={episodes}
			/>,
		);
		await userEvent.click(
			screen.getByRole("button", { name: /delete season 1/i }),
		);
		expect(screen.getByText(/delete season 1\?/i)).toBeInTheDocument();
	});

	it("shows empty state when no episodes", () => {
		render(
			<SeasonSection seasonKey="s:1" number={1} year={2023} episodes={[]} />,
		);
		expect(screen.getByText(/no episodes yet/i)).toBeInTheDocument();
	});
});
