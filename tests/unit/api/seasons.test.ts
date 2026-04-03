import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createSeason,
	deleteSeason,
	readSeason,
	searchSeasons,
	updateSeason,
} from "@/lib/api/seasons";

const mockPost = vi.fn();
const mockPut = vi.fn();
const mockDelete = vi.fn();

vi.mock("@/lib/api/client", () => ({
	api: {
		post: (...args: unknown[]) => mockPost(...args),
		put: (...args: unknown[]) => mockPut(...args),
		delete: (...args: unknown[]) => mockDelete(...args),
	},
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe("searchSeasons", () => {
	it("calls search with seasons selector", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		await searchSeasons();
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: { selector: { "@assetType": "seasons" } },
		});
	});

	it("includes tvShow filter when provided", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		const tvShow = { "@assetType": "tvShows" as const, "@key": "tvShows:1" };
		await searchSeasons(tvShow);
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: { selector: { "@assetType": "seasons", tvShow } },
		});
	});

	it("includes limit and bookmark", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		await searchSeasons(undefined, 5, "bm");
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: {
				selector: { "@assetType": "seasons" },
				limit: 5,
				bookmark: "bm",
			},
		});
	});
});

describe("readSeason", () => {
	it("calls readAsset with correct key", async () => {
		mockPost.mockResolvedValue({ data: {} });
		await readSeason("seasons:1");
		expect(mockPost).toHaveBeenCalledWith("/api/query/readAsset", {
			key: { "@assetType": "seasons", "@key": "seasons:1" },
		});
	});
});

describe("createSeason", () => {
	it("calls createAsset and returns first item", async () => {
		const payload = {
			number: 1,
			year: 2024,
			tvShow: { "@assetType": "tvShows" as const, "@key": "tvShows:1" },
		};
		const created = { ...payload, "@key": "seasons:1" };
		mockPost.mockResolvedValue({ data: [created] });
		const result = await createSeason(payload);
		expect(result).toEqual(created);
	});
});

describe("updateSeason", () => {
	it("calls updateAsset with payload", async () => {
		const payload = {
			number: 1,
			tvShow: { "@assetType": "tvShows" as const, "@key": "tvShows:1" },
			year: 2025,
		};
		mockPut.mockResolvedValue({ data: payload });
		await updateSeason(payload);
		expect(mockPut).toHaveBeenCalledWith("/api/invoke/updateAsset", {
			update: { "@assetType": "seasons", ...payload },
		});
	});
});

describe("deleteSeason", () => {
	it("calls deleteAsset with correct key", async () => {
		mockDelete.mockResolvedValue({ data: {} });
		await deleteSeason("seasons:1");
		expect(mockDelete).toHaveBeenCalledWith("/api/invoke/deleteAsset", {
			data: { key: { "@assetType": "seasons", "@key": "seasons:1" } },
		});
	});
});
