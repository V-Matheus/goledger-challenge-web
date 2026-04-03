import { useQuery } from "@tanstack/react-query";
import { readEpisode, searchEpisodes } from "@/lib/api/episodes";
import type { AssetRef } from "@/lib/types";

export const episodeKeys = {
	all: ["episodes"] as const,
	list: (season?: AssetRef<"seasons">, limit?: number, bookmark?: string) =>
		[...episodeKeys.all, "list", { season, limit, bookmark }] as const,
	detail: (key: string) => [...episodeKeys.all, "detail", key] as const,
};

export function useEpisodes(
	season?: AssetRef<"seasons">,
	limit?: number,
	bookmark?: string,
) {
	return useQuery({
		queryKey: episodeKeys.list(season, limit, bookmark),
		queryFn: () => searchEpisodes(season, limit, bookmark),
	});
}

export function useEpisode(key: string) {
	return useQuery({
		queryKey: episodeKeys.detail(key),
		queryFn: () => readEpisode(key),
		enabled: !!key,
	});
}
