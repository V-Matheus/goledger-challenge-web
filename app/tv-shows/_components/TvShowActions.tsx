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
import { Textarea } from "@/components/ui/Textarea";

export function TvShowActions() {
	const [createOpen, setCreateOpen] = useState(false);

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
				<ModalBody>
					<Input
						id="show-title"
						label="Title"
						placeholder="e.g. Midnight Horizon"
					/>
					<Textarea
						id="show-description"
						label="Description"
						placeholder="Briefly describe the series plot and mood..."
					/>
					<Input
						id="show-age"
						label="Recommended Age"
						type="number"
						min={0}
						placeholder="e.g. 16"
					/>
				</ModalBody>
				<ModalFooter className="flex-row justify-end">
					<Button variant="ghost" onClick={() => setCreateOpen(false)}>
						Cancel
					</Button>
					<Button variant="primary">Save</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
