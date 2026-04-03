import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createEpisode,
	deleteEpisode,
	readEpisode,
	searchEpisodes,
	updateEpisode,
} from "@/lib/api/episodes";

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

describe("searchEpisodes", () => {
	it("calls search with episodes selector", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		await searchEpisodes();
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: { selector: { "@assetType": "episodes" } },
		});
	});

	it("includes season filter when provided", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		const season = { "@assetType": "seasons" as const, "@key": "seasons:1" };
		await searchEpisodes(season);
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: { selector: { "@assetType": "episodes", season } },
		});
	});

	it("includes limit and bookmark", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		await searchEpisodes(undefined, 10, "bm");
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: {
				selector: { "@assetType": "episodes" },
				limit: 10,
				bookmark: "bm",
			},
		});
	});
});

describe("readEpisode", () => {
	it("calls readAsset with correct key", async () => {
		mockPost.mockResolvedValue({ data: {} });
		await readEpisode("episodes:1");
		expect(mockPost).toHaveBeenCalledWith("/api/query/readAsset", {
			key: { "@assetType": "episodes", "@key": "episodes:1" },
		});
	});
});

describe("createEpisode", () => {
	it("calls createAsset and returns first item", async () => {
		const payload = {
			episodeNumber: 1,
			title: "Pilot",
			description: "First episode",
			releaseDate: "2024-01-01T00:00:00Z",
			season: { "@assetType": "seasons" as const, "@key": "seasons:1" },
		};
		const created = { ...payload, "@key": "episodes:1" };
		mockPost.mockResolvedValue({ data: [created] });
		const result = await createEpisode(payload);
		expect(result).toEqual(created);
	});
});

describe("updateEpisode", () => {
	it("calls updateAsset with payload", async () => {
		const payload = {
			episodeNumber: 1,
			season: { "@assetType": "seasons" as const, "@key": "seasons:1" },
			title: "Updated",
		};
		mockPut.mockResolvedValue({ data: payload });
		await updateEpisode(payload);
		expect(mockPut).toHaveBeenCalledWith("/api/invoke/updateAsset", {
			update: { "@assetType": "episodes", ...payload },
		});
	});
});

describe("deleteEpisode", () => {
	it("calls deleteAsset with correct key", async () => {
		mockDelete.mockResolvedValue({ data: {} });
		await deleteEpisode("episodes:1");
		expect(mockDelete).toHaveBeenCalledWith("/api/invoke/deleteAsset", {
			data: { key: { "@assetType": "episodes", "@key": "episodes:1" } },
		});
	});
});
