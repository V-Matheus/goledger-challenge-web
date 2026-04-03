import type {
	AssetRef,
	CreateEpisodePayload,
	Episode,
	SearchResponse,
	UpdateEpisodePayload,
} from "@/lib/types";
import { api } from "./client";

const ASSET_TYPE = "episodes";

export async function searchEpisodes(
	season?: AssetRef<"seasons">,
	limit?: number,
	bookmark?: string,
) {
	const { data } = await api.post<SearchResponse<Episode>>(
		"/api/query/search",
		{
			query: {
				selector: {
					"@assetType": ASSET_TYPE,
					...(season && { season }),
				},
				...(limit && { limit }),
				...(bookmark && { bookmark }),
			},
		},
	);
	return data;
}

export async function readEpisode(key: string) {
	const { data } = await api.post<Episode>("/api/query/readAsset", {
		key: { "@assetType": ASSET_TYPE, "@key": key },
	});
	return data;
}

export async function createEpisode(payload: CreateEpisodePayload) {
	const { data } = await api.post<Episode[]>("/api/invoke/createAsset", {
		asset: [{ "@assetType": ASSET_TYPE, ...payload }],
	});
	return data[0];
}

export async function updateEpisode(payload: UpdateEpisodePayload) {
	const { data } = await api.put<Episode>("/api/invoke/updateAsset", {
		update: { "@assetType": ASSET_TYPE, ...payload },
	});
	return data;
}

export async function deleteEpisode(key: string) {
	const { data } = await api.delete("/api/invoke/deleteAsset", {
		data: { key: { "@assetType": ASSET_TYPE, "@key": key } },
	});
	return data;
}
