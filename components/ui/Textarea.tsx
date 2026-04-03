import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface TextareaProps extends ComponentProps<"textarea"> {
	label?: string;
}

export function Textarea({ className, label, id, ...props }: TextareaProps) {
	return (
		<div data-slot="textarea-group" className="flex flex-col gap-1.5">
			{label && (
				<label
					htmlFor={id}
					className="text-xs font-medium uppercase tracking-wider text-on-surface-variant"
				>
					{label}
				</label>
			)}
			<textarea
				id={id}
				data-slot="textarea"
				className={twMerge(
					"min-h-20 w-full resize-none rounded-lg bg-surface-container-low px-3 py-2.5 text-sm text-on-surface outline-none placeholder:text-on-surface-variant",
					"focus:ring-2 focus:ring-primary",
					className,
				)}
				{...props}
			/>
		</div>
	);
}
