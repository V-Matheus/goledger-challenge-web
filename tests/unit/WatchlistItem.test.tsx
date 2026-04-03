import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WatchlistItem } from "@/app/watchlist/_components/WatchlistItem";

describe("WatchlistItem", () => {
	it("renders title", () => {
		render(<WatchlistItem title="Weekend Binge" />);
		expect(screen.getByText("Weekend Binge")).toBeInTheDocument();
	});

	it("renders initials avatar", () => {
		render(<WatchlistItem title="Sci-Fi Curations" />);
		expect(screen.getByText("SC")).toBeInTheDocument();
	});

	it("renders tvShowCount in meta", () => {
		render(<WatchlistItem title="List" tvShowCount={5} />);
		expect(screen.getByText("5 Items")).toBeInTheDocument();
	});

	it("renders formatted lastUpdated in meta", () => {
		const recent = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
		render(<WatchlistItem title="List" lastUpdated={recent} />);
		expect(screen.getByText(/Updated 3h ago/)).toBeInTheDocument();
	});

	it("renders combined meta with bullet separator", () => {
		const recent = new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString();
		render(<WatchlistItem title="List" tvShowCount={2} lastUpdated={recent} />);
		expect(screen.getByText(/2 Items • Updated 1h ago/)).toBeInTheDocument();
	});

	it("renders chevron icon", () => {
		const { container } = render(<WatchlistItem title="List" />);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("renders data-slot attribute", () => {
		const { container } = render(<WatchlistItem title="List" />);
		expect(
			container.querySelector("[data-slot='watchlist-item']"),
		).toBeInTheDocument();
	});
});
