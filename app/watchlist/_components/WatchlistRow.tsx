import { ChevronRight, Pencil, X } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface WatchlistRowProps extends ComponentProps<"div"> {
	title: string;
	description?: string;
	tvShowCount?: number;
	lastUpdated?: string;
	href?: string;
	onEdit?: () => void;
	onDelete?: () => void;
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
	if (hours < 1) return "Just now";
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `${days}d ago`;
}

export function WatchlistRow({
	className,
	title,
	description,
	tvShowCount,
	lastUpdated,
	href,
	onEdit,
	onDelete,
	...props
}: WatchlistRowProps) {
	const content = (
		<>
			<div
				className={twMerge(
					"flex size-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-on-primary-fixed",
					getColor(title),
				)}
			>
				{getInitials(title)}
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<span className="truncate text-sm font-semibold text-on-surface">
					{title}
				</span>
				{description && (
					<span className="line-clamp-1 text-xs text-on-surface-variant">
						{description}
					</span>
				)}
			</div>

			<div className="flex shrink-0 flex-col items-end gap-0.5">
				<span className="text-xs font-medium text-on-surface">
					{tvShowCount ?? 0} {tvShowCount === 1 ? "show" : "shows"}
				</span>
				{lastUpdated && (
					<span
						suppressHydrationWarning
						className="text-[10px] text-on-surface-variant"
					>
						{formatTimeAgo(lastUpdated)}
					</span>
				)}
			</div>

			{onEdit && (
				<button
					type="button"
					aria-label={`Edit ${title}`}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onEdit();
					}}
					className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				>
					<Pencil className="size-3.5" />
				</button>
			)}

			{onDelete && (
				<button
					type="button"
					aria-label={`Delete ${title}`}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onDelete();
					}}
					className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error/10 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				>
					<X className="size-3.5" />
				</button>
			)}

			{href && (
				<ChevronRight className="size-4 shrink-0 text-on-surface-variant" />
			)}
		</>
	);

	const sharedClassName = twMerge(
		"group flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-surface-container-high",
		className,
	);

	if (href) {
		return (
			<Link href={href} data-slot="watchlist-row" className={sharedClassName}>
				{content}
			</Link>
		);
	}

	return (
		<div data-slot="watchlist-row" className={sharedClassName} {...props}>
			{content}
		</div>
	);
}
