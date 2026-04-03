"use server";

import { z } from "zod";
import {
	createWatchlist,
	deleteWatchlist,
	updateWatchlist,
} from "@/lib/api/watchlist";
import type { ActionState } from "@/lib/schemas/action-state";
import {
	createWatchlistSchema,
	updateWatchlistSchema,
} from "@/lib/schemas/watchlist";

export async function createWatchlistAction(
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const raw = {
		title: formData.get("title") as string,
		description: formData.get("description") as string,
	};

	const parsed = createWatchlistSchema.safeParse({
		...raw,
		description: raw.description || undefined,
	});

	if (!parsed.success) {
		return {
			success: false,
			fieldErrors: z.flattenError(parsed.error).fieldErrors,
			data: raw,
		};
	}

	await createWatchlist(parsed.data);
	return { success: true };
}

export async function updateWatchlistAction(
	tvShowKeys: string[],
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const raw = {
		title: formData.get("title") as string,
		description: formData.get("description") as string,
	};

	const parsed = updateWatchlistSchema.safeParse({
		...raw,
		description: raw.description || undefined,
		tvShowKeys,
	});

	if (!parsed.success) {
		return {
			success: false,
			fieldErrors: z.flattenError(parsed.error).fieldErrors,
			data: raw,
		};
	}

	const { tvShowKeys: keys, ...rest } = parsed.data;
	const tvShows = keys?.map((key) => ({
		"@assetType": "tvShows" as const,
		"@key": key,
	}));

	await updateWatchlist({ ...rest, tvShows });
	return { success: true };
}

export async function updateWatchlistShowsAction(
	title: string,
	description: string | undefined,
	tvShowKeys: string[],
	_prev: ActionState,
): Promise<ActionState> {
	const tvShows = tvShowKeys.map((key) => ({
		"@assetType": "tvShows" as const,
		"@key": key,
	}));

	await updateWatchlist({ title, description, tvShows });
	return { success: true };
}

export async function deleteWatchlistAction(
	key: string,
	_prev: ActionState,
): Promise<ActionState> {
	await deleteWatchlist(key);
	return { success: true };
}
