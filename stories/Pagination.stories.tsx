import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Pagination } from "@/components/ui/Pagination";

const meta = {
	title: "UI/Pagination",
	component: Pagination,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: 480 }}>
				<Story />
			</div>
		),
	],
	args: {
		onPreviousPage: fn(),
		onNextPage: fn(),
	},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
	args: {
		total: 25,
		pageSize: 10,
		currentPage: 1,
		hasNextPage: true,
	},
};

export const MiddlePage: Story = {
	args: {
		total: 25,
		pageSize: 10,
		currentPage: 2,
		hasNextPage: true,
	},
};

export const LastPage: Story = {
	args: {
		total: 25,
		pageSize: 10,
		currentPage: 3,
		hasNextPage: false,
	},
};

export const SinglePage: Story = {
	args: {
		total: 5,
		pageSize: 10,
		currentPage: 1,
		hasNextPage: false,
	},
};
