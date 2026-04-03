export type AssetMetadata = {
	"@assetType": string;
	"@key": string;
	"@lastTouchBy": string;
	"@lastTx": string;
	"@lastTxID": string;
	"@lastUpdated": string;
};

export type AssetRef<T extends string> = {
	"@assetType": T;
	"@key": string;
};

// ── TV Shows ──

export type TvShow = AssetMetadata & {
	"@assetType": "tvShows";
	title: string;
	description: string;
	recommendedAge: number;
};

export type CreateTvShowPayload = {
	title: string;
	description: string;
	recommendedAge: number;
};

export type UpdateTvShowPayload = {
	title: string;
	description?: string;
	recommendedAge?: number;
};

// ── Seasons ──

export type Season = AssetMetadata & {
	"@assetType": "seasons";
	number: number;
	tvShow: AssetRef<"tvShows">;
	year: number;
};

export type CreateSeasonPayload = {
	number: number;
	tvShow: AssetRef<"tvShows">;
	year: number;
};

export type UpdateSeasonPayload = {
	number: number;
	tvShow: AssetRef<"tvShows">;
	year?: number;
};

// ── Episodes ──

export type Episode = AssetMetadata & {
	"@assetType": "episodes";
	season: AssetRef<"seasons">;
	episodeNumber: number;
	title: string;
	releaseDate: string;
	description: string;
	rating?: number;
};

export type CreateEpisodePayload = {
	season: AssetRef<"seasons">;
	episodeNumber: number;
	title: string;
	releaseDate: string;
	description: string;
	rating?: number;
};

export type UpdateEpisodePayload = {
	season: AssetRef<"seasons">;
	episodeNumber: number;
	title?: string;
	releaseDate?: string;
	description?: string;
	rating?: number;
};

// ── Watchlist ──

export type Watchlist = AssetMetadata & {
	"@assetType": "watchlist";
	title: string;
	description?: string;
	tvShows?: AssetRef<"tvShows">[];
};

export type CreateWatchlistPayload = {
	title: string;
	description?: string;
	tvShows?: AssetRef<"tvShows">[];
};

export type UpdateWatchlistPayload = {
	title: string;
	description?: string;
	tvShows?: AssetRef<"tvShows">[];
};

// ── API Response Types ──

export type SearchMetadata = {
	bookmark: string;
	fetched_records_count: number;
};

export type SearchResponse<T> = {
	metadata: SearchMetadata;
	result: T[];
};

export type SearchQuery = {
	selector: Record<string, unknown>;
	limit?: number;
	bookmark?: string;
};
