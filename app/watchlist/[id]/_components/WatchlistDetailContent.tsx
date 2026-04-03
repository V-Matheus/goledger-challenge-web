"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Tv, X } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { useTvShows } from "@/lib/queries/tv-shows";
import { useWatchlist, watchlistKeys } from "@/lib/queries/watchlist";
import { initialActionState } from "@/lib/schemas/action-state";
import type { TvShow } from "@/lib/types";
import { updateWatchlistShowsAction } from "../../actions";
import { AddShowButton } from "./AddShowButton";

export function WatchlistDetailContent({
	watchlistKey,
}: {
	watchlistKey: string;
}) {
	const queryClient = useQueryClient();
	const { data: watchlist, isLoading: watchlistLoading } =
		useWatchlist(watchlistKey);
	const { data: allShowsData } = useTvShows();
	const allShows = allShowsData?.result ?? [];

	if (watchlistLoading) {
		return (
			<div className="flex items-center justify-center py-20">
				<Loader2 className="size-6 animate-spin text-primary" />
			</div>
		);
	}

	if (!watchlist) {
		return (
			<p className="py-20 text-center text-sm text-error">
				Watchlist not found.
			</p>
		);
	}

	const watchlistShowKeys = watchlist.tvShows?.map((ref) => ref["@key"]) ?? [];
	const linkedShows = allShows.filter((show) =>
		watchlistShowKeys.includes(show["@key"]),
	);

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-3">
					<Link
						href="/watchlist"
						className="flex items-center gap-1 text-xs font-medium text-on-surface-variant transition-colors hover:text-primary-text"
					>
						<ArrowLeft className="size-3" />
						Back to Watchlists
					</Link>
					<div className="flex flex-col gap-1">
						<h1 className="font-display text-3xl font-bold text-on-surface">
							{watchlist.title}
						</h1>
						{watchlist.description && (
							<p className="max-w-xl text-sm text-on-surface-variant">
								{watchlist.description}
							</p>
						)}
					</div>
				</div>
				<AddShowButton
					watchlistKey={watchlistKey}
					watchlist={watchlist}
					allShows={allShows}
				/>
			</div>

			{/* TV Shows Grid */}
			<div className="flex flex-col gap-4">
				<h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
					{linkedShows.length} {linkedShows.length === 1 ? "Show" : "Shows"}
				</h2>

				{linkedShows.length === 0 && (
					<p className="py-10 text-center text-sm text-on-surface-variant">
						No shows in this watchlist yet. Add some!
					</p>
				)}

				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{linkedShows.map((show: TvShow) => (
						<ShowCard
							key={show["@key"]}
							show={show}
							watchlistTitle={watchlist.title}
							watchlistDescription={watchlist.description}
							allShowKeys={watchlistShowKeys}
							onRemoved={() =>
								queryClient.invalidateQueries({
									queryKey: watchlistKeys.detail(watchlistKey),
								})
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function ShowCard({
	show,
	watchlistTitle,
	watchlistDescription,
	allShowKeys,
	onRemoved,
}: {
	show: TvShow;
	watchlistTitle: string;
	watchlistDescription?: string;
	allShowKeys: string[];
	onRemoved: () => void;
}) {
	const keysWithoutThis = allShowKeys.filter((k) => k !== show["@key"]);
	const boundAction = updateWatchlistShowsAction.bind(
		null,
		watchlistTitle,
		watchlistDescription,
		keysWithoutThis,
	);
	const [state, formAction, isPending] = useActionState(
		boundAction,
		initialActionState,
	);

	useEffect(() => {
		if (state.success) {
			onRemoved();
		}
	}, [state, onRemoved]);

	return (
		<div className="group relative flex items-center gap-4 rounded-xl bg-surface-container-low p-4 transition-colors hover:bg-surface-container">
			<Link
				href={`/tv-shows/${encodeURIComponent(show["@key"])}`}
				className="flex flex-1 items-center gap-4"
			>
				<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-dim/30 to-primary/10">
					<Tv className="size-5 text-on-surface-variant/40" />
				</div>
				<div className="flex min-w-0 flex-1 flex-col gap-0.5">
					<span className="truncate text-sm font-semibold text-on-surface">
						{show.title}
					</span>
					<span className="line-clamp-1 text-xs text-on-surface-variant">
						{show.description}
					</span>
				</div>
				<Badge>{show.recommendedAge}+</Badge>
			</Link>
			<form action={formAction}>
				<button
					type="submit"
					disabled={isPending}
					aria-label={`Remove ${show.title}`}
					className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error/10 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
				>
					<X className="size-3.5" />
				</button>
			</form>
		</div>
	);
}
