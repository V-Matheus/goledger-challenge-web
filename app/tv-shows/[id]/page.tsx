import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { searchSeasons } from "@/lib/api/seasons";
import { readTvShow } from "@/lib/api/tv-shows";
import { seasonKeys } from "@/lib/queries/seasons";
import { tvShowKeys } from "@/lib/queries/tv-shows";
import { TvShowDetailContent } from "./_components/TvShowDetailContent";

interface TvShowDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function TvShowDetailPage({
	params,
}: TvShowDetailPageProps) {
	const { id } = await params;
	const showKey = decodeURIComponent(id);
	const queryClient = new QueryClient();

	const tvShowRef = { "@assetType": "tvShows" as const, "@key": showKey };

	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: tvShowKeys.detail(showKey),
			queryFn: () => readTvShow(showKey),
		}),
		queryClient.prefetchQuery({
			queryKey: seasonKeys.list(tvShowRef),
			queryFn: () => searchSeasons(tvShowRef),
		}),
	]);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<TvShowDetailContent showKey={showKey} />
		</HydrationBoundary>
	);
}
