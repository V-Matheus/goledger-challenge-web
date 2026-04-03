import { useQuery } from "@tanstack/react-query";
import { readSeason, searchSeasons } from "@/lib/api/seasons";
import type { AssetRef } from "@/lib/types";

export const seasonKeys = {
	all: ["seasons"] as const,
	list: (tvShow?: AssetRef<"tvShows">, limit?: number, bookmark?: string) =>
		[...seasonKeys.all, "list", { tvShow, limit, bookmark }] as const,
	detail: (key: string) => [...seasonKeys.all, "detail", key] as const,
};

export function useSeasons(
	tvShow?: AssetRef<"tvShows">,
	limit?: number,
	bookmark?: string,
) {
	return useQuery({
		queryKey: seasonKeys.list(tvShow, limit, bookmark),
		queryFn: () => searchSeasons(tvShow, limit, bookmark),
	});
}

export function useSeason(key: string) {
	return useQuery({
		queryKey: seasonKeys.detail(key),
		queryFn: () => readSeason(key),
		enabled: !!key,
	});
}
