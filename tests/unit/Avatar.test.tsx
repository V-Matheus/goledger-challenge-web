import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Avatar } from "@/components/ui/Avatar";

vi.mock("next/image", () => ({
	default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
		<img {...props} />
	),
}));

describe("Avatar", () => {
	it("renders with data-slot attribute", () => {
		render(<Avatar initials="AB" />);
		expect(screen.getByText("AB").closest("[data-slot]")).toHaveAttribute(
			"data-slot",
			"avatar",
		);
	});

	it("renders initials when no src", () => {
		render(<Avatar initials="JD" />);
		expect(screen.getByText("JD")).toBeInTheDocument();
	});

	it("renders fallback when no initials and no src", () => {
		render(<Avatar />);
		expect(screen.getByText("?")).toBeInTheDocument();
	});

	it("renders image when src is provided", () => {
		render(<Avatar src="/photo.jpg" alt="Photo" />);
		expect(screen.getByAltText("Photo")).toBeInTheDocument();
	});

	it("applies size sm", () => {
		render(<Avatar size="sm" initials="A" />);
		const el = screen.getByText("A").closest("[data-slot]");
		expect(el?.className).toContain("size-7");
	});

	it("applies size lg", () => {
		render(<Avatar size="lg" initials="A" />);
		const el = screen.getByText("A").closest("[data-slot]");
		expect(el?.className).toContain("size-11");
	});

	it("merges custom className", () => {
		render(<Avatar initials="X" className="custom" />);
		const el = screen.getByText("X").closest("[data-slot]");
		expect(el?.className).toContain("custom");
	});
});
