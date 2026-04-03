import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "GoLedger TV Shows",
	description: "IMDB-like catalog for TV Shows",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${manrope.variable} ${inter.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col font-body">
				<ThemeProvider>
					<div className="flex h-screen overflow-hidden bg-background">
						<Sidebar />
						<div className="flex flex-1 flex-col overflow-hidden">
							<Header />
							<main className="flex-1 overflow-y-auto px-8 pb-8">
								{children}
							</main>
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
