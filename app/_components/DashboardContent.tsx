"use client";

import {
	ArrowUpRight,
	Bookmark,
	ChevronRight,
	Clapperboard,
	Loader2,
	Plus,
	Tv,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { useEpisodes } from "@/lib/queries/episodes";
import { useSeasons } from "@/lib/queries/seasons";
import { useTvShows } from "@/lib/queries/tv-shows";
import { useWatchlists } from "@/lib/queries/watchlist";
import { ShowCard } from "../tv-shows/_components/ShowCard";
import { WatchlistItem } from "../watchlist/_components/WatchlistItem";

export function DashboardContent() {
	const { data: showsData, isLoading: showsLoading } = useTvShows();
	const { data: seasonsData } = useSeasons();
	const { data: episodesData } = useEpisodes();
	const { data: watchlistsData } = useWatchlists();

	const shows = showsData?.result ?? [];
	const seasons = seasonsData?.result ?? [];
	const episodes = episodesData?.result ?? [];
	const watchlists = watchlistsData?.result ?? [];

	const recentShows = [...shows]
		.sort(
			(a, b) =>
				new Date(b["@lastUpdated"]).getTime() -
				new Date(a["@lastUpdated"]).getTime(),
		)
		.slice(0, 4);

	return (
		<div className="flex gap-8 max-md:flex-col max-md:gap-6">
			<div className="flex flex-1 flex-col gap-8 max-md:gap-5">
				{/* Header */}
				<div className="flex items-start justify-between max-md:flex-col max-md:gap-3">
					<div className="flex flex-col gap-1">
						<h1 className="font-display text-3xl font-bold text-on-surface max-md:text-xl">
							Network Dashboard
						</h1>
						<p className="flex items-center gap-2 text-sm text-on-surface-variant max-md:text-xs">
							<span className="inline-block size-1.5 rounded-full bg-success" />
							Blockchain API Connection: Stable
						</p>
					</div>
					<div className="flex items-center gap-3">
						<Link href="/tv-shows">
							<Button variant="primary" size="md">
								<Plus className="size-3.5" />
								New Series
							</Button>
						</Link>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-3">
					<StatCard
						label="Total TV Shows"
						value={String(shows.length)}
						icon={Tv}
					/>
					<StatCard
						label="Seasons"
						value={String(seasons.length)}
						icon={Clapperboard}
					/>
					<StatCard
						label="Episodes"
						value={String(episodes.length)}
						icon={Clapperboard}
					/>
					<StatCard
						label="Watchlists"
						value={String(watchlists.length)}
						icon={Bookmark}
					/>
				</div>

				{/* Recently Added */}
				<div className="flex flex-col gap-4 max-md:gap-3">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold text-on-surface max-md:text-base">
							Recently Added
						</h2>
						<Link
							href="/tv-shows"
							className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary-text transition-colors hover:opacity-80"
						>
							View All
							<ArrowUpRight className="size-3" />
						</Link>
					</div>

					{showsLoading && (
						<div className="flex items-center justify-center py-10">
							<Loader2 className="size-5 animate-spin text-primary" />
						</div>
					)}

					{!showsLoading && recentShows.length === 0 && (
						<p className="py-10 text-center text-sm text-on-surface-variant">
							No TV shows yet.
						</p>
					)}

					{!showsLoading && recentShows.length > 0 && (
						<div className="flex gap-4 overflow-x-auto pb-2 max-md:gap-3">
							{recentShows.map((show) => (
								<ShowCard
									key={show["@key"]}
									title={show.title}
									description={show.description}
									recommendedAge={show.recommendedAge}
									lastUpdated={show["@lastUpdated"]}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Right Panel */}
			<div className="flex w-72 shrink-0 flex-col gap-6 max-md:w-full">
				{/* Active Watchlists */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center justify-between">
						<h2 className="text-base font-semibold text-on-surface">
							Active Watchlists
						</h2>
						<Link
							href="/watchlist"
							className="flex size-7 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
						>
							<Plus className="size-4" />
						</Link>
					</div>
					<div className="flex flex-col gap-1">
						{watchlists.slice(0, 4).map((item) => (
							<WatchlistItem
								key={item["@key"]}
								title={item.title}
								tvShowCount={item.tvShows?.length}
								lastUpdated={item["@lastUpdated"]}
								href={`/watchlist/${encodeURIComponent(item["@key"])}`}
							/>
						))}
						{watchlists.length === 0 && (
							<p className="py-4 text-center text-xs text-on-surface-variant">
								No watchlists yet.
							</p>
						)}
					</div>
					<Link
						href="/watchlist"
						className="flex items-center justify-center gap-1 py-2 text-xs font-medium text-on-surface-variant transition-colors hover:text-primary-text"
					>
						Explore All Collections
						<ChevronRight className="size-3" />
					</Link>
				</div>
			</div>
		</div>
	);
}
