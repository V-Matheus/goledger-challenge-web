"use client";

import { Loader2 } from "lucide-react";
import { useWatchlists } from "@/lib/queries/watchlist";
import { WatchlistActions } from "./WatchlistActions";
import { WatchlistList } from "./WatchlistList";

export function WatchlistContent() {
	const { data, isLoading, isError } = useWatchlists();
	const watchlists = data?.result ?? [];
	const count = watchlists.length;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-start justify-between max-md:flex-col max-md:gap-3">
				<div className="flex flex-col gap-1">
					<h1 className="font-display text-3xl font-bold text-on-surface max-md:text-xl">
						My Watchlist
					</h1>
					<p className="text-sm text-on-surface-variant max-md:text-xs">
						You have{" "}
						<span className="font-medium text-primary-text">{count} items</span>{" "}
						saved for later.
					</p>
				</div>
				<WatchlistActions />
			</div>

			{/* Content */}
			{isLoading && (
				<div className="flex items-center justify-center py-20">
					<Loader2 className="size-6 animate-spin text-primary" />
				</div>
			)}

			{isError && (
				<p className="py-20 text-center text-sm text-error">
					Failed to load watchlists. Please try again later.
				</p>
			)}

			{!isLoading && !isError && watchlists.length === 0 && (
				<p className="py-20 text-center text-sm text-on-surface-variant">
					No watchlists yet. Create the first one!
				</p>
			)}

			{!isLoading && !isError && watchlists.length > 0 && (
				<>
					<WatchlistList items={watchlists} />
					<div className="flex items-center justify-between">
						<span className="text-xs text-on-surface-variant">
							Showing 1-{count} of {count} results
						</span>
					</div>
				</>
			)}
		</div>
	);
}
