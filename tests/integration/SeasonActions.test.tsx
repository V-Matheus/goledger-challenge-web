import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	AddEpisodeButton,
	AddSeasonButton,
} from "@/app/tv-shows/[id]/_components/SeasonActions";
import { renderWithProviders } from "../helpers/render";

vi.mock("@/app/tv-shows/actions", () => ({
	createSeasonAction: vi.fn(),
	createEpisodeAction: vi.fn(),
}));

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

describe("AddSeasonButton", () => {
	it("renders Add Season button", () => {
		renderWithProviders(<AddSeasonButton showKey="tvShows:1" />);
		expect(screen.getByText("Add Season")).toBeInTheDocument();
	});

	it("opens modal when clicked", async () => {
		renderWithProviders(<AddSeasonButton showKey="tvShows:1" />);
		await userEvent.click(screen.getByText("Add Season"));
		expect(screen.getByText(/create a new season/i)).toBeInTheDocument();
	});

	it("modal has season number and year fields", async () => {
		renderWithProviders(<AddSeasonButton showKey="tvShows:1" />);
		await userEvent.click(screen.getByText("Add Season"));
		expect(screen.getByPlaceholderText(/e.g. 1/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/e.g. 2024/i)).toBeInTheDocument();
	});

	it("closes modal on cancel", async () => {
		renderWithProviders(<AddSeasonButton showKey="tvShows:1" />);
		await userEvent.click(screen.getByText("Add Season"));
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(screen.queryByText(/create a new season/i)).not.toBeInTheDocument();
	});
});

describe("AddEpisodeButton", () => {
	it("renders Add Episode button", () => {
		renderWithProviders(<AddEpisodeButton seasonKey="seasons:1" />);
		expect(screen.getByText("Add Episode")).toBeInTheDocument();
	});

	it("opens modal when clicked", async () => {
		renderWithProviders(<AddEpisodeButton seasonKey="seasons:1" />);
		await userEvent.click(screen.getByText("Add Episode"));
		expect(screen.getByText(/add a new episode/i)).toBeInTheDocument();
	});

	it("modal has all episode fields", async () => {
		renderWithProviders(<AddEpisodeButton seasonKey="seasons:1" />);
		await userEvent.click(screen.getByText("Add Episode"));
		expect(screen.getByPlaceholderText(/e.g. 1/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/the beginning/i)).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/brief episode summary/i),
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/e.g. 8.5/i)).toBeInTheDocument();
	});

	it("closes modal on cancel", async () => {
		renderWithProviders(<AddEpisodeButton seasonKey="seasons:1" />);
		await userEvent.click(screen.getByText("Add Episode"));
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		expect(screen.queryByText(/add a new episode/i)).not.toBeInTheDocument();
	});
});
