import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

describe("Card", () => {
	it("renders children", () => {
		render(<Card>Content</Card>);
		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	it("renders with data-slot attribute", () => {
		render(<Card>Test</Card>);
		expect(screen.getByText("Test").closest("[data-slot]")).toHaveAttribute(
			"data-slot",
			"card",
		);
	});

	it("merges custom className", () => {
		render(<Card className="custom">Test</Card>);
		expect(screen.getByText("Test").className).toContain("custom");
	});
});

describe("CardHeader", () => {
	it("renders with data-slot", () => {
		render(<CardHeader>Header</CardHeader>);
		expect(screen.getByText("Header")).toHaveAttribute(
			"data-slot",
			"card-header",
		);
	});
});

describe("CardTitle", () => {
	it("renders as h3 with data-slot", () => {
		render(<CardTitle>Title</CardTitle>);
		const title = screen.getByText("Title");
		expect(title.tagName).toBe("H3");
		expect(title).toHaveAttribute("data-slot", "card-title");
	});
});

describe("CardContent", () => {
	it("renders with data-slot", () => {
		render(<CardContent>Body</CardContent>);
		expect(screen.getByText("Body")).toHaveAttribute(
			"data-slot",
			"card-content",
		);
	});
});
