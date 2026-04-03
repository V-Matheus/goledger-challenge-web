import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { WatchlistRow } from "@/app/watchlist/_components/WatchlistRow";

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

describe("WatchlistRow", () => {
	it("renders title", () => {
		render(<WatchlistRow title="My List" />);
		expect(screen.getByText("My List")).toBeInTheDocument();
	});

	it("renders description when provided", () => {
		render(<WatchlistRow title="List" description="A great list" />);
		expect(screen.getByText("A great list")).toBeInTheDocument();
	});

	it("renders tv show count", () => {
		render(<WatchlistRow title="List" tvShowCount={3} />);
		expect(screen.getByText("3 shows")).toBeInTheDocument();
	});

	it("renders singular show count", () => {
		render(<WatchlistRow title="List" tvShowCount={1} />);
		expect(screen.getByText("1 show")).toBeInTheDocument();
	});

	it("renders colored initials avatar", () => {
		render(<WatchlistRow title="Sci-Fi Curations" />);
		expect(screen.getByText("SC")).toBeInTheDocument();
	});

	it("renders as link when href is provided", () => {
		render(<WatchlistRow title="List" href="/watchlist/1" />);
		expect(screen.getByRole("link")).toHaveAttribute("href", "/watchlist/1");
	});

	it("renders as div when no href", () => {
		render(<WatchlistRow title="List" />);
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
	});

	it("calls onEdit when edit button clicked", async () => {
		const onEdit = vi.fn();
		render(<WatchlistRow title="List" onEdit={onEdit} />);
		await userEvent.click(screen.getByRole("button", { name: /edit/i }));
		expect(onEdit).toHaveBeenCalledOnce();
	});

	it("calls onDelete when delete button clicked", async () => {
		const onDelete = vi.fn();
		render(<WatchlistRow title="List" onDelete={onDelete} />);
		await userEvent.click(screen.getByRole("button", { name: /delete/i }));
		expect(onDelete).toHaveBeenCalledOnce();
	});

	it("renders 'Just now' when updated less than 1 hour ago", () => {
		const recent = new Date(Date.now() - 10 * 60 * 1000).toISOString();
		render(<WatchlistRow title="List" lastUpdated={recent} />);
		expect(screen.getByText("Just now")).toBeInTheDocument();
	});

	it("renders days when updated more than 24 hours ago", () => {
		const old = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
		render(<WatchlistRow title="List" lastUpdated={old} />);
		expect(screen.getByText("3d ago")).toBeInTheDocument();
	});

	it("does not render edit button when onEdit not provided", () => {
		render(<WatchlistRow title="List" />);
		expect(
			screen.queryByRole("button", { name: /edit/i }),
		).not.toBeInTheDocument();
	});

	it("does not render delete button when onDelete not provided", () => {
		render(<WatchlistRow title="List" />);
		expect(
			screen.queryByRole("button", { name: /delete/i }),
		).not.toBeInTheDocument();
	});
});
