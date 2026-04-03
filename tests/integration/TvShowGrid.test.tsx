import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TvShowGrid } from "@/app/tv-shows/_components/TvShowGrid";

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

const items = [
	{
		key: "tvShows:1",
		title: "Breaking Bad",
		description: "A chemistry teacher turns to crime.",
		recommendedAge: 16,
		lastUpdated: "2026-04-03T15:00:00Z",
	},
	{
		key: "tvShows:2",
		title: "Game of Thrones",
		description: "Noble families fight for the throne.",
		recommendedAge: 18,
		lastUpdated: "2026-04-02T10:00:00Z",
	},
];

describe("TvShowGrid", () => {
	it("renders all show cards", () => {
		render(<TvShowGrid items={items} />);
		expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
		expect(screen.getByText("Game of Thrones")).toBeInTheDocument();
	});

	it("renders links to show detail pages", () => {
		render(<TvShowGrid items={items} />);
		const links = screen.getAllByRole("link");
		expect(
			links.some((l) => l.getAttribute("href")?.includes("tvShows%3A1")),
		).toBe(true);
	});

	it("opens delete modal when trash button is clicked", async () => {
		render(<TvShowGrid items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /delete breaking bad/i }),
		);
		expect(screen.getByText(/delete .breaking bad./i)).toBeInTheDocument();
		expect(
			screen.getByText(/this action cannot be undone/i),
		).toBeInTheDocument();
	});

	it("closes delete modal on cancel", async () => {
		render(<TvShowGrid items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /delete breaking bad/i }),
		);
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(
			screen.queryByText(/delete .breaking bad./i),
		).not.toBeInTheDocument();
	});

	it("opens edit modal when pencil button is clicked", async () => {
		render(<TvShowGrid items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /edit breaking bad/i }),
		);
		expect(screen.getByText(/edit tv show/i)).toBeInTheDocument();
	});

	it("edit modal has pre-filled fields", async () => {
		render(<TvShowGrid items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /edit breaking bad/i }),
		);
		expect(screen.getByDisplayValue("Breaking Bad")).toBeInTheDocument();
		expect(
			screen.getByDisplayValue("A chemistry teacher turns to crime."),
		).toBeInTheDocument();
		expect(screen.getByDisplayValue("16")).toBeInTheDocument();
	});

	it("closes edit modal on cancel", async () => {
		render(<TvShowGrid items={items} />);
		await userEvent.click(
			screen.getByRole("button", { name: /edit breaking bad/i }),
		);
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(screen.queryByText(/edit tv show/i)).not.toBeInTheDocument();
	});
});
