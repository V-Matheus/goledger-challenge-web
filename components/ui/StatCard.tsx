import type {
	ComponentProps,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
	SVGAttributes,
} from "react";

type IconComponent = ForwardRefExoticComponent<
	Omit<SVGAttributes<SVGSVGElement> & { className?: string }, "ref"> &
		RefAttributes<SVGSVGElement>
>;

import { twMerge } from "tailwind-merge";

export interface StatCardProps extends ComponentProps<"div"> {
	label: string;
	value: string | number;
	icon?: IconComponent;
	detail?: ReactNode;
}

export function StatCard({
	className,
	label,
	value,
	icon: Icon,
	detail,
	...props
}: StatCardProps) {
	return (
		<div
			data-slot="stat-card"
			className={twMerge(
				"flex flex-1 flex-col gap-1 rounded-xl bg-surface-container-high p-5",
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-between">
				<span className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
					{label}
				</span>
				{Icon && (
					<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
						<Icon className="size-4 text-primary-text" />
					</div>
				)}
			</div>
			<span className="text-3xl font-bold text-on-surface">{value}</span>
			{detail && (
				<span className="text-xs text-on-surface-variant">{detail}</span>
			)}
		</div>
	);
}
