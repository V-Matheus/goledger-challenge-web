import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
	base: [
		"inline-flex cursor-pointer items-center justify-center font-medium rounded-lg transition-colors",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
		"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
	],
	variants: {
		variant: {
			primary:
				"bg-gradient-to-br from-primary-dim to-primary text-on-primary-fixed hover:opacity-90",
			secondary:
				"bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
			ghost:
				"bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
			destructive: "bg-error text-on-error hover:bg-error/90",
		},
		size: {
			sm: "h-7 px-3 gap-1.5 text-xs [&_svg]:size-3",
			md: "h-9 px-4 gap-2 text-sm [&_svg]:size-3.5",
			lg: "h-11 px-5 gap-2.5 text-base [&_svg]:size-4",
		},
	},
	defaultVariants: { variant: "primary", size: "md" },
});

export interface ButtonProps
	extends ComponentProps<"button">,
		VariantProps<typeof buttonVariants> {}

export function Button({
	className,
	variant,
	size,
	disabled,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			type="button"
			data-slot="button"
			data-disabled={disabled ? "" : undefined}
			className={twMerge(buttonVariants({ variant, size }), className)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}
