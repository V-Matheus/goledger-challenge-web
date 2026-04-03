import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	Modal,
	ModalBody,
	ModalClose,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalIcon,
	ModalTitle,
} from "@/components/ui/Modal";

// jsdom doesn't implement showModal/close natively
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

describe("Modal", () => {
	it("renders children when open", () => {
		render(
			<Modal open onClose={vi.fn()}>
				<p>Modal content</p>
			</Modal>,
		);
		expect(screen.getByText("Modal content")).toBeInTheDocument();
	});

	it("does not render children when closed", () => {
		render(
			<Modal open={false} onClose={vi.fn()}>
				<p>Hidden</p>
			</Modal>,
		);
		expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
	});

	it("calls showModal when opened", () => {
		render(
			<Modal open onClose={vi.fn()}>
				Content
			</Modal>,
		);
		expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
	});

	it("renders with data-slot", () => {
		render(
			<Modal open onClose={vi.fn()}>
				Content
			</Modal>,
		);
		expect(screen.getByRole("dialog")).toHaveAttribute("data-slot", "modal");
	});

	it("applies size variant sm", () => {
		render(
			<Modal open onClose={vi.fn()} size="sm">
				<p>Small</p>
			</Modal>,
		);
		const content = screen.getByText("Small").parentElement;
		expect(content?.className).toContain("max-w-sm");
	});

	it("applies size variant lg", () => {
		render(
			<Modal open onClose={vi.fn()} size="lg">
				<p>Large</p>
			</Modal>,
		);
		const content = screen.getByText("Large").parentElement;
		expect(content?.className).toContain("max-w-lg");
	});
});

describe("ModalClose", () => {
	it("calls onClose when clicked", async () => {
		const onClose = vi.fn();
		render(<ModalClose onClose={onClose} />);
		await userEvent.click(screen.getByRole("button", { name: /close/i }));
		expect(onClose).toHaveBeenCalledOnce();
	});
});

describe("ModalHeader", () => {
	it("renders with data-slot", () => {
		render(<ModalHeader>Header</ModalHeader>);
		expect(screen.getByText("Header")).toHaveAttribute(
			"data-slot",
			"modal-header",
		);
	});
});

describe("ModalTitle", () => {
	it("renders as h2 with data-slot", () => {
		render(<ModalTitle>Title</ModalTitle>);
		const title = screen.getByText("Title");
		expect(title.tagName).toBe("H2");
		expect(title).toHaveAttribute("data-slot", "modal-title");
	});
});

describe("ModalDescription", () => {
	it("renders with data-slot", () => {
		render(<ModalDescription>Description text</ModalDescription>);
		expect(screen.getByText("Description text")).toHaveAttribute(
			"data-slot",
			"modal-description",
		);
	});
});

describe("ModalIcon", () => {
	it("renders with data-slot", () => {
		render(<ModalIcon data-testid="icon">Icon</ModalIcon>);
		expect(screen.getByTestId("icon")).toHaveAttribute(
			"data-slot",
			"modal-icon",
		);
	});
});

describe("ModalBody", () => {
	it("renders with data-slot", () => {
		render(<ModalBody>Body</ModalBody>);
		expect(screen.getByText("Body")).toHaveAttribute("data-slot", "modal-body");
	});
});

describe("ModalFooter", () => {
	it("renders with data-slot", () => {
		render(<ModalFooter>Footer</ModalFooter>);
		expect(screen.getByText("Footer")).toHaveAttribute(
			"data-slot",
			"modal-footer",
		);
	});
});
