import { MoreHorizontal } from "lucide-react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/Badge";

export interface ShowCardProps extends ComponentProps<"div"> {
	title: string;
	description: string;
	recommendedAge: number;
	lastUpdated?: string;
}

function getInitials(title: string) {
	return title
		.split(" ")
		.slice(0, 2)
		.map((w) => w[0])
		.join("")
		.toUpperCase();
}

function formatTimeAgo(dateStr: string) {
	const diff = Date.now() - new Date(dateStr).getTime();
	const hours = Math.floor(diff / (1000 * 60 * 60));
	if (hours < 1) return "Added just now";
	if (hours < 24) return `Added ${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `Added ${days}d ago`;
}

export function ShowCard({
	className,
	title,
	description,
	recommendedAge,
	lastUpdated,
	...props
}: ShowCardProps) {
	return (
		<div
			data-slot="show-card"
			className={twMerge(
				"group flex w-64 shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl bg-surface-container-high transition-colors hover:bg-surface-container-highest",
				className,
			)}
			{...props}
		>
			<div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary-dim/30 to-primary/10">
				<span className="text-5xl font-bold text-on-surface/10 select-none">
					{getInitials(title)}
				</span>
				<div className="absolute right-3 top-3">
					<Badge>{recommendedAge}+</Badge>
				</div>
			</div>

			<div className="flex flex-col gap-2 p-4">
				<h3 className="truncate text-sm font-semibold text-on-surface">
					{title}
				</h3>
				<p className="line-clamp-2 text-xs leading-relaxed text-on-surface-variant">
					{description}
				</p>

				<div className="flex items-center justify-between pt-1">
					{lastUpdated && (
						<span
							suppressHydrationWarning
							className="text-[10px] font-medium uppercase tracking-wider text-on-surface-variant"
						>
							{formatTimeAgo(lastUpdated)}
						</span>
					)}
					<button
						type="button"
						aria-label="More options"
						className="ml-auto flex size-6 items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
					>
						<MoreHorizontal className="size-3.5" />
					</button>
				</div>
			</div>
		</div>
	);
}
