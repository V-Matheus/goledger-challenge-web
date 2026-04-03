import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchInput } from "@/components/ui/SearchInput";

const meta = {
	title: "UI/SearchInput",
	component: SearchInput,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: 400 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: "Search for shows, episodes, or curators..." },
};
