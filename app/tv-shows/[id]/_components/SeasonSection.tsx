"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
	ChevronDown,
	ChevronUp,
	Loader2,
	Pencil,
	Star,
	Trash2,
} from "lucide-react";
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
import { episodeKeys, useEpisodes } from "@/lib/queries/episodes";
import { seasonKeys } from "@/lib/queries/seasons";
import { initialActionState } from "@/lib/schemas/action-state";
import type { Episode, Season } from "@/lib/types";
import {
	deleteEpisodeAction,
	deleteSeasonAction,
	updateEpisodeAction,
	updateSeasonAction,
} from "../../actions";
import { AddEpisodeButton } from "./SeasonActions";

interface SeasonSectionProps {
	season: Season;
	showKey: string;
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

export function SeasonSection({ season, showKey }: SeasonSectionProps) {
	const seasonRef = {
		"@assetType": "seasons" as const,
		"@key": season["@key"],
	};

	const { data: episodesData, isLoading: episodesLoading } =
		useEpisodes(seasonRef);
	const episodes = episodesData?.result ?? [];

	const [expanded, setExpanded] = useState(true);
	const [deleteEpTarget, setDeleteEpTarget] = useState<Episode | null>(null);
	const [editEpTarget, setEditEpTarget] = useState<Episode | null>(null);
	const [editSeasonOpen, setEditSeasonOpen] = useState(false);
	const [deleteSeasonOpen, setDeleteSeasonOpen] = useState(false);

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
							Season {season.number}
						</span>
						<span className="text-xs text-on-surface-variant">
							{episodes.length} Episodes • Released {season.year}
						</span>
					</div>
				</button>
				<div className="flex items-center gap-2">
					<AddEpisodeButton seasonKey={season["@key"]} />
					<button
						type="button"
						aria-label={`Edit Season ${season.number}`}
						onClick={() => setEditSeasonOpen(true)}
						className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
					>
						<Pencil className="size-3.5" />
					</button>
					<button
						type="button"
						aria-label={`Delete Season ${season.number}`}
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
			{expanded && episodesLoading && (
				<div className="flex items-center justify-center px-4 pb-4">
					<Loader2 className="size-4 animate-spin text-primary" />
				</div>
			)}

			{expanded && !episodesLoading && episodes.length > 0 && (
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
							key={ep["@key"]}
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

			{expanded && !episodesLoading && episodes.length === 0 && (
				<div className="px-4 pb-4">
					<p className="py-6 text-center text-sm text-on-surface-variant">
						No episodes yet. Add the first one.
					</p>
				</div>
			)}

			<EditSeasonModal
				open={editSeasonOpen}
				season={season}
				showKey={showKey}
				onClose={() => setEditSeasonOpen(false)}
			/>

			<DeleteSeasonModal
				open={deleteSeasonOpen}
				season={season}
				onClose={() => setDeleteSeasonOpen(false)}
			/>

			<EditEpisodeModal
				episode={editEpTarget}
				seasonKey={season["@key"]}
				onClose={() => setEditEpTarget(null)}
			/>

			<DeleteEpisodeModal
				episode={deleteEpTarget}
				onClose={() => setDeleteEpTarget(null)}
			/>
		</div>
	);
}

function EditSeasonModal({
	open,
	season,
	showKey,
	onClose,
}: {
	open: boolean;
	season: Season;
	showKey: string;
	onClose: () => void;
}) {
	const queryClient = useQueryClient();
	const [formKey, setFormKey] = useState(0);
	const boundAction = updateSeasonAction.bind(null, season.number, showKey);
	const [state, formAction, isPending] = useActionState(
		boundAction,
		initialActionState,
	);

	useEffect(() => {
		if (state.success) {
			queryClient.invalidateQueries({ queryKey: seasonKeys.all });
			onClose();
			setFormKey((k) => k + 1);
		}
	}, [state, queryClient, onClose]);

	return (
		<Modal open={open} onClose={onClose} size="sm">
			<ModalClose onClose={onClose} />
			<ModalHeader className="items-start text-left">
				<ModalTitle>Edit Season {season.number}</ModalTitle>
				<ModalDescription>Update the release year.</ModalDescription>
			</ModalHeader>
			<form key={formKey} action={formAction}>
				<ModalBody>
					<Input
						id="edit-season-year"
						name="year"
						label="Year of Release"
						type="number"
						defaultValue={state.data?.year ?? season.year}
					/>
				</ModalBody>
				<ModalFooter className="flex-row justify-end">
					<Button type="button" variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" variant="primary" disabled={isPending}>
						{isPending ? "Saving..." : "Save Changes"}
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

function DeleteSeasonModal({
	open,
	season,
	onClose,
}: {
	open: boolean;
	season: Season;
	onClose: () => void;
}) {
	const queryClient = useQueryClient();
	const boundAction = deleteSeasonAction.bind(null, season["@key"]);
	const [state, formAction, isPending] = useActionState(
		boundAction,
		initialActionState,
	);

	useEffect(() => {
		if (state.success) {
			queryClient.invalidateQueries({ queryKey: seasonKeys.all });
			onClose();
		}
	}, [state, queryClient, onClose]);

	return (
		<Modal open={open} onClose={onClose} size="sm">
			<ModalHeader>
				<ModalIcon className="bg-error/10 text-error">
					<Trash2 />
				</ModalIcon>
				<ModalTitle>Delete Season {season.number}?</ModalTitle>
				<ModalDescription>
					This action cannot be undone. All episodes in this season will also be
					removed.
				</ModalDescription>
			</ModalHeader>
			<form action={formAction}>
				<ModalFooter>
					<Button
						type="submit"
						variant="destructive"
						className="w-full"
						disabled={isPending}
					>
						{isPending ? "Deleting..." : "Delete"}
					</Button>
					<Button
						type="button"
						variant="ghost"
						className="w-full"
						onClick={onClose}
					>
						Cancel
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

function EditEpisodeModal({
	episode,
	seasonKey,
	onClose,
}: {
	episode: Episode | null;
	seasonKey: string;
	onClose: () => void;
}) {
	const queryClient = useQueryClient();
	const [formKey, setFormKey] = useState(0);
	const boundAction = updateEpisodeAction.bind(
		null,
		episode?.episodeNumber ?? 0,
		seasonKey,
	);
	const [state, formAction, isPending] = useActionState(
		boundAction,
		initialActionState,
	);

	useEffect(() => {
		if (state.success) {
			queryClient.invalidateQueries({ queryKey: episodeKeys.all });
			onClose();
			setFormKey((k) => k + 1);
		}
	}, [state, queryClient, onClose]);

	return (
		<Modal open={episode !== null} onClose={onClose} size="md">
			<ModalClose onClose={onClose} />
			<ModalHeader className="items-start text-left">
				<ModalTitle>Edit Episode</ModalTitle>
				<ModalDescription>
					Update the details for &ldquo;{episode?.title}&rdquo;.
				</ModalDescription>
			</ModalHeader>
			<form key={formKey} action={formAction}>
				<ModalBody>
					<Input
						id="edit-episode-title"
						name="title"
						label="Title"
						defaultValue={state.data?.title ?? episode?.title}
					/>
					<Input
						id="edit-episode-description"
						name="description"
						label="Description"
						defaultValue={state.data?.description ?? episode?.description}
					/>
					<Input
						id="edit-episode-release"
						name="releaseDate"
						label="Release Date"
						type="date"
						defaultValue={
							state.data?.releaseDate ??
							(episode?.releaseDate
								? toInputDate(episode.releaseDate)
								: undefined)
						}
					/>
					<Input
						id="edit-episode-rating"
						name="rating"
						label="Rating (optional)"
						type="number"
						step={0.1}
						defaultValue={state.data?.rating ?? episode?.rating ?? undefined}
					/>
					{state.fieldErrors?.rating && (
						<p className="text-xs text-error">{state.fieldErrors.rating[0]}</p>
					)}
				</ModalBody>
				<ModalFooter className="flex-row justify-end">
					<Button type="button" variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" variant="primary" disabled={isPending}>
						{isPending ? "Saving..." : "Save Changes"}
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

function DeleteEpisodeModal({
	episode,
	onClose,
}: {
	episode: Episode | null;
	onClose: () => void;
}) {
	const queryClient = useQueryClient();
	const boundAction = deleteEpisodeAction.bind(null, episode?.["@key"] ?? "");
	const [state, formAction, isPending] = useActionState(
		boundAction,
		initialActionState,
	);

	useEffect(() => {
		if (state.success) {
			queryClient.invalidateQueries({ queryKey: episodeKeys.all });
			onClose();
		}
	}, [state, queryClient, onClose]);

	return (
		<Modal open={episode !== null} onClose={onClose} size="sm">
			<ModalHeader>
				<ModalIcon className="bg-error/10 text-error">
					<Trash2 />
				</ModalIcon>
				<ModalTitle>Delete &ldquo;{episode?.title}&rdquo;?</ModalTitle>
				<ModalDescription>
					This episode will be permanently removed.
				</ModalDescription>
			</ModalHeader>
			<form action={formAction}>
				<ModalFooter>
					<Button
						type="submit"
						variant="destructive"
						className="w-full"
						disabled={isPending}
					>
						{isPending ? "Deleting..." : "Delete"}
					</Button>
					<Button
						type="button"
						variant="ghost"
						className="w-full"
						onClick={onClose}
					>
						Cancel
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}
