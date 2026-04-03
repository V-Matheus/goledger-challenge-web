import { ChevronRight } from "lucide-react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface WatchlistItemProps extends ComponentProps<"div"> {
	title: string;
	tvShowCount?: number;
	lastUpdated?: string;
}

const AVATAR_COLORS = [
	"bg-primary",
	"bg-success",
	"bg-warning",
	"bg-error",
	"bg-primary-container",
] as const;

function getInitials(title: string) {
	return title
		.split(" ")
		.slice(0, 2)
		.map((w) => w[0])
		.join("")
		.toUpperCase();
}

function getColor(title: string) {
	let hash = 0;
	for (const char of title) {
		hash = char.charCodeAt(0) + ((hash << 5) - hash);
	}
	return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatTimeAgo(dateStr: string) {
	const diff = Date.now() - new Date(dateStr).getTime();
	const hours = Math.floor(diff / (1000 * 60 * 60));
	if (hours < 1) return "Updated just now";
	if (hours < 24) return `Updated ${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `Updated ${days}d ago`;
}

export function WatchlistItem({
	className,
	title,
	tvShowCount,
	lastUpdated,
	...props
}: WatchlistItemProps) {
	const meta = [
		tvShowCount != null ? `${tvShowCount} Items` : null,
		lastUpdated ? formatTimeAgo(lastUpdated) : null,
	]
		.filter(Boolean)
		.join(" • ");

	return (
		<div
			data-slot="watchlist-item"
			className={twMerge(
				"flex cursor-pointer items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-surface-container",
				className,
			)}
			{...props}
		>
			<div
				className={twMerge(
					"flex size-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-on-primary-fixed",
					getColor(title),
				)}
			>
				{getInitials(title)}
			</div>

			<div className="flex min-w-0 flex-1 flex-col">
				<span className="truncate text-sm font-medium text-on-surface">
					{title}
				</span>
				{meta && (
					<span className="truncate text-xs text-on-surface-variant">
						{meta}
					</span>
				)}
			</div>

			<ChevronRight className="size-4 shrink-0 text-on-surface-variant" />
		</div>
	);
}
