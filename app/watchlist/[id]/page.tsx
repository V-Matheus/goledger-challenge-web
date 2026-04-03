import { ArrowLeft, Tv } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { AddShowButton } from "./_components/AddShowButton";

const watchlist = {
	key: "watchlist:1",
	title: "Game of Thrones",
	description:
		"In a medieval fantasy world, noble families fight for control of the Iron Throne.",
	tvShows: [
		{
			"@key": "tvShows:1",
			title: "Game of Thrones",
			description:
				"Noble families fight for control of the Iron Throne while an ancient threat awakens.",
			recommendedAge: 18,
		},
		{
			"@key": "tvShows:2",
			title: "Invencível",
			description: "Super heroi",
			recommendedAge: 16,
		},
	],
};

export default function WatchlistDetailPage() {
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
				<AddShowButton existingKeys={watchlist.tvShows.map((s) => s["@key"])} />
			</div>

			{/* TV Shows Grid */}
			<div className="flex flex-col gap-4">
				<h2 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
					{watchlist.tvShows.length}{" "}
					{watchlist.tvShows.length === 1 ? "Show" : "Shows"}
				</h2>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{watchlist.tvShows.map((show) => (
						<Link
							key={show["@key"]}
							href={`/tv-shows/${encodeURIComponent(show["@key"])}`}
							className="group flex items-center gap-4 rounded-xl bg-surface-container-low p-4 transition-colors hover:bg-surface-container"
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
					))}
				</div>
			</div>
		</div>
	);
}
