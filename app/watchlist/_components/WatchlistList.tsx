"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
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
import { WatchlistRow } from "./WatchlistRow";

interface WatchlistData {
	key: string;
	title: string;
	description?: string;
	tvShowCount?: number;
	lastUpdated?: string;
}

export function WatchlistList({ items }: { items: WatchlistData[] }) {
	const [deleteTarget, setDeleteTarget] = useState<WatchlistData | null>(null);
	const [editTarget, setEditTarget] = useState<WatchlistData | null>(null);

	function handleConfirmDelete() {
		if (!deleteTarget) return;
		setDeleteTarget(null);
	}

	function handleConfirmEdit() {
		if (!editTarget) return;
		setEditTarget(null);
	}

	return (
		<>
			<div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-2">
				{items.map((item) => (
					<WatchlistRow
						key={item.key}
						title={item.title}
						description={item.description}
						tvShowCount={item.tvShowCount}
						lastUpdated={item.lastUpdated}
						href={`/watchlist/${encodeURIComponent(item.key)}`}
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
				<ModalBody>
					<Input
						id="edit-watchlist-title"
						label="Title"
						defaultValue={editTarget?.title}
					/>
					<Textarea
						id="edit-watchlist-description"
						label="Description"
						defaultValue={editTarget?.description}
					/>
				</ModalBody>
				<ModalFooter className="flex-row justify-end">
					<Button variant="ghost" onClick={() => setEditTarget(null)}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleConfirmEdit}>
						Save Changes
					</Button>
				</ModalFooter>
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
				<ModalFooter>
					<Button
						variant="destructive"
						className="w-full"
						onClick={handleConfirmDelete}
					>
						Delete
					</Button>
					<Button
						variant="ghost"
						className="w-full"
						onClick={() => setDeleteTarget(null)}
					>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
