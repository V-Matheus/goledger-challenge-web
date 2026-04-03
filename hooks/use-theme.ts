"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

function setCookie(value: string) {
	if ("cookieStore" in window) {
		(window.cookieStore as CookieStore).set({
			name: STORAGE_KEY,
			value,
			path: "/",
			maxAge: 31536000,
			sameSite: "lax",
		});
	} else {
		// biome-ignore lint/suspicious/noDocumentCookie: fallback for browsers without Cookie Store API
		document.cookie = `${STORAGE_KEY}=${value};path=/;max-age=31536000;SameSite=Lax`;
	}
}

type CookieStore = {
	set(options: {
		name: string;
		value: string;
		path: string;
		maxAge: number;
		sameSite: string;
	}): Promise<void>;
};

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof document !== "undefined") {
			return (document.documentElement.dataset.theme as Theme) ?? "dark";
		}
		return "dark";
	});

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem(STORAGE_KEY, theme);
		setCookie(theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
	}, []);

	const setTheme = useCallback((t: Theme) => {
		setThemeState(t);
	}, []);

	return { theme, toggleTheme, setTheme } as const;
}
