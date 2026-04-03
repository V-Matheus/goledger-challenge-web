import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { AddSeasonButton } from "./_components/SeasonActions";
import { SeasonSection } from "./_components/SeasonSection";

const tvShow = {
	key: "tvShows:03fa3227",
	title: "Game of Thrones",
	description:
		"In a medieval fantasy world, noble families fight for control of the Iron Throne while an ancient threat awakens in the North. Political intrigue, betrayals, and dragons mark this epic saga.",
	recommendedAge: 18,
};

const seasons = [
	{
		key: "seasons:1",
		number: 2,
		year: 2024,
		episodes: [
			{
				key: "episodes:1",
				episodeNumber: 1,
				title: "The Ghost in the Circuit",
				description: "A mysterious signal disrupts the network.",
				releaseDate: "2024-01-15T00:00:00Z",
				rating: 8.5,
			},
			{
				key: "episodes:2",
				episodeNumber: 2,
				title: "Static Equilibrium",
				description: "Tensions rise as alliances shift unexpectedly.",
				releaseDate: "2024-01-22T00:00:00Z",
				rating: 7.8,
			},
			{
				key: "episodes:3",
				episodeNumber: 3,
				title: "Protocol Breakdown",
				description: "The system faces its greatest challenge yet.",
				releaseDate: "2024-01-29T00:00:00Z",
				rating: 9.1,
			},
		],
	},
	{
		key: "seasons:2",
		number: 1,
		year: 2023,
		episodes: [],
	},
];

export default function TvShowDetailPage() {
	const totalEpisodes = seasons.reduce((acc, s) => acc + s.episodes.length, 0);

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
							<span>
								{totalEpisodes} {totalEpisodes === 1 ? "Episode" : "Episodes"}
							</span>
						</div>
					</div>
					<AddSeasonButton />
				</div>
			</div>

			{/* Seasons */}
			<div className="flex flex-col gap-4">
				{seasons.map((season) => (
					<SeasonSection
						key={season.key}
						seasonKey={season.key}
						number={season.number}
						year={season.year}
						episodes={season.episodes}
					/>
				))}
			</div>
		</div>
	);
}
