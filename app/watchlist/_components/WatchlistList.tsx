"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
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
import { watchlistKeys } from "@/lib/queries/watchlist";
import { initialActionState } from "@/lib/schemas/action-state";
import type { Watchlist } from "@/lib/types";
import { deleteWatchlistAction, updateWatchlistAction } from "../actions";
import { WatchlistRow } from "./WatchlistRow";

export function WatchlistList({ items }: { items: Watchlist[] }) {
	const queryClient = useQueryClient();
	const [deleteTarget, setDeleteTarget] = useState<Watchlist | null>(null);
	const [editTarget, setEditTarget] = useState<Watchlist | null>(null);
	const [editFormKey, setEditFormKey] = useState(0);

	const boundDelete = deleteWatchlistAction.bind(
		null,
		deleteTarget?.["@key"] ?? "",
	);
	const [deleteState, deleteFormAction, isDeleting] = useActionState(
		boundDelete,
		initialActionState,
	);

	const existingTvShowKeys =
		editTarget?.tvShows?.map((ref) => ref["@key"]) ?? [];
	const boundEdit = updateWatchlistAction.bind(null, existingTvShowKeys);
	const [editState, editFormAction, isEditing] = useActionState(
		boundEdit,
		initialActionState,
	);

	useEffect(() => {
		if (deleteState.success) {
			queryClient.invalidateQueries({ queryKey: watchlistKeys.all });
			setDeleteTarget(null);
		}
	}, [deleteState, queryClient]);

	useEffect(() => {
		if (editState.success) {
			queryClient.invalidateQueries({ queryKey: watchlistKeys.all });
			setEditTarget(null);
			setEditFormKey((k) => k + 1);
		}
	}, [editState, queryClient]);

	return (
		<>
			<div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-2">
				{items.map((item) => (
					<WatchlistRow
						key={item["@key"]}
						title={item.title}
						description={item.description}
						tvShowCount={item.tvShows?.length}
						lastUpdated={item["@lastUpdated"]}
						href={`/watchlist/${encodeURIComponent(item["@key"])}`}
						onEdit={() => setEditTarget(item)}
						onDelete={() => setDeleteTarget(item)}
					/>
				))}
			</div>

			{/* Edit Watchlist Modal */}
			<Modal
				open={editTarget !== null}
				onClose={() => setEditTarget(null)}
				size="md"
			>
				<ModalClose onClose={() => setEditTarget(null)} />
				<ModalHeader className="items-start text-left">
					<ModalTitle>Edit Watchlist</ModalTitle>
					<ModalDescription>
						Update the details for &ldquo;{editTarget?.title}&rdquo;.
					</ModalDescription>
				</ModalHeader>
				<form key={editFormKey} action={editFormAction}>
					<ModalBody>
						<Input
							id="edit-watchlist-title"
							name="title"
							label="Title"
							defaultValue={editState.data?.title ?? editTarget?.title}
						/>
						<Textarea
							id="edit-watchlist-description"
							name="description"
							label="Description"
							defaultValue={
								editState.data?.description ?? editTarget?.description
							}
						/>
					</ModalBody>
					<ModalFooter className="flex-row justify-end">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setEditTarget(null)}
						>
							Cancel
						</Button>
						<Button type="submit" variant="primary" disabled={isEditing}>
							{isEditing ? "Saving..." : "Save Changes"}
						</Button>
					</ModalFooter>
				</form>
			</Modal>

			{/* Delete Watchlist Modal */}
			<Modal
				open={deleteTarget !== null}
				onClose={() => setDeleteTarget(null)}
				size="sm"
			>
				<ModalHeader>
					<ModalIcon className="bg-error/10 text-error">
						<Trash2 />
					</ModalIcon>
					<ModalTitle>Delete &ldquo;{deleteTarget?.title}&rdquo;?</ModalTitle>
					<ModalDescription>
						This action cannot be undone. The watchlist and all its linked shows
						will be permanently removed.
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
							onClick={() => setDeleteTarget(null)}
						>
							Cancel
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
}
