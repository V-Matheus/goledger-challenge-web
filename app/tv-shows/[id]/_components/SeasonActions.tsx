"use client";

import { Plus } from "lucide-react";
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
	ModalTitle,
} from "@/components/ui/Modal";

export function AddSeasonButton() {
	const [open, setOpen] = useState(false);

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
				<ModalBody>
					<Input
						id="season-number"
						label="Season Number"
						type="number"
						min={1}
						placeholder="e.g. 1"
					/>
					<Input
						id="season-year"
						label="Year of Release"
						type="number"
						placeholder="e.g. 2024"
					/>
				</ModalBody>
				<ModalFooter className="flex-row justify-end">
					<Button variant="ghost" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button variant="primary">Save</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}

export function AddEpisodeButton() {
	const [open, setOpen] = useState(false);

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
				<ModalBody>
					<Input
						id="episode-number"
						label="Episode Number"
						type="number"
						min={1}
						placeholder="e.g. 1"
					/>
					<Input
						id="episode-title"
						label="Title"
						placeholder="e.g. The Beginning"
					/>
					<Input
						id="episode-description"
						label="Description"
						placeholder="Brief episode summary..."
					/>
					<Input id="episode-release" label="Release Date" type="date" />
					<Input
						id="episode-rating"
						label="Rating (optional)"
						type="number"
						min={0}
						max={10}
						step={0.1}
						placeholder="e.g. 8.5"
					/>
				</ModalBody>
				<ModalFooter className="flex-row justify-end">
					<Button variant="ghost" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button variant="primary">Save</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
