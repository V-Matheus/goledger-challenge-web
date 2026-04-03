import { WatchlistActions } from "./_components/WatchlistActions";
import { WatchlistList } from "./_components/WatchlistList";

const watchlists = [
	{
		key: "watchlist:1",
		title: "Game of Thrones",
		description:
			"In a medieval fantasy world, noble families fight for control of the Iron Throne.",
		tvShowCount: 2,
		lastUpdated: "2026-04-03T15:27:11Z",
	},
	{
		key: "watchlist:2",
		title: "The Vampire Diaries",
		description:
			"The lives, loves, dangers and disasters in the town of Mystic Falls, Virginia.",
		tvShowCount: 1,
		lastUpdated: "2026-04-03T12:48:58Z",
	},
	{
		key: "watchlist:3",
		title: "Sci-Fi Curations",
		description: "A curated collection of the best sci-fi series available.",
		tvShowCount: 4,
		lastUpdated: "2026-04-02T18:00:00Z",
	},
	{
		key: "watchlist:4",
		title: "Weekend Binge",
		description: "Quick series to watch over the weekend.",
		tvShowCount: 3,
		lastUpdated: "2026-04-01T09:00:00Z",
	},
];

export default function WatchlistPage() {
	const count = watchlists.length;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-1">
					<h1 className="font-display text-3xl font-bold text-on-surface">
						My Watchlist
					</h1>
					<p className="text-sm text-on-surface-variant">
						You have{" "}
						<span className="font-medium text-primary-text">{count} items</span>{" "}
						saved for later.
					</p>
				</div>
				<WatchlistActions />
			</div>

			{/* List */}
			<WatchlistList items={watchlists} />

			{/* Footer */}
			<div className="flex items-center justify-between">
				<span className="text-xs text-on-surface-variant">
					Showing 1-{count} of {count} results
				</span>
			</div>
		</div>
	);
}
