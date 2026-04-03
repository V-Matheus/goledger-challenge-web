import type {
	AssetRef,
	CreateSeasonPayload,
	SearchResponse,
	Season,
	UpdateSeasonPayload,
} from "@/lib/types";
import { api } from "./client";

const ASSET_TYPE = "seasons";

export async function searchSeasons(
	tvShow?: AssetRef<"tvShows">,
	limit?: number,
	bookmark?: string,
) {
	const { data } = await api.post<SearchResponse<Season>>("/api/query/search", {
		query: {
			selector: {
				"@assetType": ASSET_TYPE,
				...(tvShow && { tvShow }),
			},
			...(limit && { limit }),
			...(bookmark && { bookmark }),
		},
	});
	return data;
}

export async function readSeason(key: string) {
	const { data } = await api.post<Season>("/api/query/readAsset", {
		key: { "@assetType": ASSET_TYPE, "@key": key },
	});
	return data;
}

export async function createSeason(payload: CreateSeasonPayload) {
	const { data } = await api.post<Season[]>("/api/invoke/createAsset", {
		asset: [{ "@assetType": ASSET_TYPE, ...payload }],
	});
	return data[0];
}

export async function updateSeason(payload: UpdateSeasonPayload) {
	const { data } = await api.put<Season>("/api/invoke/updateAsset", {
		update: { "@assetType": ASSET_TYPE, ...payload },
	});
	return data;
}

export async function deleteSeason(key: string) {
	const { data } = await api.delete("/api/invoke/deleteAsset", {
		data: { key: { "@assetType": ASSET_TYPE, "@key": key } },
	});
	return data;
}
