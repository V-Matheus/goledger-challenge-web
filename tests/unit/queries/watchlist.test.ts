import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { useWatchlist, useWatchlists } from "@/lib/queries/watchlist";

const mockSearchWatchlists = vi.fn();
const mockReadWatchlist = vi.fn();

vi.mock("@/lib/api/watchlist", () => ({
	searchWatchlists: (...args: unknown[]) => mockSearchWatchlists(...args),
	readWatchlist: (...args: unknown[]) => mockReadWatchlist(...args),
}));

function createWrapper() {
	const client = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: ReactNode }) =>
		QueryClientProvider({ client, children });
}

describe("useWatchlists", () => {
	it("fetches watchlists list", async () => {
		const data = { result: [], metadata: {} };
		mockSearchWatchlists.mockResolvedValue(data);

		const { result } = renderHook(() => useWatchlists(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(data);
	});

	it("passes limit and bookmark", async () => {
		mockSearchWatchlists.mockResolvedValue({ result: [], metadata: {} });

		const { result } = renderHook(() => useWatchlists(5, "bm"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(mockSearchWatchlists).toHaveBeenCalledWith(5, "bm");
	});
});

describe("useWatchlist", () => {
	it("fetches a single watchlist", async () => {
		const watchlist = { title: "My List", "@key": "watchlist:1" };
		mockReadWatchlist.mockResolvedValue(watchlist);

		const { result } = renderHook(() => useWatchlist("watchlist:1"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(watchlist);
	});

	it("does not fetch when key is empty", () => {
		const { result } = renderHook(() => useWatchlist(""), {
			wrapper: createWrapper(),
		});

		expect(result.current.isFetching).toBe(false);
	});
});
