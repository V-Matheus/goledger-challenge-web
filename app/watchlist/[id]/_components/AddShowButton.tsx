"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Check, Plus, Tv } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
	Modal,
	ModalBody,
	ModalClose,
	ModalDescription,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from "@/components/ui/Modal";
import { watchlistKeys } from "@/lib/queries/watchlist";
import { initialActionState } from "@/lib/schemas/action-state";
import type { TvShow, Watchlist } from "@/lib/types";
import { updateWatchlistShowsAction } from "../../actions";

interface AddShowButtonProps {
	watchlistKey: string;
	watchlist: Watchlist;
	allShows: TvShow[];
}

export function AddShowButton({
	watchlistKey,
	watchlist,
	allShows,
}: AddShowButtonProps) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<Set<string>>(new Set());

	const existingKeys = watchlist.tvShows?.map((ref) => ref["@key"]) ?? [];
	const existingSet = new Set(existingKeys);

	const allTvShowKeys = [...existingKeys, ...selected];
	const boundUpdate = updateWatchlistShowsAction.bind(
		null,
		watchlist.title,
		watchlist.description,
		allTvShowKeys,
	);
	const [state, formAction, isPending] = useActionState(
		boundUpdate,
		initialActionState,
	);

	useEffect(() => {
		if (state.success) {
			queryClient.invalidateQueries({
				queryKey: watchlistKeys.detail(watchlistKey),
			});
			setOpen(false);
			setSelected(new Set());
		}
	}, [state, queryClient, watchlistKey]);

	function toggleSelect(key: string) {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(key)) {
				next.delete(key);
			} else {
				next.add(key);
			}
			return next;
		});
	}

	const filteredShows = allShows.filter((s) => !existingSet.has(s["@key"]));

	return (
		<>
			<Button variant="primary" size="md" onClick={() => setOpen(true)}>
				<Plus className="size-3.5" />
				Add Show
			</Button>

			<Modal open={open} onClose={() => setOpen(false)} size="md">
				<ModalClose onClose={() => setOpen(false)} />
				<ModalHeader className="items-start text-left">
					<ModalTitle>Add Shows to Watchlist</ModalTitle>
					<ModalDescription>
						Select the TV shows you want to add.
					</ModalDescription>
				</ModalHeader>
				<ModalBody className="max-h-80 overflow-y-auto">
					{filteredShows.length === 0 ? (
						<p className="py-4 text-center text-sm text-on-surface-variant">
							All available shows are already in this watchlist.
						</p>
					) : (
						<div className="flex flex-col gap-2">
							{filteredShows.map((show) => {
								const isSelected = selected.has(show["@key"]);
								return (
									<button
										type="button"
										key={show["@key"]}
										onClick={() => toggleSelect(show["@key"])}
										data-selected={isSelected ? "" : undefined}
										className="flex cursor-pointer items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-surface-container data-selected:bg-primary/10"
									>
										<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-container">
											<Tv className="size-4 text-on-surface-variant/40" />
										</div>
										<div className="flex min-w-0 flex-1 flex-col gap-0.5">
											<span className="truncate text-sm font-medium text-on-surface">
												{show.title}
											</span>
											<span className="truncate text-xs text-on-surface-variant">
												{show.description}
											</span>
										</div>
										<div className="flex items-center gap-2">
											<Badge>{show.recommendedAge}+</Badge>
											{isSelected && (
												<Check className="size-4 text-primary-text" />
											)}
										</div>
									</button>
								);
							})}
						</div>
					)}
				</ModalBody>
				<form action={formAction}>
					<ModalFooter className="flex-row justify-end">
						<Button
							type="button"
							variant="ghost"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="primary"
							disabled={selected.size === 0 || isPending}
						>
							{isPending
								? "Adding..."
								: `Add ${selected.size > 0 ? `(${selected.size})` : ""}`}
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</>
	);
}
