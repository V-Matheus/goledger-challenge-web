"use client";

import { Search } from "lucide-react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface SearchInputProps extends ComponentProps<"input"> {}

export function SearchInput({ className, ...props }: SearchInputProps) {
	return (
		<div
			data-slot="search-input"
			className={twMerge(
				"flex items-center gap-2 rounded-lg bg-surface-container px-3 py-2 text-sm text-on-surface-variant",
				"focus-within:ring-2 focus-within:ring-primary",
				className,
			)}
		>
			<Search className="size-4 shrink-0 text-on-surface-variant" />
			<input
				type="search"
				className="w-full bg-transparent outline-none placeholder:text-on-surface-variant"
				{...props}
			/>
		</div>
	);
}
