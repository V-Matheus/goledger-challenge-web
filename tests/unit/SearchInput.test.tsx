import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SearchInput } from "@/components/ui/SearchInput";

describe("SearchInput", () => {
	it("renders a search input", () => {
		render(<SearchInput />);
		expect(screen.getByRole("searchbox")).toBeInTheDocument();
	});

	it("renders with data-slot attribute", () => {
		const { container } = render(<SearchInput />);
		expect(
			container.querySelector("[data-slot='search-input']"),
		).toBeInTheDocument();
	});

	it("passes placeholder", () => {
		render(<SearchInput placeholder="Search..." />);
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});

	it("accepts user input", async () => {
		render(<SearchInput />);
		const input = screen.getByRole("searchbox");
		await userEvent.type(input, "breaking bad");
		expect(input).toHaveValue("breaking bad");
	});

	it("merges custom className", () => {
		const { container } = render(<SearchInput className="custom" />);
		expect(
			container.querySelector("[data-slot='search-input']")?.className,
		).toContain("custom");
	});
});
