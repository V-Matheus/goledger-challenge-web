import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bookmark, Tv } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

const meta = {
	title: "UI/StatCard",
	component: StatCard,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: 240 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: "Total TV Shows", value: 128 },
};

export const WithIcon: Story = {
	args: { label: "Total TV Shows", value: 128, icon: Tv },
};

export const WithDetail: Story = {
	args: {
		label: "Watchlists",
		value: 14,
		icon: Bookmark,
		detail: <span>Jump back in →</span>,
	},
};

export const StringValue: Story = {
	args: { label: "Episodes", value: "3,240" },
};
