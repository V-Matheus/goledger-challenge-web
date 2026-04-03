import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "@/components/ui/Pagination";

const defaultProps = {
	total: 25,
	pageSize: 10,
	currentPage: 1,
	hasNextPage: true,
	onPreviousPage: vi.fn(),
	onNextPage: vi.fn(),
};

describe("Pagination", () => {
	it("renders with data-slot attribute", () => {
		render(<Pagination {...defaultProps} />);
		expect(screen.getByText(/showing/i).parentElement).toHaveAttribute(
			"data-slot",
			"pagination",
		);
	});

	it("displays correct range for first page", () => {
		render(<Pagination {...defaultProps} />);
		expect(screen.getByText("Showing 1-10 of 25 results")).toBeInTheDocument();
	});

	it("displays correct range for middle page", () => {
		render(<Pagination {...defaultProps} currentPage={2} />);
		expect(screen.getByText("Showing 11-20 of 25 results")).toBeInTheDocument();
	});

	it("displays correct range for last page with partial results", () => {
		render(
			<Pagination {...defaultProps} currentPage={3} hasNextPage={false} />,
		);
		expect(screen.getByText("Showing 21-25 of 25 results")).toBeInTheDocument();
	});

	it("displays current page number", () => {
		render(<Pagination {...defaultProps} currentPage={2} />);
		expect(screen.getByText("2")).toBeInTheDocument();
	});

	it("disables previous button on first page", () => {
		render(<Pagination {...defaultProps} currentPage={1} />);
		expect(
			screen.getByRole("button", { name: /previous page/i }),
		).toBeDisabled();
	});

	it("enables previous button on page > 1", () => {
		render(<Pagination {...defaultProps} currentPage={2} />);
		expect(
			screen.getByRole("button", { name: /previous page/i }),
		).not.toBeDisabled();
	});

	it("disables next button when no next page", () => {
		render(<Pagination {...defaultProps} hasNextPage={false} />);
		expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
	});

	it("enables next button when has next page", () => {
		render(<Pagination {...defaultProps} hasNextPage={true} />);
		expect(
			screen.getByRole("button", { name: /next page/i }),
		).not.toBeDisabled();
	});

	it("calls onNextPage when next button is clicked", async () => {
		const onNextPage = vi.fn();
		render(<Pagination {...defaultProps} onNextPage={onNextPage} />);
		await userEvent.click(screen.getByRole("button", { name: /next page/i }));
		expect(onNextPage).toHaveBeenCalledOnce();
	});

	it("calls onPreviousPage when previous button is clicked", async () => {
		const onPreviousPage = vi.fn();
		render(
			<Pagination
				{...defaultProps}
				currentPage={2}
				onPreviousPage={onPreviousPage}
			/>,
		);
		await userEvent.click(
			screen.getByRole("button", { name: /previous page/i }),
		);
		expect(onPreviousPage).toHaveBeenCalledOnce();
	});

	it("applies custom className", () => {
		render(<Pagination {...defaultProps} className="my-custom" />);
		expect(screen.getByText(/showing/i).parentElement).toHaveClass("my-custom");
	});
});
