import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { searchTvShows } from "@/lib/api/tv-shows";
import { tvShowKeys } from "@/lib/queries/tv-shows";
import { TvShowsContent } from "./_components/TvShowsContent";

export default async function TvShowsPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: tvShowKeys.list(),
		queryFn: () => searchTvShows(),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<TvShowsContent />
		</HydrationBoundary>
	);
}
