import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Textarea } from "@/components/ui/Textarea";

describe("Textarea", () => {
	it("renders a textarea element", () => {
		render(<Textarea />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("renders with data-slot attribute", () => {
		render(<Textarea />);
		expect(screen.getByRole("textbox")).toHaveAttribute(
			"data-slot",
			"textarea",
		);
	});

	it("renders label when provided", () => {
		render(<Textarea label="Description" id="desc" />);
		expect(screen.getByLabelText("Description")).toBeInTheDocument();
	});

	it("passes placeholder", () => {
		render(<Textarea placeholder="Write here..." />);
		expect(screen.getByPlaceholderText("Write here...")).toBeInTheDocument();
	});

	it("accepts user input", async () => {
		render(<Textarea />);
		const textarea = screen.getByRole("textbox");
		await userEvent.type(textarea, "some text");
		expect(textarea).toHaveValue("some text");
	});

	it("merges custom className", () => {
		render(<Textarea className="custom" />);
		expect(screen.getByRole("textbox").className).toContain("custom");
	});
});
