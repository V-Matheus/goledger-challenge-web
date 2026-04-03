import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { searchTvShows } from "@/lib/api/tv-shows";
import { readWatchlist } from "@/lib/api/watchlist";
import { tvShowKeys } from "@/lib/queries/tv-shows";
import { watchlistKeys } from "@/lib/queries/watchlist";
import { WatchlistDetailContent } from "./_components/WatchlistDetailContent";

interface WatchlistDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function WatchlistDetailPage({
	params,
}: WatchlistDetailPageProps) {
	const { id } = await params;
	const watchlistKey = decodeURIComponent(id);
	const queryClient = new QueryClient();

	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: watchlistKeys.detail(watchlistKey),
			queryFn: () => readWatchlist(watchlistKey),
		}),
		queryClient.prefetchQuery({
			queryKey: tvShowKeys.list(),
			queryFn: () => searchTvShows(),
		}),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<WatchlistDetailContent watchlistKey={watchlistKey} />
		</HydrationBoundary>
	);
}
