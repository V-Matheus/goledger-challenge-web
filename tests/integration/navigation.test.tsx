import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";

vi.mock("next/image", () => ({
	default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
		<img {...props} />
	),
}));

describe("Navigation links", () => {
	it("renders documentation link with correct href", () => {
		render(<Home />);
		const link = screen.getByRole("link", { name: /documentation/i });
		expect(link).toHaveAttribute(
			"href",
			expect.stringContaining("nextjs.org/docs"),
		);
	});
});
