import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { useSeason, useSeasons } from "@/lib/queries/seasons";

const mockSearchSeasons = vi.fn();
const mockReadSeason = vi.fn();

vi.mock("@/lib/api/seasons", () => ({
	searchSeasons: (...args: unknown[]) => mockSearchSeasons(...args),
	readSeason: (...args: unknown[]) => mockReadSeason(...args),
}));

function createWrapper() {
	const client = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: ReactNode }) =>
		QueryClientProvider({ client, children });
}

describe("useSeasons", () => {
	it("fetches seasons list", async () => {
		const data = { result: [], metadata: {} };
		mockSearchSeasons.mockResolvedValue(data);

		const { result } = renderHook(() => useSeasons(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(data);
	});

	it("passes tvShow filter", async () => {
		mockSearchSeasons.mockResolvedValue({ result: [], metadata: {} });
		const tvShow = { "@assetType": "tvShows" as const, "@key": "tvShows:1" };

		const { result } = renderHook(() => useSeasons(tvShow), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(mockSearchSeasons).toHaveBeenCalledWith(
			tvShow,
			undefined,
			undefined,
		);
	});
});

describe("useSeason", () => {
	it("fetches a single season", async () => {
		const season = { number: 1, "@key": "seasons:1" };
		mockReadSeason.mockResolvedValue(season);

		const { result } = renderHook(() => useSeason("seasons:1"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(season);
	});

	it("does not fetch when key is empty", () => {
		const { result } = renderHook(() => useSeason(""), {
			wrapper: createWrapper(),
		});

		expect(result.current.isFetching).toBe(false);
	});
});
