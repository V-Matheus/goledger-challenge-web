import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { useEpisode, useEpisodes } from "@/lib/queries/episodes";

const mockSearchEpisodes = vi.fn();
const mockReadEpisode = vi.fn();

vi.mock("@/lib/api/episodes", () => ({
	searchEpisodes: (...args: unknown[]) => mockSearchEpisodes(...args),
	readEpisode: (...args: unknown[]) => mockReadEpisode(...args),
}));

function createWrapper() {
	const client = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});
	return ({ children }: { children: ReactNode }) =>
		QueryClientProvider({ client, children });
}

describe("useEpisodes", () => {
	it("fetches episodes list", async () => {
		const data = { result: [], metadata: {} };
		mockSearchEpisodes.mockResolvedValue(data);

		const { result } = renderHook(() => useEpisodes(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(data);
	});

	it("passes season filter", async () => {
		mockSearchEpisodes.mockResolvedValue({ result: [], metadata: {} });
		const season = { "@assetType": "seasons" as const, "@key": "seasons:1" };

		const { result } = renderHook(() => useEpisodes(season), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(mockSearchEpisodes).toHaveBeenCalledWith(
			season,
			undefined,
			undefined,
		);
	});
});

describe("useEpisode", () => {
	it("fetches a single episode", async () => {
		const episode = { title: "Pilot", "@key": "episodes:1" };
		mockReadEpisode.mockResolvedValue(episode);

		const { result } = renderHook(() => useEpisode("episodes:1"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual(episode);
	});

	it("does not fetch when key is empty", () => {
		const { result } = renderHook(() => useEpisode(""), {
			wrapper: createWrapper(),
		});

		expect(result.current.isFetching).toBe(false);
	});
});
