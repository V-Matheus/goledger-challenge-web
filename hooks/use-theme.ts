"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

export function useTheme() {
	const [theme, setThemeState] = useState<Theme | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
		if (stored) {
			setThemeState(stored);
			return;
		}
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		setThemeState(prefersDark ? "dark" : "light");
	}, []);

	useEffect(() => {
		if (!theme) return;
		document.documentElement.dataset.theme = theme;
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
	}, []);

	const setTheme = useCallback((t: Theme) => {
		setThemeState(t);
	}, []);

	const isReady = useMemo(() => theme !== null, [theme]);

	return { theme: theme ?? "dark", toggleTheme, setTheme, isReady } as const;
}
