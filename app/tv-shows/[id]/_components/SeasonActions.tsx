"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
	Modal,
	ModalBody,
	ModalClose,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from "@/components/ui/Modal";
import { episodeKeys } from "@/lib/queries/episodes";
import { seasonKeys } from "@/lib/queries/seasons";
import { initialActionState } from "@/lib/schemas/action-state";
import { createEpisodeAction, createSeasonAction } from "../../actions";

export function AddSeasonButton({ showKey }: { showKey: string }) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const [formKey, setFormKey] = useState(0);

	const boundAction = createSeasonAction.bind(null, showKey);
	const [state, formAction, isPending] = useActionState(
		boundAction,
		initialActionState,
	);

	useEffect(() => {
		if (state.success) {
			queryClient.invalidateQueries({ queryKey: seasonKeys.all });
			setOpen(false);
			setFormKey((k) => k + 1);
		}
	}, [state, queryClient]);

	return (
		<>
			<Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
				<Plus className="size-3" />
				Add Season
			</Button>

			<Modal open={open} onClose={() => setOpen(false)} size="sm">
				<ModalClose onClose={() => setOpen(false)} />
				<ModalHeader className="items-start text-left">
					<ModalTitle>Add Season</ModalTitle>
					<ModalDescription>
						Create a new season for this show.
					</ModalDescription>
				</ModalHeader>
				<form key={formKey} action={formAction}>
					<ModalBody>
						<Input
							id="season-number"
							name="number"
							label="Season Number"
							type="number"
							placeholder="e.g. 1"
							defaultValue={state.data?.number}
						/>
						{state.fieldErrors?.number && (
							<p className="text-xs text-error">
								{state.fieldErrors.number[0]}
							</p>
						)}
						<Input
							id="season-year"
							name="year"
							label="Year of Release"
							type="number"
							placeholder="e.g. 2024"
							defaultValue={state.data?.year}
						/>
						{state.fieldErrors?.year && (
							<p className="text-xs text-error">{state.fieldErrors.year[0]}</p>
						)}
					</ModalBody>
					<ModalFooter className="flex-row justify-end">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button type="submit" variant="primary" disabled={isPending}>
							{isPending ? "Saving..." : "Save"}
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
}

export function AddEpisodeButton({ seasonKey }: { seasonKey: string }) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const [formKey, setFormKey] = useState(0);

	const boundAction = createEpisodeAction.bind(null, seasonKey);
	const [state, formAction, isPending] = useActionState(
		boundAction,
		initialActionState,
	);

	useEffect(() => {
		if (state.success) {
			queryClient.invalidateQueries({ queryKey: episodeKeys.all });
			setOpen(false);
			setFormKey((k) => k + 1);
		}
	}, [state, queryClient]);

	return (
		<>
			<Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
				<Plus className="size-3" />
				Add Episode
			</Button>

			<Modal open={open} onClose={() => setOpen(false)} size="md">
				<ModalClose onClose={() => setOpen(false)} />
				<ModalHeader className="items-start text-left">
					<ModalTitle>Add Episode</ModalTitle>
					<ModalDescription>Add a new episode to this season.</ModalDescription>
				</ModalHeader>
				<form key={formKey} action={formAction}>
					<ModalBody>
						<Input
							id="episode-number"
							name="episodeNumber"
							label="Episode Number"
							type="number"
							placeholder="e.g. 1"
							defaultValue={state.data?.episodeNumber}
						/>
						{state.fieldErrors?.episodeNumber && (
							<p className="text-xs text-error">
								{state.fieldErrors.episodeNumber[0]}
							</p>
						)}
						<Input
							id="episode-title"
							name="title"
							label="Title"
							placeholder="e.g. The Beginning"
							defaultValue={state.data?.title}
						/>
						{state.fieldErrors?.title && (
							<p className="text-xs text-error">{state.fieldErrors.title[0]}</p>
						)}
						<Input
							id="episode-description"
							name="description"
							label="Description"
							placeholder="Brief episode summary..."
							defaultValue={state.data?.description}
						/>
						<Input
							id="episode-release"
							name="releaseDate"
							label="Release Date"
							type="date"
							defaultValue={state.data?.releaseDate}
						/>
						{state.fieldErrors?.releaseDate && (
							<p className="text-xs text-error">
								{state.fieldErrors.releaseDate[0]}
							</p>
						)}
						<Input
							id="episode-rating"
							name="rating"
							label="Rating (optional)"
							type="number"
							step={0.1}
							placeholder="e.g. 8.5"
							defaultValue={state.data?.rating}
						/>
						{state.fieldErrors?.rating && (
							<p className="text-xs text-error">
								{state.fieldErrors.rating[0]}
							</p>
						)}
					</ModalBody>
					<ModalFooter className="flex-row justify-end">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button type="submit" variant="primary" disabled={isPending}>
							{isPending ? "Saving..." : "Save"}
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
}
