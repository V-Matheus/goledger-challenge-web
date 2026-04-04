"use client";

import { Loader2 } from "lucide-react";
import { useTvShows } from "@/lib/queries/tv-shows";
import { TvShowActions } from "./TvShowActions";
import { TvShowGrid } from "./TvShowGrid";

export function TvShowsContent() {
	const { data, isLoading, isError } = useTvShows();
	const shows = data?.result ?? [];
	const count = shows.length;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-start justify-between max-md:flex-col max-md:gap-3">
				<div className="flex flex-col gap-1">
					<h1 className="font-display text-3xl font-bold text-on-surface max-md:text-xl">
						TV Shows
					</h1>
					<p className="text-sm text-on-surface-variant max-md:text-xs">
						Browse and manage your collection of{" "}
						<span className="font-medium text-primary-text">{count} shows</span>
						.
					</p>
				</div>
				<TvShowActions />
			</div>

			{/* Content */}
			{isLoading && (
				<div className="flex items-center justify-center py-20">
					<Loader2 className="size-6 animate-spin text-primary" />
				</div>
			)}

			{isError && (
				<p className="py-20 text-center text-sm text-error">
					Failed to load TV shows. Please try again later.
				</p>
			)}

			{!isLoading && !isError && shows.length === 0 && (
				<p className="py-20 text-center text-sm text-on-surface-variant">
					No TV shows yet. Add the first one!
				</p>
			)}

			{!isLoading && !isError && shows.length > 0 && (
				<>
					<TvShowGrid items={shows} />
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
