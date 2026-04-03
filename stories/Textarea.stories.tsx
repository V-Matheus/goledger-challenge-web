import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "@/components/ui/Textarea";

const meta = {
	title: "UI/Textarea",
	component: Textarea,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: 320 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: "Write something..." },
};

export const WithLabel: Story = {
	args: {
		label: "Description",
		id: "desc",
		placeholder: "Briefly describe the series...",
	},
};
