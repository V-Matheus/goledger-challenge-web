import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "@/components/ui/Input";

describe("Input", () => {
	it("renders an input element", () => {
		render(<Input />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("renders with data-slot attribute", () => {
		render(<Input />);
		expect(screen.getByRole("textbox")).toHaveAttribute("data-slot", "input");
	});

	it("renders label when provided", () => {
		render(<Input label="Name" id="name" />);
		expect(screen.getByLabelText("Name")).toBeInTheDocument();
	});

	it("does not render label when not provided", () => {
		render(<Input id="test" />);
		expect(screen.queryByRole("label")).not.toBeInTheDocument();
	});

	it("passes placeholder", () => {
		render(<Input placeholder="Enter name" />);
		expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
	});

	it("accepts user input", async () => {
		render(<Input />);
		const input = screen.getByRole("textbox");
		await userEvent.type(input, "hello");
		expect(input).toHaveValue("hello");
	});

	it("merges custom className", () => {
		render(<Input className="custom" />);
		expect(screen.getByRole("textbox").className).toContain("custom");
	});
});
