import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TvShowActions } from "@/app/tv-shows/_components/TvShowActions";

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

describe("TvShowActions", () => {
	it("renders New Show button", () => {
		render(<TvShowActions />);
		expect(screen.getByText("New Show")).toBeInTheDocument();
	});

	it("opens create modal when New Show is clicked", async () => {
		render(<TvShowActions />);
		await userEvent.click(screen.getByText("New Show"));
		expect(screen.getByText(/add new tv show/i)).toBeInTheDocument();
	});

	it("create modal has all fields", async () => {
		render(<TvShowActions />);
		await userEvent.click(screen.getByText("New Show"));
		expect(
			screen.getByPlaceholderText(/midnight horizon/i),
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/briefly describe/i),
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/e.g. 16/i)).toBeInTheDocument();
	});

	it("closes create modal on cancel", async () => {
		render(<TvShowActions />);
		await userEvent.click(screen.getByText("New Show"));
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(screen.queryByText(/add new tv show/i)).not.toBeInTheDocument();
	});
});
