import type {
	CreateWatchlistPayload,
	SearchResponse,
	UpdateWatchlistPayload,
	Watchlist,
} from "@/lib/types";
import { api } from "./client";

const ASSET_TYPE = "watchlist";

export async function searchWatchlists(limit?: number, bookmark?: string) {
	const { data } = await api.post<SearchResponse<Watchlist>>(
		"/api/query/search",
		{
			query: {
				selector: { "@assetType": ASSET_TYPE },
				...(limit && { limit }),
				...(bookmark && { bookmark }),
			},
		},
	);
	return data;
}

export async function readWatchlist(key: string) {
	const { data } = await api.post<Watchlist>("/api/query/readAsset", {
		key: { "@assetType": ASSET_TYPE, "@key": key },
	});
	return data;
}

export async function createWatchlist(payload: CreateWatchlistPayload) {
	const { data } = await api.post<Watchlist[]>("/api/invoke/createAsset", {
		asset: [{ "@assetType": ASSET_TYPE, ...payload }],
	});
	return data[0];
}

export async function updateWatchlist(payload: UpdateWatchlistPayload) {
	const { data } = await api.put<Watchlist>("/api/invoke/updateAsset", {
		update: { "@assetType": ASSET_TYPE, ...payload },
	});
	return data;
}

export async function deleteWatchlist(key: string) {
	const { data } = await api.delete("/api/invoke/deleteAsset", {
		data: { key: { "@assetType": ASSET_TYPE, "@key": key } },
	});
	return data;
}
