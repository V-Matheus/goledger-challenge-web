import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const meta = {
	title: "UI/Card",
	component: Card,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Card className="w-80">
			<CardHeader>
				<CardTitle>Card Title</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-on-surface-variant">
					This is the card content area.
				</p>
			</CardContent>
		</Card>
	),
};
