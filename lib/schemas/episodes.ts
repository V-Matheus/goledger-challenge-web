import { z } from "zod";

const toRFC3339 = z
	.string()
	.min(1, "Release date is required")
	.transform((val) => (val.includes("T") ? val : `${val}T00:00:00Z`));

export const createEpisodeSchema = z.object({
	episodeNumber: z.coerce.number().min(1, "Episode number is required"),
	title: z.string().min(1, "Title is required"),
	description: z.string().optional().default(""),
	releaseDate: toRFC3339,
	rating: z.coerce.number().min(0).max(10).optional(),
	seasonKey: z.string().min(1, "Season reference is required"),
});

export const updateEpisodeSchema = z.object({
	episodeNumber: z.coerce.number().min(1, "Episode number is required"),
	seasonKey: z.string().min(1, "Season reference is required"),
	title: z.string().optional(),
	description: z.string().optional(),
	releaseDate: toRFC3339.optional(),
	rating: z.coerce.number().min(0).max(10).optional(),
});
