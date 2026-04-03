import type {
	CreateTvShowPayload,
	SearchResponse,
	TvShow,
	UpdateTvShowPayload,
} from "@/lib/types";
import { api } from "./client";

const ASSET_TYPE = "tvShows";

export async function searchTvShows(limit?: number, bookmark?: string) {
	const { data } = await api.post<SearchResponse<TvShow>>("/api/query/search", {
		query: {
			selector: { "@assetType": ASSET_TYPE },
			...(limit && { limit }),
			...(bookmark && { bookmark }),
		},
	});
	return data;
}

export async function readTvShow(key: string) {
	const { data } = await api.post<TvShow>("/api/query/readAsset", {
		key: { "@assetType": ASSET_TYPE, "@key": key },
	});
	return data;
}

export async function createTvShow(payload: CreateTvShowPayload) {
	const { data } = await api.post<TvShow[]>("/api/invoke/createAsset", {
		asset: [{ "@assetType": ASSET_TYPE, ...payload }],
	});
	return data[0];
}

export async function updateTvShow(payload: UpdateTvShowPayload) {
	const { data } = await api.put<TvShow>("/api/invoke/updateAsset", {
		update: { "@assetType": ASSET_TYPE, ...payload },
	});
	return data;
}

export async function deleteTvShow(key: string) {
	const { data } = await api.delete("/api/invoke/deleteAsset", {
		data: { key: { "@assetType": ASSET_TYPE, "@key": key } },
	});
	return data;
}
