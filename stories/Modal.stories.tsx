import type { Meta, StoryObj } from "@storybook/nextjs-vite";
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

const meta = {
	title: "UI/Modal",
	component: Modal,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteConfirmation: Story = {
	args: { open: false, onClose: () => {} },
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button variant="destructive" onClick={() => setOpen(true)}>
					Delete Show
				</Button>
				<Modal open={open} onClose={() => setOpen(false)} size="sm">
					<ModalHeader>
						<ModalIcon className="bg-error/10 text-error">
							<Trash2 />
						</ModalIcon>
						<ModalTitle>Are you sure you want to delete this show?</ModalTitle>
						<ModalDescription>
							This action cannot be undone. All seasons and episodes will be
							permanently removed.
						</ModalDescription>
					</ModalHeader>
					<ModalFooter>
						<Button
							variant="destructive"
							className="w-full"
							onClick={() => setOpen(false)}
						>
							Delete
						</Button>
						<Button
							variant="ghost"
							className="w-full"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	},
};

export const CreateForm: Story = {
	args: { open: false, onClose: () => {} },
	render: () => {
		const [open, setOpen] = useState(false);
		return (
			<>
				<Button onClick={() => setOpen(true)}>New TV Show</Button>
				<Modal open={open} onClose={() => setOpen(false)} size="md">
					<ModalClose onClose={() => setOpen(false)} />
					<ModalHeader className="items-start text-left">
						<ModalTitle>Add New TV Show</ModalTitle>
						<ModalDescription>
							Fill in the details to expand the gallery.
						</ModalDescription>
					</ModalHeader>
					<ModalBody>
						<Input
							label="Title"
							id="title"
							placeholder="e.g. Midnight Horizon"
						/>
						<Textarea
							label="Description"
							id="desc"
							placeholder="Briefly describe the series..."
						/>
						<Input
							label="Recommended Age"
							id="age"
							type="number"
							placeholder="e.g. 16"
						/>
					</ModalBody>
					<ModalFooter className="flex-row justify-end">
						<Button variant="ghost" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button variant="primary" onClick={() => setOpen(false)}>
							Save
						</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	},
};

export const SmallSize: Story = {
	args: { open: true, onClose: () => {}, size: "sm", children: "Small modal" },
};

export const MediumSize: Story = {
	args: { open: true, onClose: () => {}, size: "md", children: "Medium modal" },
};

export const LargeSize: Story = {
	args: { open: true, onClose: () => {}, size: "lg", children: "Large modal" },
};
