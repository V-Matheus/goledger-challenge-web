import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { searchWatchlists } from "@/lib/api/watchlist";
import { watchlistKeys } from "@/lib/queries/watchlist";
import { WatchlistContent } from "./_components/WatchlistContent";

export default async function WatchlistPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: watchlistKeys.list(),
		queryFn: () => searchWatchlists(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<WatchlistContent />
		</HydrationBoundary>
	);
}
