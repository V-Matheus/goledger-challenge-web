import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@/components/ui/Avatar";

const meta = {
	title: "UI/Avatar",
	component: Avatar,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
	args: { initials: "JD" },
};

export const Small: Story = {
	args: { initials: "A", size: "sm" },
};

export const Large: Story = {
	args: { initials: "VT", size: "lg" },
};

export const Fallback: Story = {
	args: {},
};
