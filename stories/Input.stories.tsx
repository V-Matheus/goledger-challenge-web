import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "@/components/ui/Input";

const meta = {
	title: "UI/Input",
	component: Input,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: 320 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: "Enter text..." },
};

export const WithLabel: Story = {
	args: { label: "Title", id: "title", placeholder: "e.g. Breaking Bad" },
};

export const NumberInput: Story = {
	args: { label: "Age", id: "age", type: "number", placeholder: "e.g. 16" },
};
