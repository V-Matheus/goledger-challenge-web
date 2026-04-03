"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
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
	ModalIcon,
	ModalTitle,
} from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { useWatchlists, watchlistKeys } from "@/lib/queries/watchlist";
import { initialActionState } from "@/lib/schemas/action-state";
import { createWatchlistAction, deleteWatchlistAction } from "../actions";

export function WatchlistActions() {
	const queryClient = useQueryClient();
	const { data } = useWatchlists();
	const watchlists = data?.result ?? [];

	const [createOpen, setCreateOpen] = useState(false);
	const [formKey, setFormKey] = useState(0);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deletingIndex, setDeletingIndex] = useState(0);

	const [createState, createFormAction, isCreating] = useActionState(
		createWatchlistAction,
		initialActionState,
	);

	// Delete all: sequentially delete each watchlist
	const currentKey = watchlists[deletingIndex]?.["@key"] ?? "";
	const boundDelete = deleteWatchlistAction.bind(null, currentKey);
	const [deleteState, deleteFormAction, isDeleting] = useActionState(
		boundDelete,
		initialActionState,
	);

	useEffect(() => {
		if (createState.success) {
			queryClient.invalidateQueries({ queryKey: watchlistKeys.all });
			setCreateOpen(false);
			setFormKey((k) => k + 1);
		}
	}, [createState, queryClient]);

	useEffect(() => {
		if (deleteState.success) {
			if (deletingIndex < watchlists.length - 1) {
				setDeletingIndex((i) => i + 1);
			} else {
				queryClient.invalidateQueries({ queryKey: watchlistKeys.all });
				setDeleteOpen(false);
				setDeletingIndex(0);
			}
		}
	}, [deleteState, deletingIndex, watchlists.length, queryClient]);

	return (
		<>
			<div className="flex items-center gap-3">
				<Button variant="ghost" size="sm" onClick={() => setDeleteOpen(true)}>
					<Trash2 className="size-3" />
					Clear All
				</Button>
				<Button variant="primary" size="md" onClick={() => setCreateOpen(true)}>
					<Plus className="size-3.5" />
					New Watchlist
				</Button>
			</div>

			{/* Create Modal */}
			<Modal open={createOpen} onClose={() => setCreateOpen(false)} size="md">
				<ModalClose onClose={() => setCreateOpen(false)} />
				<ModalHeader className="items-start text-left">
					<ModalTitle>New Watchlist</ModalTitle>
					<ModalDescription>
						Create a new collection to organize your favorite shows.
					</ModalDescription>
				</ModalHeader>
				<form key={formKey} action={createFormAction}>
					<ModalBody>
						<Input
							id="watchlist-title"
							name="title"
							label="Title"
							placeholder="e.g. Weekend Binge"
							defaultValue={createState.data?.title}
						/>
						{createState.fieldErrors?.title && (
							<p className="text-xs text-error">
								{createState.fieldErrors.title[0]}
							</p>
						)}
						<Textarea
							id="watchlist-description"
							name="description"
							label="Description"
							placeholder="Briefly describe this watchlist..."
							defaultValue={createState.data?.description}
						/>
					</ModalBody>
					<ModalFooter className="flex-row justify-end">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setCreateOpen(false)}
						>
							Cancel
						</Button>
						<Button type="submit" variant="primary" disabled={isCreating}>
							{isCreating ? "Saving..." : "Save"}
						</Button>
					</ModalFooter>
				</form>
			</Modal>

			{/* Delete Confirmation Modal */}
			<Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} size="sm">
				<ModalHeader>
					<ModalIcon className="bg-error/10 text-error">
						<Trash2 />
					</ModalIcon>
					<ModalTitle>
						Are you sure you want to clear all watchlists?
					</ModalTitle>
					<ModalDescription>
						This action cannot be undone. All your watchlists and their linked
						shows will be permanently removed.
					</ModalDescription>
				</ModalHeader>
				<form action={deleteFormAction}>
					<ModalFooter>
						<Button
							type="submit"
							variant="destructive"
							className="w-full"
							disabled={isDeleting}
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</Button>
						<Button
							type="button"
							variant="ghost"
							className="w-full"
							onClick={() => setDeleteOpen(false)}
						>
							Cancel
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
}
