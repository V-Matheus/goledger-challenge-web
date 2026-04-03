"use client";

import { Plus, Trash2 } from "lucide-react";
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

export function WatchlistActions() {
	const [createOpen, setCreateOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

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
				<ModalBody>
					<Input
						id="watchlist-title"
						label="Title"
						placeholder="e.g. Weekend Binge"
					/>
					<Textarea
						id="watchlist-description"
						label="Description"
						placeholder="Briefly describe this watchlist..."
					/>
				</ModalBody>
				<ModalFooter className="flex-row justify-end">
					<Button variant="ghost" onClick={() => setCreateOpen(false)}>
						Cancel
					</Button>
					<Button variant="primary">Save</Button>
				</ModalFooter>
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
				<ModalFooter>
					<Button variant="destructive" className="w-full">
						Delete
					</Button>
					<Button
						variant="ghost"
						className="w-full"
						onClick={() => setDeleteOpen(false)}
					>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
