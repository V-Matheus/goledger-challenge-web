"use client";

import { Moon, Sun } from "lucide-react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { SearchInput } from "@/components/ui/SearchInput";
import { useTheme } from "@/hooks/use-theme";

export interface HeaderProps extends ComponentProps<"header"> {}

export function Header({ className, ...props }: HeaderProps) {
	const { theme, toggleTheme } = useTheme();

	return (
		<header
			data-slot="header"
			className={twMerge(
				"flex items-center justify-between gap-4 px-8 py-4",
				className,
			)}
			{...props}
		>
			<SearchInput
				placeholder="Search for shows, episodes, or curators..."
				className="w-full max-w-md"
			/>

			<button
				type="button"
				aria-label="Toggle theme"
				onClick={toggleTheme}
				className="flex size-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
			>
				{theme === "dark" ? (
					<Sun className="size-4" />
				) : (
					<Moon className="size-4" />
				)}
			</button>
		</header>
	);
}
