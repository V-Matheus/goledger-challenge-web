import { useQuery } from "@tanstack/react-query";
import { readTvShow, searchTvShows } from "@/lib/api/tv-shows";

export const tvShowKeys = {
	all: ["tvShows"] as const,
	list: (limit?: number, bookmark?: string) =>
		[...tvShowKeys.all, "list", { limit, bookmark }] as const,
	detail: (key: string) => [...tvShowKeys.all, "detail", key] as const,
};

export function useTvShows(limit?: number, bookmark?: string) {
	return useQuery({
		queryKey: tvShowKeys.list(limit, bookmark),
		queryFn: () => searchTvShows(limit, bookmark),
	});
}

export function useTvShow(key: string) {
	return useQuery({
		queryKey: tvShowKeys.detail(key),
		queryFn: () => readTvShow(key),
		enabled: !!key,
	});
}
