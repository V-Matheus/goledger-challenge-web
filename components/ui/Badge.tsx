import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

export const badgeVariants = tv({
	base: "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
	variants: {
		variant: {
			default: "bg-primary/20 text-primary-text",
			success: "bg-success/20 text-success",
			warning: "bg-warning/20 text-warning",
			error: "bg-error/20 text-error",
		},
	},
	defaultVariants: { variant: "default" },
});

export interface BadgeProps
	extends ComponentProps<"span">,
		VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span
			data-slot="badge"
			className={twMerge(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}
