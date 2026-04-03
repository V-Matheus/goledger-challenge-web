"use client";

import { Check, Plus, Tv } from "lucide-react";
import { useState } from "react";
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

interface TvShowOption {
	"@key": string;
	title: string;
	description: string;
	recommendedAge: number;
}

const availableShows: TvShowOption[] = [
	{
		"@key": "tvShows:3",
		title: "Breaking Bad",
		description:
			"A high school chemistry teacher turned methamphetamine manufacturer.",
		recommendedAge: 16,
	},
	{
		"@key": "tvShows:4",
		title: "GoLedger Labs",
		description: "Documentary series showcasing blockchain innovations.",
		recommendedAge: 0,
	},
];

export function AddShowButton({ existingKeys }: { existingKeys: string[] }) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<Set<string>>(new Set());

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

	function handleSave() {
		setOpen(false);
		setSelected(new Set());
	}

	const filteredShows = availableShows.filter(
		(s) => !existingKeys.includes(s["@key"]),
	);

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
				<ModalBody>
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
										className="flex cursor-pointer items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-surface-container data-[selected]:bg-primary/10"
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
				<ModalFooter className="flex-row justify-end">
					<Button variant="ghost" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						variant="primary"
						disabled={selected.size === 0}
						onClick={handleSave}
					>
						Add {selected.size > 0 ? `(${selected.size})` : ""}
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}
