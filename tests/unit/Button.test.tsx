import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
	it("renders children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText("Click me")).toBeInTheDocument();
	});

	it("renders with data-slot attribute", () => {
		render(<Button>Test</Button>);
		expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
	});

	it("calls onClick when clicked", async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Click</Button>);
		await userEvent.click(screen.getByRole("button"));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it("applies primary variant by default", () => {
		render(<Button>Primary</Button>);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("from-primary-dim");
	});

	it("applies destructive variant", () => {
		render(<Button variant="destructive">Delete</Button>);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("bg-error");
	});

	it("applies ghost variant", () => {
		render(<Button variant="ghost">Ghost</Button>);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("bg-transparent");
	});

	it("applies size sm", () => {
		render(<Button size="sm">Small</Button>);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("h-7");
	});

	it("applies size lg", () => {
		render(<Button size="lg">Large</Button>);
		const btn = screen.getByRole("button");
		expect(btn.className).toContain("h-11");
	});

	it("sets disabled state via data attribute", () => {
		render(<Button disabled>Disabled</Button>);
		const btn = screen.getByRole("button");
		expect(btn).toBeDisabled();
		expect(btn).toHaveAttribute("data-disabled", "");
	});

	it("does not set data-disabled when not disabled", () => {
		render(<Button>Enabled</Button>);
		expect(screen.getByRole("button")).not.toHaveAttribute("data-disabled");
	});

	it("merges custom className", () => {
		render(<Button className="custom-class">Test</Button>);
		expect(screen.getByRole("button").className).toContain("custom-class");
	});
});
