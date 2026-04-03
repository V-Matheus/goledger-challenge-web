import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
		include: ["tests/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
		exclude: ["tests/e2e/**", "node_modules"],
		css: true,
		coverage: {
			reportsDirectory: "./tests/results/coverage",
		},
	},
});
