import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Header } from "@/components/layout/Header";

const mockToggleTheme = vi.fn();

vi.mock("@/hooks/use-theme", () => ({
	useTheme: () => ({
		theme: "dark",
		toggleTheme: mockToggleTheme,
		setTheme: vi.fn(),
	}),
}));

describe("Header", () => {
	it("renders with data-slot attribute", () => {
		render(<Header />);
		expect(screen.getByRole("banner")).toHaveAttribute("data-slot", "header");
	});

	it("renders search input", () => {
		render(<Header />);
		expect(
			screen.getByPlaceholderText(/search for shows/i),
		).toBeInTheDocument();
	});

	it("renders theme toggle button", () => {
		render(<Header />);
		expect(
			screen.getByRole("button", { name: /toggle theme/i }),
		).toBeInTheDocument();
	});

	it("calls toggleTheme when button is clicked", async () => {
		render(<Header />);
		await userEvent.click(
			screen.getByRole("button", { name: /toggle theme/i }),
		);
		expect(mockToggleTheme).toHaveBeenCalledOnce();
	});

	it("applies custom className", () => {
		render(<Header className="my-custom" />);
		expect(screen.getByRole("banner")).toHaveClass("my-custom");
	});
});
