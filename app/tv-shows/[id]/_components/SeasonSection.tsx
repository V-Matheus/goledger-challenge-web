"use client";

import { ChevronDown, ChevronUp, Pencil, Star, Trash2 } from "lucide-react";
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
import { AddEpisodeButton } from "./SeasonActions";

interface EpisodeData {
	key: string;
	episodeNumber: number;
	title: string;
	description: string;
	releaseDate: string;
	rating?: number;
}

interface SeasonSectionProps {
	seasonKey: string;
	number: number;
	year: number;
	episodes: EpisodeData[];
}

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function toInputDate(dateStr: string) {
	return dateStr.split("T")[0];
}

export function SeasonSection({
	seasonKey: _seasonKey,
	number,
	year,
	episodes,
}: SeasonSectionProps) {
	const [expanded, setExpanded] = useState(true);
	const [deleteEpTarget, setDeleteEpTarget] = useState<EpisodeData | null>(
		null,
	);
	const [editEpTarget, setEditEpTarget] = useState<EpisodeData | null>(null);
	const [editSeasonOpen, setEditSeasonOpen] = useState(false);
	const [deleteSeasonOpen, setDeleteSeasonOpen] = useState(false);

	function handleConfirmDeleteEp() {
		if (!deleteEpTarget) return;
		setDeleteEpTarget(null);
	}

	function handleConfirmEditEp() {
		if (!editEpTarget) return;
		setEditEpTarget(null);
	}

	function handleConfirmEditSeason() {
		setEditSeasonOpen(false);
	}

	function handleConfirmDeleteSeason() {
		setDeleteSeasonOpen(false);
	}

	return (
		<div className="flex flex-col rounded-xl bg-surface-container-low">
			{/* Season Header */}
			<div className="flex items-center justify-between p-4">
				<button
					type="button"
					onClick={() => setExpanded(!expanded)}
					className="flex flex-1 cursor-pointer items-center gap-2"
				>
					<div className="flex flex-col gap-0.5 text-left">
						<span className="text-sm font-semibold text-on-surface">
							Season {number}
						</span>
						<span className="text-xs text-on-surface-variant">
							{episodes.length} Episodes • Released {year}
						</span>
					</div>
				</button>
				<div className="flex items-center gap-2">
					<AddEpisodeButton />
					<button
						type="button"
						aria-label={`Edit Season ${number}`}
						onClick={() => setEditSeasonOpen(true)}
						className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
					>
						<Pencil className="size-3.5" />
					</button>
					<button
						type="button"
						aria-label={`Delete Season ${number}`}
						onClick={() => setDeleteSeasonOpen(true)}
						className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error/10 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
					>
						<Trash2 className="size-3.5" />
					</button>
					<button
						type="button"
						aria-label={expanded ? "Collapse season" : "Expand season"}
						onClick={() => setExpanded(!expanded)}
						className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
					>
						{expanded ? (
							<ChevronUp className="size-4" />
						) : (
							<ChevronDown className="size-4" />
						)}
					</button>
				</div>
			</div>

			{/* Episodes Table */}
			{expanded && episodes.length > 0 && (
				<div className="flex flex-col gap-px px-4 pb-4">
					<div className="flex items-center gap-4 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
						<span className="w-8">#</span>
						<span className="flex-1">Title</span>
						<span className="w-24 text-right">Release Date</span>
						<span className="w-16 text-right">Rating</span>
						<span className="w-16 text-right">Actions</span>
					</div>

					{episodes.map((ep) => (
						<div
							key={ep.key}
							className="flex items-center gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-container"
						>
							<span className="w-8 text-xs font-medium text-on-surface-variant">
								{String(ep.episodeNumber).padStart(2, "0")}
							</span>
							<div className="flex min-w-0 flex-1 flex-col gap-0.5">
								<span className="truncate text-sm font-medium text-on-surface">
									{ep.title}
								</span>
								<span className="truncate text-xs text-on-surface-variant">
									{ep.description}
								</span>
							</div>
							<span className="w-24 text-right text-xs text-on-surface-variant">
								{formatDate(ep.releaseDate)}
							</span>
							<span className="flex w-16 items-center justify-end gap-1 text-xs text-on-surface-variant">
								{ep.rating != null && (
									<>
										<Star className="size-3 text-warning" />
										{ep.rating}
									</>
								)}
							</span>
							<div className="flex w-16 items-center justify-end gap-1">
								<button
									type="button"
									aria-label={`Edit ${ep.title}`}
									onClick={() => setEditEpTarget(ep)}
									className="flex size-6 cursor-pointer items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								>
									<Pencil className="size-3" />
								</button>
								<button
									type="button"
									aria-label={`Delete ${ep.title}`}
									onClick={() => setDeleteEpTarget(ep)}
									className="flex size-6 cursor-pointer items-center justify-center rounded-md text-on-surface-variant transition-colors hover:bg-error/10 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								>
									<Trash2 className="size-3" />
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{expanded && episodes.length === 0 && (
				<div className="px-4 pb-4">
					<p className="py-6 text-center text-sm text-on-surface-variant">
						No episodes yet. Add the first one.
					</p>
				</div>
			)}

			{/* Edit Season Modal */}
			<Modal
				open={editSeasonOpen}
				onClose={() => setEditSeasonOpen(false)}
				size="sm"
			>
				<ModalClose onClose={() => setEditSeasonOpen(false)} />
				<ModalHeader className="items-start text-left">
					<ModalTitle>Edit Season {number}</ModalTitle>
					<ModalDescription>Update the release year.</ModalDescription>
				</ModalHeader>
				<ModalBody>
					<Input
						id="edit-season-year"
						label="Year of Release"
						type="number"
						defaultValue={year}
					/>
				</ModalBody>
				<ModalFooter className="flex-row justify-end">
					<Button variant="ghost" onClick={() => setEditSeasonOpen(false)}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleConfirmEditSeason}>
						Save Changes
					</Button>
				</ModalFooter>
			</Modal>

			{/* Delete Season Modal */}
			<Modal
				open={deleteSeasonOpen}
				onClose={() => setDeleteSeasonOpen(false)}
				size="sm"
			>
				<ModalHeader>
					<ModalIcon className="bg-error/10 text-error">
						<Trash2 />
					</ModalIcon>
					<ModalTitle>Delete Season {number}?</ModalTitle>
					<ModalDescription>
						This action cannot be undone. All episodes in this season will also
						be removed.
					</ModalDescription>
				</ModalHeader>
				<ModalFooter>
					<Button
						variant="destructive"
						className="w-full"
						onClick={handleConfirmDeleteSeason}
					>
						Delete
					</Button>
					<Button
						variant="ghost"
						className="w-full"
						onClick={() => setDeleteSeasonOpen(false)}
					>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>

			{/* Edit Episode Modal */}
			<Modal
				open={editEpTarget !== null}
				onClose={() => setEditEpTarget(null)}
				size="md"
			>
				<ModalClose onClose={() => setEditEpTarget(null)} />
				<ModalHeader className="items-start text-left">
					<ModalTitle>Edit Episode</ModalTitle>
					<ModalDescription>
						Update the details for &ldquo;{editEpTarget?.title}&rdquo;.
					</ModalDescription>
				</ModalHeader>
				<ModalBody>
					<Input
						id="edit-episode-title"
						label="Title"
						defaultValue={editEpTarget?.title}
					/>
					<Input
						id="edit-episode-description"
						label="Description"
						defaultValue={editEpTarget?.description}
					/>
					<Input
						id="edit-episode-release"
						label="Release Date"
						type="date"
						defaultValue={
							editEpTarget?.releaseDate
								? toInputDate(editEpTarget.releaseDate)
								: undefined
						}
					/>
					<Input
						id="edit-episode-rating"
						label="Rating (optional)"
						type="number"
						min={0}
						max={10}
						step={0.1}
						defaultValue={editEpTarget?.rating ?? undefined}
					/>
				</ModalBody>
				<ModalFooter className="flex-row justify-end">
					<Button variant="ghost" onClick={() => setEditEpTarget(null)}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleConfirmEditEp}>
						Save Changes
					</Button>
				</ModalFooter>
			</Modal>

			{/* Delete Episode Modal */}
			<Modal
				open={deleteEpTarget !== null}
				onClose={() => setDeleteEpTarget(null)}
				size="sm"
			>
				<ModalHeader>
					<ModalIcon className="bg-error/10 text-error">
						<Trash2 />
					</ModalIcon>
					<ModalTitle>Delete &ldquo;{deleteEpTarget?.title}&rdquo;?</ModalTitle>
					<ModalDescription>
						This episode will be permanently removed.
					</ModalDescription>
				</ModalHeader>
				<ModalFooter>
					<Button
						variant="destructive"
						className="w-full"
						onClick={handleConfirmDeleteEp}
					>
						Delete
					</Button>
					<Button
						variant="ghost"
						className="w-full"
						onClick={() => setDeleteEpTarget(null)}
					>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
