import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/Badge";

const meta = {
	title: "UI/Badge",
	component: Badge,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { children: "16+" },
};

export const Success: Story = {
	args: { variant: "success", children: "Active" },
};

export const Warning: Story = {
	args: { variant: "warning", children: "Pending" },
};

export const ErrorVariant: Story = {
	args: { variant: "error", children: "Removed" },
};
