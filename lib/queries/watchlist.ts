import { useQuery } from "@tanstack/react-query";
import { readWatchlist, searchWatchlists } from "@/lib/api/watchlist";

export const watchlistKeys = {
	all: ["watchlist"] as const,
	list: (limit?: number, bookmark?: string) =>
		[...watchlistKeys.all, "list", { limit, bookmark }] as const,
	detail: (key: string) => [...watchlistKeys.all, "detail", key] as const,
};

export function useWatchlists(limit?: number, bookmark?: string) {
	return useQuery({
		queryKey: watchlistKeys.list(limit, bookmark),
		queryFn: () => searchWatchlists(limit, bookmark),
	});
}

export function useWatchlist(key: string) {
	return useQuery({
		queryKey: watchlistKeys.detail(key),
		queryFn: () => readWatchlist(key),
		enabled: !!key,
	});
}
