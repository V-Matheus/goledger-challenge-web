"use client";

import { X } from "lucide-react";
import { type ComponentProps, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

export const modalVariants = tv({
	base: [
		"relative flex flex-col gap-6 rounded-xl p-6 shadow-elevated",
		"bg-surface-container-high",
		"[&>form]:flex [&>form]:flex-col [&>form]:gap-6",
	],
	variants: {
		size: {
			sm: "w-full max-w-sm",
			md: "w-full max-w-md",
			lg: "w-full max-w-lg",
		},
	},
	defaultVariants: { size: "sm" },
});

export interface ModalProps
	extends Omit<ComponentProps<"dialog">, "open">,
		VariantProps<typeof modalVariants> {
	open: boolean;
	onClose: () => void;
}

export function Modal({
	className,
	open,
	onClose,
	size,
	children,
	...props
}: ModalProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;

		if (open && !dialog.open) {
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	}, [open]);

	function handleBackdropInteraction(
		e:
			| React.MouseEvent<HTMLDialogElement>
			| React.KeyboardEvent<HTMLDialogElement>,
	) {
		if (e.target === ref.current) {
			onClose();
		}
	}

	return (
		<dialog
			ref={ref}
			data-slot="modal"
			onClose={onClose}
			onClick={handleBackdropInteraction}
			onKeyDown={handleBackdropInteraction}
			{...props}
		>
			{open && (
				<div className={twMerge(modalVariants({ size }), className)}>
					{children}
				</div>
			)}
		</dialog>
	);
}

export function ModalClose({
	className,
	onClose,
	...props
}: ComponentProps<"button"> & { onClose: () => void }) {
	return (
		<button
			type="button"
			aria-label="Close modal"
			onClick={onClose}
			className={twMerge(
				"absolute right-4 top-4 flex size-7 items-center justify-center rounded-lg text-on-surface-variant transition-colors",
				"hover:bg-surface-container hover:text-on-surface",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
				className,
			)}
			{...props}
		>
			<X className="size-4" />
		</button>
	);
}

export function ModalHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="modal-header"
			className={twMerge(
				"flex flex-col items-center gap-3 text-center",
				className,
			)}
			{...props}
		/>
	);
}

export function ModalIcon({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="modal-icon"
			className={twMerge(
				"flex size-12 items-center justify-center rounded-xl [&_svg]:size-5",
				className,
			)}
			{...props}
		/>
	);
}

export function ModalTitle({ className, ...props }: ComponentProps<"h2">) {
	return (
		<h2
			data-slot="modal-title"
			className={twMerge("text-lg font-semibold text-on-surface", className)}
			{...props}
		/>
	);
}

export function ModalDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p
			data-slot="modal-description"
			className={twMerge(
				"text-sm leading-relaxed text-on-surface-variant",
				className,
			)}
			{...props}
		/>
	);
}

export function ModalBody({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="modal-body"
			className={twMerge("flex flex-col gap-4", className)}
			{...props}
		/>
	);
}

export function ModalFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="modal-footer"
			className={twMerge("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}
