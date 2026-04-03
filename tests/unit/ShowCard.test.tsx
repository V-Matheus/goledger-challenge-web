import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ShowCard } from "@/app/tv-shows/_components/ShowCard";

describe("ShowCard", () => {
	const props = {
		title: "Breaking Bad",
		description: "A chemistry teacher turned drug manufacturer.",
		recommendedAge: 16,
	};

	it("renders title", () => {
		render(<ShowCard {...props} />);
		expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(<ShowCard {...props} />);
		expect(
			screen.getByText("A chemistry teacher turned drug manufacturer."),
		).toBeInTheDocument();
	});

	it("renders recommended age badge", () => {
		render(<ShowCard {...props} />);
		expect(screen.getByText("16+")).toBeInTheDocument();
	});

	it("renders initials from title", () => {
		render(<ShowCard {...props} />);
		expect(screen.getByText("BB")).toBeInTheDocument();
	});

	it("renders single-word initials", () => {
		render(<ShowCard {...props} title="Invencível" />);
		expect(screen.getByText("I")).toBeInTheDocument();
	});

	it("renders data-slot attribute", () => {
		const { container } = render(<ShowCard {...props} />);
		expect(
			container.querySelector("[data-slot='show-card']"),
		).toBeInTheDocument();
	});

	it("renders 'Added just now' when less than 1 hour ago", () => {
		const recent = new Date(Date.now() - 10 * 60 * 1000).toISOString();
		render(<ShowCard {...props} lastUpdated={recent} />);
		expect(screen.getByText("Added just now")).toBeInTheDocument();
	});

	it("renders hours when less than 24 hours ago", () => {
		const recent = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
		render(<ShowCard {...props} lastUpdated={recent} />);
		expect(screen.getByText("Added 2h ago")).toBeInTheDocument();
	});

	it("renders days when more than 24 hours ago", () => {
		const old = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
		render(<ShowCard {...props} lastUpdated={old} />);
		expect(screen.getByText("Added 3d ago")).toBeInTheDocument();
	});

	it("does not render time when lastUpdated is not provided", () => {
		render(<ShowCard {...props} />);
		expect(screen.queryByText(/Added/)).not.toBeInTheDocument();
	});

	it("renders more options button", () => {
		render(<ShowCard {...props} />);
		expect(
			screen.getByRole("button", { name: /more options/i }),
		).toBeInTheDocument();
	});
});
