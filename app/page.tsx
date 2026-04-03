import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { searchEpisodes } from "@/lib/api/episodes";
import { searchSeasons } from "@/lib/api/seasons";
import { searchTvShows } from "@/lib/api/tv-shows";
import { searchWatchlists } from "@/lib/api/watchlist";
import { episodeKeys } from "@/lib/queries/episodes";
import { seasonKeys } from "@/lib/queries/seasons";
import { tvShowKeys } from "@/lib/queries/tv-shows";
import { watchlistKeys } from "@/lib/queries/watchlist";
import { DashboardContent } from "./_components/DashboardContent";

export default async function DashboardPage() {
	const queryClient = new QueryClient();

	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: tvShowKeys.list(),
			queryFn: () => searchTvShows(),
		}),
		queryClient.prefetchQuery({
			queryKey: seasonKeys.list(),
			queryFn: () => searchSeasons(),
		}),
		queryClient.prefetchQuery({
			queryKey: episodeKeys.list(),
			queryFn: () => searchEpisodes(),
		}),
		queryClient.prefetchQuery({
			queryKey: watchlistKeys.list(),
			queryFn: () => searchWatchlists(),
		}),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DashboardContent />
		</HydrationBoundary>
	);
}
