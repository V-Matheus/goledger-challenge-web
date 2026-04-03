"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
	const { isReady } = useTheme();

	if (!isReady) return null;

	return <>{children}</>;
}
