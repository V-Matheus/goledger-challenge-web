import { z } from "zod";

export const createSeasonSchema = z.object({
	number: z.coerce.number().min(1, "Season number is required"),
	year: z.coerce.number().min(1900, "Year must be valid"),
	tvShowKey: z.string().min(1, "TV Show reference is required"),
});

export const updateSeasonSchema = z.object({
	number: z.coerce.number().min(1, "Season number is required"),
	tvShowKey: z.string().min(1, "TV Show reference is required"),
	year: z.coerce.number().min(1900, "Year must be valid").optional(),
});
