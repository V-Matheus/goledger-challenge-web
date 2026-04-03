import Image from "next/image";
import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

export const avatarVariants = tv({
	base: "inline-flex items-center justify-center rounded-full bg-primary font-semibold text-on-primary-fixed shrink-0",
	variants: {
		size: {
			sm: "size-7 text-xs",
			md: "size-9 text-sm",
			lg: "size-11 text-base",
		},
	},
	defaultVariants: { size: "md" },
});

export interface AvatarProps
	extends ComponentProps<"span">,
		VariantProps<typeof avatarVariants> {
	src?: string;
	alt?: string;
	initials?: string;
}

export function Avatar({
	className,
	size,
	src,
	alt,
	initials,
	...props
}: AvatarProps) {
	return (
		<span
			data-slot="avatar"
			className={twMerge(avatarVariants({ size }), className)}
			{...props}
		>
			{src ? (
				<Image
					src={src}
					alt={alt ?? ""}
					className="size-full rounded-full object-cover"
				/>
			) : (
				(initials ?? "?")
			)}
		</span>
	);
}
