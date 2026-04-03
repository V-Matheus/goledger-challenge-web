"use server";

import { z } from "zod";
import {
	createEpisode,
	deleteEpisode,
	updateEpisode,
} from "@/lib/api/episodes";
import { createSeason, deleteSeason, updateSeason } from "@/lib/api/seasons";
import { createTvShow, deleteTvShow, updateTvShow } from "@/lib/api/tv-shows";
import type { ActionState } from "@/lib/schemas/action-state";
import {
	createEpisodeSchema,
	updateEpisodeSchema,
} from "@/lib/schemas/episodes";
import { createSeasonSchema, updateSeasonSchema } from "@/lib/schemas/seasons";
import { createTvShowSchema, updateTvShowSchema } from "@/lib/schemas/tv-shows";

// ── TV Shows ──

export async function createTvShowAction(
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const raw = {
		title: formData.get("title") as string,
		description: formData.get("description") as string,
		recommendedAge: formData.get("recommendedAge") as string,
	};

	const parsed = createTvShowSchema.safeParse(raw);

	if (!parsed.success) {
		return {
			success: false,
			fieldErrors: z.flattenError(parsed.error).fieldErrors,
			data: raw,
		};
	}

	await createTvShow(parsed.data);
	return { success: true };
}

export async function updateTvShowAction(
	title: string,
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const raw = {
		description: formData.get("description") as string,
		recommendedAge: formData.get("recommendedAge") as string,
	};

	const parsed = updateTvShowSchema.safeParse({
		title,
		...raw,
	});

	if (!parsed.success) {
		return {
			success: false,
			fieldErrors: z.flattenError(parsed.error).fieldErrors,
			data: raw,
		};
	}

	await updateTvShow(parsed.data);
	return { success: true };
}

export async function deleteTvShowAction(
	key: string,
	_prev: ActionState,
): Promise<ActionState> {
	await deleteTvShow(key);
	return { success: true };
}

// ── Seasons ──

export async function createSeasonAction(
	tvShowKey: string,
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const raw = {
		number: formData.get("number") as string,
		year: formData.get("year") as string,
	};

	const parsed = createSeasonSchema.safeParse({
		...raw,
		tvShowKey,
	});

	if (!parsed.success) {
		return {
			success: false,
			fieldErrors: z.flattenError(parsed.error).fieldErrors,
			data: raw,
		};
	}

	const { tvShowKey: key, ...rest } = parsed.data;
	await createSeason({
		...rest,
		tvShow: { "@assetType": "tvShows", "@key": key },
	});
	return { success: true };
}

export async function updateSeasonAction(
	seasonNumber: number,
	tvShowKey: string,
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const raw = {
		year: formData.get("year") as string,
	};

	const parsed = updateSeasonSchema.safeParse({
		number: seasonNumber,
		tvShowKey,
		...raw,
	});

	if (!parsed.success) {
		return {
			success: false,
			fieldErrors: z.flattenError(parsed.error).fieldErrors,
			data: raw,
		};
	}

	const { tvShowKey: key, ...rest } = parsed.data;
	await updateSeason({
		...rest,
		tvShow: { "@assetType": "tvShows", "@key": key },
	});
	return { success: true };
}

export async function deleteSeasonAction(
	key: string,
	_prev: ActionState,
): Promise<ActionState> {
	await deleteSeason(key);
	return { success: true };
}

// ── Episodes ──

export async function createEpisodeAction(
	seasonKey: string,
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const raw = {
		episodeNumber: formData.get("episodeNumber") as string,
		title: formData.get("title") as string,
		description: formData.get("description") as string,
		releaseDate: formData.get("releaseDate") as string,
		rating: formData.get("rating") as string,
	};

	const parsed = createEpisodeSchema.safeParse({
		...raw,
		rating: raw.rating || undefined,
		seasonKey,
	});

	if (!parsed.success) {
		return {
			success: false,
			fieldErrors: z.flattenError(parsed.error).fieldErrors,
			data: raw,
		};
	}

	const { seasonKey: key, ...rest } = parsed.data;
	await createEpisode({
		...rest,
		season: { "@assetType": "seasons", "@key": key },
	});
	return { success: true };
}

export async function updateEpisodeAction(
	episodeNumber: number,
	seasonKey: string,
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const raw = {
		title: formData.get("title") as string,
		description: formData.get("description") as string,
		releaseDate: formData.get("releaseDate") as string,
		rating: formData.get("rating") as string,
	};

	const parsed = updateEpisodeSchema.safeParse({
		episodeNumber,
		seasonKey,
		title: raw.title || undefined,
		description: raw.description || undefined,
		releaseDate: raw.releaseDate || undefined,
		rating: raw.rating || undefined,
	});

	if (!parsed.success) {
		return {
			success: false,
			fieldErrors: z.flattenError(parsed.error).fieldErrors,
			data: raw,
		};
	}

	const { seasonKey: key, ...rest } = parsed.data;
	await updateEpisode({
		...rest,
		season: { "@assetType": "seasons", "@key": key },
	});
	return { success: true };
}

export async function deleteEpisodeAction(
	key: string,
	_prev: ActionState,
): Promise<ActionState> {
	await deleteEpisode(key);
	return { success: true };
}
