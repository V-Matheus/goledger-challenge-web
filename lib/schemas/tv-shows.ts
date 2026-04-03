import { z } from "zod";

export const createTvShowSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	recommendedAge: z.coerce.number().min(0, "Age must be 0 or greater"),
});

export const updateTvShowSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	recommendedAge: z.coerce
		.number()
		.min(0, "Age must be 0 or greater")
		.optional(),
});
