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

	it("renders all navigation items in both layouts", () => {
		render(<Sidebar />);
		expect(screen.getAllByText("Dashboard")).toHaveLength(2);
		expect(screen.getAllByText("TV Shows")).toHaveLength(2);
		expect(screen.getAllByText("Watchlist")).toHaveLength(2);
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
		const tvShowsLinks = screen.getAllByText("TV Shows");
		for (const link of tvShowsLinks) {
			expect(link.closest("a")).toHaveAttribute("data-active");
		}
	});

	it("does not mark inactive pages with data-active", () => {
		render(<Sidebar />);
		const dashboardLinks = screen.getAllByText("Dashboard");
		for (const link of dashboardLinks) {
			expect(link.closest("a")).not.toHaveAttribute("data-active");
		}
	});

	it("applies custom className", () => {
		render(<Sidebar className="my-custom" />);
		expect(screen.getByRole("complementary")).toHaveClass("my-custom");
	});
});
