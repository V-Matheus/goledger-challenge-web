"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useSeasons } from "@/lib/queries/seasons";
import { useTvShow } from "@/lib/queries/tv-shows";
import { AddSeasonButton } from "./SeasonActions";
import { SeasonSection } from "./SeasonSection";

export function TvShowDetailContent({ showKey }: { showKey: string }) {
	const { data: tvShow, isLoading: showLoading } = useTvShow(showKey);
	const tvShowRef = { "@assetType": "tvShows" as const, "@key": showKey };
	const { data: seasonsData, isLoading: seasonsLoading } =
		useSeasons(tvShowRef);

	const seasons = seasonsData?.result ?? [];
	const isLoading = showLoading || seasonsLoading;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-20">
				<Loader2 className="size-6 animate-spin text-primary" />
			</div>
		);
	}

	if (!tvShow) {
		return (
			<p className="py-20 text-center text-sm text-error">TV show not found.</p>
		);
	}

	return (
		<div className="flex flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-4">
				<Link
					href="/tv-shows"
					className="flex items-center gap-1 text-xs font-medium text-on-surface-variant transition-colors hover:text-primary-text"
				>
					<ArrowLeft className="size-3" />
					Back to TV Shows
				</Link>

				<div className="flex items-start justify-between">
					<div className="flex max-w-2xl flex-col gap-3">
						<div className="flex items-center gap-3">
							<h1 className="font-display text-3xl font-bold text-on-surface">
								{tvShow.title}
							</h1>
							<Badge>{tvShow.recommendedAge}+</Badge>
						</div>
						<p className="text-sm leading-relaxed text-on-surface-variant">
							{tvShow.description}
						</p>
						<div className="flex items-center gap-4 text-xs text-on-surface-variant">
							<span>
								{seasons.length} {seasons.length === 1 ? "Season" : "Seasons"}
							</span>
						</div>
					</div>
					<AddSeasonButton showKey={showKey} />
				</div>
			</div>

			{/* Seasons */}
			<div className="flex flex-col gap-4">
				{seasons.length === 0 && (
					<p className="py-10 text-center text-sm text-on-surface-variant">
						No seasons yet. Add the first one!
					</p>
				)}
				{seasons.map((season) => (
					<SeasonSection
						key={season["@key"]}
						season={season}
						showKey={showKey}
					/>
				))}
			</div>
		</div>
	);
}
