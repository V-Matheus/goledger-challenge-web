import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createWatchlist,
	deleteWatchlist,
	readWatchlist,
	searchWatchlists,
	updateWatchlist,
} from "@/lib/api/watchlist";

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

describe("searchWatchlists", () => {
	it("calls search with watchlist selector", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		await searchWatchlists();
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: { selector: { "@assetType": "watchlist" } },
		});
	});

	it("includes limit and bookmark", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		await searchWatchlists(5, "bm");
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: {
				selector: { "@assetType": "watchlist" },
				limit: 5,
				bookmark: "bm",
			},
		});
	});
});

describe("readWatchlist", () => {
	it("calls readAsset with correct key", async () => {
		mockPost.mockResolvedValue({ data: {} });
		await readWatchlist("watchlist:1");
		expect(mockPost).toHaveBeenCalledWith("/api/query/readAsset", {
			key: { "@assetType": "watchlist", "@key": "watchlist:1" },
		});
	});
});

describe("createWatchlist", () => {
	it("calls createAsset and returns first item", async () => {
		const payload = { title: "My List", description: "Desc" };
		const created = { ...payload, "@key": "watchlist:1" };
		mockPost.mockResolvedValue({ data: [created] });
		const result = await createWatchlist(payload);
		expect(result).toEqual(created);
	});
});

describe("updateWatchlist", () => {
	it("calls updateAsset with payload", async () => {
		const payload = { title: "Updated", description: "New desc" };
		mockPut.mockResolvedValue({ data: payload });
		await updateWatchlist(payload);
		expect(mockPut).toHaveBeenCalledWith("/api/invoke/updateAsset", {
			update: { "@assetType": "watchlist", ...payload },
		});
	});
});

describe("deleteWatchlist", () => {
	it("calls deleteAsset with correct key", async () => {
		mockDelete.mockResolvedValue({ data: {} });
		await deleteWatchlist("watchlist:1");
		expect(mockDelete).toHaveBeenCalledWith("/api/invoke/deleteAsset", {
			data: { key: { "@assetType": "watchlist", "@key": "watchlist:1" } },
		});
	});
});
