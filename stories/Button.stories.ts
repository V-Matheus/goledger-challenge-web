import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "@/components/ui/Button";

const meta = {
	title: "UI/Button",
	component: Button,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: { variant: "primary", children: "Primary Button" },
};

export const Secondary: Story = {
	args: { variant: "secondary", children: "Secondary Button" },
};

export const Ghost: Story = {
	args: { variant: "ghost", children: "Ghost Button" },
};

export const Destructive: Story = {
	args: { variant: "destructive", children: "Delete" },
};

export const Small: Story = {
	args: { size: "sm", children: "Small" },
};

export const Medium: Story = {
	args: { size: "md", children: "Medium" },
};

export const Large: Story = {
	args: { size: "lg", children: "Large" },
};

export const Disabled: Story = {
	args: { disabled: true, children: "Disabled" },
};
