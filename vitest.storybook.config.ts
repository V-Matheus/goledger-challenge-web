import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		react(),
		storybookTest({
			configDir: path.join(dirname, ".storybook"),
		}),
	],
	optimizeDeps: {
		include: ["lucide-react", "@storybook/addon-docs"],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
	test: {
		name: "storybook",
		browser: {
			enabled: true,
			headless: true,
			provider: playwright({}),
			instances: [
				{
					browser: "chromium",
				},
			],
		},
	},
});
