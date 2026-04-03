"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

interface TvShowData {
	key: string;
	title: string;
	description: string;
	recommendedAge: number;
	lastUpdated?: string;
}

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

export function TvShowGrid({ items }: { items: TvShowData[] }) {
	const [deleteTarget, setDeleteTarget] = useState<TvShowData | null>(null);
	const [editTarget, setEditTarget] = useState<TvShowData | null>(null);

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
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{items.map((show) => (
					<div
						key={show.key}
						className="group relative flex flex-col overflow-hidden rounded-xl bg-surface-container-high transition-colors hover:bg-surface-container-highest"
					>
						<Link
							href={`/tv-shows/${encodeURIComponent(show.key)}`}
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
								href={`/tv-shows/${encodeURIComponent(show.key)}`}
								className="truncate text-sm font-semibold text-on-surface"
							>
								{show.title}
							</Link>
							<p className="line-clamp-2 text-xs leading-relaxed text-on-surface-variant">
								{show.description}
							</p>

							<div className="flex items-center justify-between pt-1">
								{show.lastUpdated && (
									<span className="text-[10px] font-medium uppercase tracking-wider text-on-surface-variant">
										{formatTimeAgo(show.lastUpdated)}
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
				<ModalBody>
					<Input
						id="edit-show-title"
						label="Title"
						defaultValue={editTarget?.title}
					/>
					<Textarea
						id="edit-show-description"
						label="Description"
						defaultValue={editTarget?.description}
					/>
					<Input
						id="edit-show-age"
						label="Recommended Age"
						type="number"
						min={0}
						defaultValue={editTarget?.recommendedAge}
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
