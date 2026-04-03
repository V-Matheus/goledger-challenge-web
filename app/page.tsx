import {
	ArrowUpRight,
	Bookmark,
	ChevronRight,
	Clapperboard,
	Plus,
	Tv,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatCard } from "@/components/ui/StatCard";
import { ShowCard } from "./tv-shows/_components/ShowCard";
import { WatchlistItem } from "./watchlist/_components/WatchlistItem";

const recentlyAdded = [
	{
		title: "Game of Thrones",
		description:
			"In a medieval fantasy world, noble families fight for control of the Iron Throne while an ancient threat awakens in the North.",
		recommendedAge: 18,
		lastUpdated: "2026-04-03T15:27:11Z",
	},
	{
		title: "Invencível",
		description: "Super heroi",
		recommendedAge: 16,
		lastUpdated: "2026-04-03T13:09:23Z",
	},
	{
		title: "Breaking Bad",
		description:
			"A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.",
		recommendedAge: 16,
		lastUpdated: "2026-04-02T20:00:00Z",
	},
	{
		title: "GoLedger Labs",
		description:
			"Documentary series showcasing the groundbreaking innovations in blockchain technology.",
		recommendedAge: 0,
		lastUpdated: "2026-04-01T10:00:00Z",
	},
];

const watchlistItems = [
	{
		title: "Sci-Fi Curations",
		tvShowCount: 3,
		lastUpdated: "2026-04-03T15:00:00Z",
	},
	{ title: "Docu-Series", tvShowCount: 2, lastUpdated: "2026-04-03T12:00:00Z" },
	{
		title: "Top Rated 2024",
		tvShowCount: 5,
		lastUpdated: "2026-04-02T18:00:00Z",
	},
	{
		title: "Weekend Binge",
		tvShowCount: 1,
		lastUpdated: "2026-04-01T09:00:00Z",
	},
];

export default function DashboardPage() {
	return (
		<div className="flex gap-8">
			<div className="flex flex-1 flex-col gap-8">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div className="flex flex-col gap-1">
						<h1 className="font-display text-3xl font-bold text-on-surface">
							Network Dashboard
						</h1>
						<p className="flex items-center gap-2 text-sm text-on-surface-variant">
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
				<div className="flex gap-4">
					<StatCard label="Total TV Shows" value="0" icon={Tv} />
					<StatCard label="Seasons" value="0" icon={Clapperboard} />
					<StatCard label="Episodes" value="0" icon={Clapperboard} />
					<StatCard label="Watchlists" value="0" icon={Bookmark} />
				</div>

				{/* Recently Added */}
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold text-on-surface">
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
					<div className="flex gap-4 overflow-x-auto pb-2">
						{recentlyAdded.map((show) => (
							<ShowCard
								key={show.title}
								title={show.title}
								description={show.description}
								recommendedAge={show.recommendedAge}
								lastUpdated={show.lastUpdated}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Right Panel */}
			<div className="flex w-72 shrink-0 flex-col gap-6">
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
						{watchlistItems.map((item) => (
							<WatchlistItem
								key={item.title}
								title={item.title}
								tvShowCount={item.tvShowCount}
								lastUpdated={item.lastUpdated}
							/>
						))}
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
