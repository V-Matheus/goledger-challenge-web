import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Sidebar } from "@/components/layout/Sidebar";

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

vi.mock("next/navigation", () => ({
	usePathname: () => "/tv-shows",
}));

describe("Sidebar", () => {
	it("renders with data-slot attribute", () => {
		render(<Sidebar />);
		expect(screen.getByRole("complementary")).toHaveAttribute(
			"data-slot",
			"sidebar",
		);
	});

	it("renders logo text", () => {
		render(<Sidebar />);
		expect(screen.getByText("GoLedger TV")).toBeInTheDocument();
		expect(screen.getByText("Cinematic Curator")).toBeInTheDocument();
	});

	it("renders all navigation items", () => {
		render(<Sidebar />);
		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(screen.getByText("TV Shows")).toBeInTheDocument();
		expect(screen.getByText("Watchlist")).toBeInTheDocument();
	});

	it("renders correct navigation links", () => {
		render(<Sidebar />);
		const links = screen.getAllByRole("link");
		expect(links.some((l) => l.getAttribute("href") === "/")).toBe(true);
		expect(links.some((l) => l.getAttribute("href") === "/tv-shows")).toBe(
			true,
		);
		expect(links.some((l) => l.getAttribute("href") === "/watchlist")).toBe(
			true,
		);
	});

	it("marks active page with data-active attribute", () => {
		render(<Sidebar />);
		const tvShowsLink = screen.getByText("TV Shows").closest("a");
		expect(tvShowsLink).toHaveAttribute("data-active");
	});

	it("does not mark inactive pages with data-active", () => {
		render(<Sidebar />);
		const dashboardLink = screen.getByText("Dashboard").closest("a");
		expect(dashboardLink).not.toHaveAttribute("data-active");
	});

	it("applies custom className", () => {
		render(<Sidebar className="my-custom" />);
		expect(screen.getByRole("complementary")).toHaveClass("my-custom");
	});
});
