"use client";

import { Moon, Sun, Tv } from "lucide-react";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { SearchInput } from "@/components/ui/SearchInput";
import { useTheme } from "@/hooks/use-theme";

export interface HeaderProps extends ComponentProps<"header"> {}

export function Header({ className, ...props }: HeaderProps) {
	const { theme, toggleTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<header
			data-slot="header"
			className={twMerge(
				"flex items-center justify-between gap-4 px-8 py-4 max-md:px-4 max-md:py-3",
				className,
			)}
			{...props}
		>
			{/* Mobile: logo */}
			<div className="flex items-center gap-2 md:hidden">
				<div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary-dim to-primary">
					<Tv className="size-3.5 text-on-primary-fixed" />
				</div>
				<span className="text-sm font-bold text-on-surface">GoLedger TV</span>
			</div>

			{/* Desktop: search */}
			<SearchInput
				placeholder="Search for shows, episodes, or curators..."
				className="w-full max-w-md max-md:hidden"
			/>

			<button
				type="button"
				aria-label="Toggle theme"
				onClick={toggleTheme}
				className="flex size-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
			>
				{mounted &&
					(theme === "dark" ? (
						<Sun className="size-4" />
					) : (
						<Moon className="size-4" />
					))}
			</button>
		</header>
	);
}
