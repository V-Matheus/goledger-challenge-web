import { TvShowActions } from "./_components/TvShowActions";
import { TvShowGrid } from "./_components/TvShowGrid";

const tvShows = [
	{
		key: "tvShows:03fa3227",
		title: "Game of Thrones",
		description:
			"In a medieval fantasy world, noble families fight for control of the Iron Throne while an ancient threat awakens in the North.",
		recommendedAge: 18,
		lastUpdated: "2026-04-03T15:27:11Z",
	},
	{
		key: "tvShows:197774df",
		title: "Invencível",
		description: "Super heroi",
		recommendedAge: 16,
		lastUpdated: "2026-04-03T13:09:23Z",
	},
	{
		key: "tvShows:8c0a1342",
		title: "Breaking Bad",
		description:
			"A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.",
		recommendedAge: 16,
		lastUpdated: "2026-04-02T20:00:00Z",
	},
	{
		key: "tvShows:482c54b6",
		title: "GoLedger Labs",
		description:
			"Documentary series showcasing the groundbreaking innovations in blockchain technology.",
		recommendedAge: 0,
		lastUpdated: "2026-04-01T10:00:00Z",
	},
];

export default function TvShowsPage() {
	const count = tvShows.length;

	return (
		<div className="flex flex-col gap-6">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-1">
					<h1 className="font-display text-3xl font-bold text-on-surface">
						TV Shows
					</h1>
					<p className="text-sm text-on-surface-variant">
						Browse and manage your collection of{" "}
						<span className="font-medium text-primary-text">{count} shows</span>
						.
					</p>
				</div>
				<TvShowActions />
			</div>

			{/* Grid */}
			<TvShowGrid items={tvShows} />

			{/* Footer */}
			<div className="flex items-center justify-between">
				<span className="text-xs text-on-surface-variant">
					Showing 1-{count} of {count} results
				</span>
			</div>
		</div>
	);
}
