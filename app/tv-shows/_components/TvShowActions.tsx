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
import { Textarea } from "@/components/ui/Textarea";
import { tvShowKeys } from "@/lib/queries/tv-shows";
import { initialActionState } from "@/lib/schemas/action-state";
import { createTvShowAction } from "../actions";

export function TvShowActions() {
	const queryClient = useQueryClient();
	const [createOpen, setCreateOpen] = useState(false);
	const [formKey, setFormKey] = useState(0);
	const [state, formAction, isPending] = useActionState(
		createTvShowAction,
		initialActionState,
	);

	useEffect(() => {
		if (state.success) {
			queryClient.invalidateQueries({ queryKey: tvShowKeys.all });
			setCreateOpen(false);
			setFormKey((k) => k + 1);
		}
	}, [state, queryClient]);

	return (
		<>
			<Button variant="primary" size="md" onClick={() => setCreateOpen(true)}>
				<Plus className="size-3.5" />
				New Show
			</Button>

			<Modal open={createOpen} onClose={() => setCreateOpen(false)} size="md">
				<ModalClose onClose={() => setCreateOpen(false)} />
				<ModalHeader className="items-start text-left">
					<ModalTitle>Add New TV Show</ModalTitle>
					<ModalDescription>
						Fill in the details to expand the gallery.
					</ModalDescription>
				</ModalHeader>
				<form key={formKey} action={formAction}>
					<ModalBody>
						<Input
							id="show-title"
							name="title"
							label="Title"
							placeholder="e.g. Midnight Horizon"
							defaultValue={state.data?.title}
						/>
						{state.fieldErrors?.title && (
							<p className="text-xs text-error">{state.fieldErrors.title[0]}</p>
						)}
						<Textarea
							id="show-description"
							name="description"
							label="Description"
							placeholder="Briefly describe the series plot and mood..."
							defaultValue={state.data?.description}
						/>
						{state.fieldErrors?.description && (
							<p className="text-xs text-error">
								{state.fieldErrors.description[0]}
							</p>
						)}
						<Input
							id="show-age"
							name="recommendedAge"
							label="Recommended Age"
							type="number"
							placeholder="e.g. 16"
							defaultValue={state.data?.recommendedAge}
						/>
						{state.fieldErrors?.recommendedAge && (
							<p className="text-xs text-error">
								{state.fieldErrors.recommendedAge[0]}
							</p>
						)}
					</ModalBody>
					<ModalFooter className="flex-row justify-end">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setCreateOpen(false)}
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
