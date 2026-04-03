import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { useTvShow, useTvShows } from "@/lib/queries/tv-shows";

const mockSearchTvShows = vi.fn();
const mockReadTvShow = vi.fn();

vi.mock("@/lib/api/tv-shows", () => ({
	searchTvShows: (...args: unknown[]) => mockSearchTvShows(...args),
	readTvShow: (...args: unknown[]) => mockReadTvShow(...args),
}));

function createWrapper() {
	const client = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: ReactNode }) =>
		QueryClientProvider({ client, children });
}

describe("useTvShows", () => {
	it("fetches tv shows list", async () => {
		const data = { result: [{ title: "Test" }], metadata: {} };
		mockSearchTvShows.mockResolvedValue(data);

		const { result } = renderHook(() => useTvShows(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(data);
		expect(mockSearchTvShows).toHaveBeenCalledWith(undefined, undefined);
	});

	it("passes limit and bookmark", async () => {
		mockSearchTvShows.mockResolvedValue({ result: [], metadata: {} });

		const { result } = renderHook(() => useTvShows(10, "abc"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(mockSearchTvShows).toHaveBeenCalledWith(10, "abc");
	});
});

describe("useTvShow", () => {
	it("fetches a single tv show", async () => {
		const show = { title: "Test", "@key": "tvShows:1" };
		mockReadTvShow.mockResolvedValue(show);

		const { result } = renderHook(() => useTvShow("tvShows:1"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(show);
	});

	it("does not fetch when key is empty", () => {
		const { result } = renderHook(() => useTvShow(""), {
			wrapper: createWrapper(),
		});

		expect(result.current.isFetching).toBe(false);
	});
});
