import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
	it("renders children", () => {
		render(<Badge>New</Badge>);
		expect(screen.getByText("New")).toBeInTheDocument();
	});

	it("renders with data-slot attribute", () => {
		render(<Badge>Test</Badge>);
		expect(screen.getByText("Test")).toHaveAttribute("data-slot", "badge");
	});

	it("applies default variant", () => {
		render(<Badge>Default</Badge>);
		expect(screen.getByText("Default").className).toContain("bg-primary/20");
	});

	it("applies success variant", () => {
		render(<Badge variant="success">Success</Badge>);
		expect(screen.getByText("Success").className).toContain("bg-success/20");
	});

	it("applies warning variant", () => {
		render(<Badge variant="warning">Warning</Badge>);
		expect(screen.getByText("Warning").className).toContain("bg-warning/20");
	});

	it("applies error variant", () => {
		render(<Badge variant="error">Error</Badge>);
		expect(screen.getByText("Error").className).toContain("bg-error/20");
	});

	it("merges custom className", () => {
		render(<Badge className="custom">Test</Badge>);
		expect(screen.getByText("Test").className).toContain("custom");
	});
});
