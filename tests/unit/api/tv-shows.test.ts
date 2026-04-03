import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	createTvShow,
	deleteTvShow,
	readTvShow,
	searchTvShows,
	updateTvShow,
} from "@/lib/api/tv-shows";

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

describe("searchTvShows", () => {
	it("calls search endpoint with tvShows selector", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		await searchTvShows();
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: { selector: { "@assetType": "tvShows" } },
		});
	});

	it("includes limit and bookmark when provided", async () => {
		mockPost.mockResolvedValue({ data: { result: [], metadata: {} } });
		await searchTvShows(10, "abc");
		expect(mockPost).toHaveBeenCalledWith("/api/query/search", {
			query: {
				selector: { "@assetType": "tvShows" },
				limit: 10,
				bookmark: "abc",
			},
		});
	});

	it("returns data from response", async () => {
		const expected = { result: [{ title: "Test" }], metadata: {} };
		mockPost.mockResolvedValue({ data: expected });
		const result = await searchTvShows();
		expect(result).toEqual(expected);
	});
});

describe("readTvShow", () => {
	it("calls readAsset with correct key", async () => {
		mockPost.mockResolvedValue({ data: { title: "Test" } });
		await readTvShow("tvShows:1");
		expect(mockPost).toHaveBeenCalledWith("/api/query/readAsset", {
			key: { "@assetType": "tvShows", "@key": "tvShows:1" },
		});
	});

	it("returns the asset data", async () => {
		const show = { title: "Test" };
		mockPost.mockResolvedValue({ data: show });
		const result = await readTvShow("tvShows:1");
		expect(result).toEqual(show);
	});
});

describe("createTvShow", () => {
	it("calls createAsset with payload", async () => {
		const payload = { title: "New", description: "Desc", recommendedAge: 16 };
		mockPost.mockResolvedValue({ data: [{ ...payload, "@key": "tvShows:1" }] });
		await createTvShow(payload);
		expect(mockPost).toHaveBeenCalledWith("/api/invoke/createAsset", {
			asset: [{ "@assetType": "tvShows", ...payload }],
		});
	});

	it("returns the first created asset", async () => {
		const created = { title: "New", "@key": "tvShows:1" };
		mockPost.mockResolvedValue({ data: [created] });
		const result = await createTvShow({
			title: "New",
			description: "Desc",
			recommendedAge: 16,
		});
		expect(result).toEqual(created);
	});
});

describe("updateTvShow", () => {
	it("calls updateAsset with payload", async () => {
		const payload = { title: "Updated", description: "New desc" };
		mockPut.mockResolvedValue({ data: payload });
		await updateTvShow(payload);
		expect(mockPut).toHaveBeenCalledWith("/api/invoke/updateAsset", {
			update: { "@assetType": "tvShows", ...payload },
		});
	});
});

describe("deleteTvShow", () => {
	it("calls deleteAsset with correct key", async () => {
		mockDelete.mockResolvedValue({ data: {} });
		await deleteTvShow("tvShows:1");
		expect(mockDelete).toHaveBeenCalledWith("/api/invoke/deleteAsset", {
			data: { key: { "@assetType": "tvShows", "@key": "tvShows:1" } },
		});
	});
});
