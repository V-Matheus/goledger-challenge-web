"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
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
import { tvShowKeys } from "@/lib/queries/tv-shows";
import { initialActionState } from "@/lib/schemas/action-state";
import type { TvShow } from "@/lib/types";
import { deleteTvShowAction, updateTvShowAction } from "../actions";

function getInitials(title: string) {
	return title
		.split(" ")
		.slice(0, 2)
		.map((w) => w[0])
		.join("")
		.toUpperCase();
}

function formatTimeAgo(dateStr: string) {
	const diff = Date.now() - new Date(dateStr).getTime();
	const hours = Math.floor(diff / (1000 * 60 * 60));
	if (hours < 1) return "Added just now";
	if (hours < 24) return `Added ${hours}h ago`;
	const days = Math.floor(hours / 24);
	return `Added ${days}d ago`;
}

export function TvShowGrid({ items }: { items: TvShow[] }) {
	const queryClient = useQueryClient();
	const [deleteTarget, setDeleteTarget] = useState<TvShow | null>(null);
	const [editTarget, setEditTarget] = useState<TvShow | null>(null);
	const [editFormKey, setEditFormKey] = useState(0);

	const boundDeleteAction = deleteTvShowAction.bind(
		null,
		deleteTarget?.["@key"] ?? "",
	);
	const [deleteState, deleteAction, isDeleting] = useActionState(
		boundDeleteAction,
		initialActionState,
	);

	const boundEditAction = updateTvShowAction.bind(
		null,
		editTarget?.title ?? "",
	);
	const [editState, editAction, isEditing] = useActionState(
		boundEditAction,
		initialActionState,
	);

	useEffect(() => {
		if (deleteState.success) {
			queryClient.invalidateQueries({ queryKey: tvShowKeys.all });
			setDeleteTarget(null);
		}
	}, [deleteState, queryClient]);

	useEffect(() => {
		if (editState.success) {
			queryClient.invalidateQueries({ queryKey: tvShowKeys.all });
			setEditTarget(null);
			setEditFormKey((k) => k + 1);
		}
	}, [editState, queryClient]);

	return (
		<>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{items.map((show) => (
					<div
						key={show["@key"]}
						className="group relative flex flex-col overflow-hidden rounded-xl bg-surface-container-high transition-colors hover:bg-surface-container-highest"
					>
						<Link
							href={`/tv-shows/${encodeURIComponent(show["@key"])}`}
							className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary-dim/30 to-primary/10"
						>
							<span className="text-5xl font-bold text-on-surface/10 select-none">
								{getInitials(show.title)}
							</span>
							<div className="absolute right-3 top-3">
								<Badge>{show.recommendedAge}+</Badge>
							</div>
						</Link>

						<div className="flex flex-col gap-2 p-4">
							<Link
								href={`/tv-shows/${encodeURIComponent(show["@key"])}`}
								className="truncate text-sm font-semibold text-on-surface"
							>
								{show.title}
							</Link>
							<p className="line-clamp-2 text-xs leading-relaxed text-on-surface-variant">
								{show.description}
							</p>

							<div className="flex items-center justify-between pt-1">
								{show["@lastUpdated"] && (
									<span
										suppressHydrationWarning
										className="text-[10px] font-medium uppercase tracking-wider text-on-surface-variant"
									>
										{formatTimeAgo(show["@lastUpdated"])}
									</span>
								)}
								<div className="ml-auto flex items-center gap-1">
									<button
										type="button"
										aria-label={`Edit ${show.title}`}
										onClick={() => setEditTarget(show)}
										className="flex size-6 cursor-pointer items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
									>
										<Pencil className="size-3.5" />
									</button>
									<button
										type="button"
										aria-label={`Delete ${show.title}`}
										onClick={() => setDeleteTarget(show)}
										className="flex size-6 cursor-pointer items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-error/10 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
									>
										<Trash2 className="size-3.5" />
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Edit TV Show Modal */}
			<Modal
				open={editTarget !== null}
				onClose={() => setEditTarget(null)}
				size="md"
			>
				<ModalClose onClose={() => setEditTarget(null)} />
				<ModalHeader className="items-start text-left">
					<ModalTitle>Edit TV Show</ModalTitle>
					<ModalDescription>
						Update the details for &ldquo;{editTarget?.title}&rdquo;.
					</ModalDescription>
				</ModalHeader>
				<form key={editFormKey} action={editAction}>
					<ModalBody>
						<Textarea
							id="edit-show-description"
							name="description"
							label="Description"
							defaultValue={
								editState.data?.description ?? editTarget?.description
							}
						/>
						<Input
							id="edit-show-age"
							name="recommendedAge"
							label="Recommended Age"
							type="number"
							defaultValue={
								editState.data?.recommendedAge ?? editTarget?.recommendedAge
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

			{/* Delete TV Show Modal */}
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
						This action cannot be undone. All seasons and episodes associated
						with this show will also be removed.
					</ModalDescription>
				</ModalHeader>
				<form action={deleteAction}>
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
