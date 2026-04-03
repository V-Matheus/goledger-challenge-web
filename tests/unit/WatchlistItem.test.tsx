import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WatchlistItem } from "@/app/watchlist/_components/WatchlistItem";

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

	it("renders 'Updated just now' when less than 1 hour ago", () => {
		const recent = new Date(Date.now() - 10 * 60 * 1000).toISOString();
		render(<WatchlistItem title="List" lastUpdated={recent} />);
		expect(screen.getByText(/Updated just now/)).toBeInTheDocument();
	});

	it("renders days when more than 24 hours ago", () => {
		const old = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
		render(<WatchlistItem title="List" lastUpdated={old} />);
		expect(screen.getByText(/Updated 2d ago/)).toBeInTheDocument();
	});

	it("renders as link when href is provided", () => {
		render(<WatchlistItem title="List" href="/watchlist/1" />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/watchlist/1");
	});

	it("renders as div when href is not provided", () => {
		const { container } = render(<WatchlistItem title="List" />);
		expect(
			container.querySelector("[data-slot='watchlist-item']")?.tagName,
		).toBe("DIV");
	});
});
