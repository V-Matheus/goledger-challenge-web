import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface PaginationProps extends ComponentProps<"div"> {
	total: number;
	pageSize: number;
	currentPage: number;
	hasNextPage: boolean;
	onPreviousPage: () => void;
	onNextPage: () => void;
}

export function Pagination({
	className,
	total,
	pageSize,
	currentPage,
	hasNextPage,
	onPreviousPage,
	onNextPage,
	...props
}: PaginationProps) {
	const start = (currentPage - 1) * pageSize + 1;
	const end = Math.min(currentPage * pageSize, total);
	const hasPreviousPage = currentPage > 1;

	return (
		<div
			data-slot="pagination"
			className={twMerge("flex items-center justify-between", className)}
			{...props}
		>
			<span className="text-xs text-on-surface-variant">
				Showing {start}-{end} of {total} results
			</span>

			<div className="flex items-center gap-1">
				<button
					type="button"
					onClick={onPreviousPage}
					disabled={!hasPreviousPage}
					aria-label="Previous page"
					className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-40"
				>
					<ChevronLeft className="size-4" />
				</button>
				<span className="min-w-8 text-center text-xs font-medium text-on-surface">
					{currentPage}
				</span>
				<button
					type="button"
					onClick={onNextPage}
					disabled={!hasNextPage}
					aria-label="Next page"
					className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-40"
				>
					<ChevronRight className="size-4" />
				</button>
			</div>
		</div>
	);
}
