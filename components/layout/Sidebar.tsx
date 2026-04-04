"use client";

import { Bookmark, LayoutDashboard, Tv } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const navItems = [
	{ label: "Dashboard", href: "/", icon: LayoutDashboard },
	{ label: "TV Shows", href: "/tv-shows", icon: Tv },
	{ label: "Watchlist", href: "/watchlist", icon: Bookmark },
];

export interface SidebarProps extends ComponentProps<"aside"> {}

export function Sidebar({ className, ...props }: SidebarProps) {
	const pathname = usePathname();

	return (
		<>
			{/* Desktop sidebar */}
			<aside
				data-slot="sidebar"
				className={twMerge(
					"flex h-full w-56 flex-col bg-surface-container-low p-4 max-md:hidden",
					className,
				)}
				{...props}
			>
				<div className="flex items-center gap-2.5 px-2 py-3">
					<div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-dim to-primary">
						<Tv className="size-4 text-on-primary-fixed" />
					</div>
					<div className="flex flex-col">
						<span className="text-sm font-bold text-on-surface">
							GoLedger TV
						</span>
						<span className="text-[10px] uppercase tracking-widest text-on-surface-variant">
							Cinematic Curator
						</span>
					</div>
				</div>

				<nav className="mt-6 flex flex-1 flex-col gap-1">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.href}
								href={item.href}
								data-active={isActive ? "" : undefined}
								className={twMerge(
									"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
									"text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
									isActive && "text-primary-text bg-primary/10",
								)}
							>
								<item.icon className="size-4" />
								{item.label}
							</Link>
						);
					})}
				</nav>
			</aside>

			{/* Mobile bottom nav */}
			<nav
				data-slot="bottom-nav"
				className={twMerge(
					"fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-outline-variant bg-surface-container-low px-2 pb-[env(safe-area-inset-bottom)] md:hidden",
					className,
				)}
			>
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.href}
							href={item.href}
							data-active={isActive ? "" : undefined}
							className={twMerge(
								"flex flex-col items-center gap-1 px-3 py-2.5 text-[11px] font-medium transition-colors",
								"text-on-surface-variant",
								isActive && "text-primary-text",
							)}
						>
							<item.icon className="size-5" />
							{item.label}
						</Link>
					);
				})}
			</nav>
		</>
	);
}
