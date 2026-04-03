import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends ComponentProps<"input"> {
	label?: string;
}

export function Input({ className, label, id, ...props }: InputProps) {
	return (
		<div data-slot="input-group" className="flex flex-col gap-1.5">
			{label && (
				<label
					htmlFor={id}
					className="text-xs font-medium uppercase tracking-wider text-on-surface-variant"
				>
					{label}
				</label>
			)}
			<input
				id={id}
				data-slot="input"
				className={twMerge(
					"h-10 w-full rounded-lg bg-surface-container-low px-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant",
					"focus:ring-2 focus:ring-primary",
					className,
				)}
				{...props}
			/>
		</div>
	);
}
