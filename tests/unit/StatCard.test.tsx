import { render, screen } from "@testing-library/react";
import { Tv } from "lucide-react";
import { describe, expect, it } from "vitest";
import { StatCard } from "@/components/ui/StatCard";

describe("StatCard", () => {
	it("renders label and value", () => {
		render(<StatCard label="Total Shows" value={42} />);
		expect(screen.getByText("Total Shows")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();
	});

	it("renders with data-slot attribute", () => {
		const { container } = render(<StatCard label="Test" value={0} />);
		expect(
			container.querySelector("[data-slot='stat-card']"),
		).toBeInTheDocument();
	});

	it("renders string value", () => {
		render(<StatCard label="Count" value="1,234" />);
		expect(screen.getByText("1,234")).toBeInTheDocument();
	});

	it("renders detail when provided", () => {
		render(
			<StatCard label="Test" value={0} detail={<span>Extra info</span>} />,
		);
		expect(screen.getByText("Extra info")).toBeInTheDocument();
	});

	it("does not render detail when not provided", () => {
		render(<StatCard label="Test" value={0} />);
		expect(screen.queryByText("Extra info")).not.toBeInTheDocument();
	});

	it("renders icon when provided", () => {
		render(<StatCard label="Shows" value={10} icon={Tv} />);
		const svg = document.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	it("merges custom className", () => {
		const { container } = render(
			<StatCard label="Test" value={0} className="custom" />,
		);
		expect(
			container.querySelector("[data-slot='stat-card']")?.className,
		).toContain("custom");
	});
});
