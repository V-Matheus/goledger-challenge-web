import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WatchlistActions } from "@/app/watchlist/_components/WatchlistActions";

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

describe("WatchlistActions", () => {
	it("renders New Watchlist and Clear All buttons", () => {
		render(<WatchlistActions />);
		expect(screen.getByText("New Watchlist")).toBeInTheDocument();
		expect(screen.getByText("Clear All")).toBeInTheDocument();
	});

	it("opens create modal when New Watchlist is clicked", async () => {
		render(<WatchlistActions />);
		await userEvent.click(screen.getByText("New Watchlist"));
		expect(screen.getByText(/create a new collection/i)).toBeInTheDocument();
	});

	it("create modal has title and description fields", async () => {
		render(<WatchlistActions />);
		await userEvent.click(screen.getByText("New Watchlist"));
		expect(screen.getByPlaceholderText(/weekend binge/i)).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/briefly describe/i),
		).toBeInTheDocument();
	});

	it("closes create modal on cancel", async () => {
		render(<WatchlistActions />);
		await userEvent.click(screen.getByText("New Watchlist"));
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(
			screen.queryByText(/create a new collection/i),
		).not.toBeInTheDocument();
	});

	it("opens delete modal when Clear All is clicked", async () => {
		render(<WatchlistActions />);
		await userEvent.click(screen.getByText("Clear All"));
		expect(
			screen.getByText(/are you sure you want to clear all/i),
		).toBeInTheDocument();
	});

	it("closes delete modal on cancel", async () => {
		render(<WatchlistActions />);
		await userEvent.click(screen.getByText("Clear All"));
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(
			screen.queryByText(/are you sure you want to clear all/i),
		).not.toBeInTheDocument();
	});
});
