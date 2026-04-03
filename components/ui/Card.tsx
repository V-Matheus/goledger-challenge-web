import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface CardProps extends ComponentProps<"div"> {}

export function Card({ className, ...props }: CardProps) {
	return (
		<div
			data-slot="card"
			className={twMerge(
				"bg-surface-container-high flex flex-col gap-4 rounded-xl p-5 shadow-ambient",
				className,
			)}
			{...props}
		/>
	);
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={twMerge("flex flex-col gap-1", className)}
			{...props}
		/>
	);
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
	return (
		<h3
			data-slot="card-title"
			className={twMerge("text-lg font-semibold text-on-surface", className)}
			{...props}
		/>
	);
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
	return <div data-slot="card-content" className={className} {...props} />;
}
