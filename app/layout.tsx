import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AppProviders } from "@/components/providers/AppProviders";
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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const cookieStore = await cookies();
	const theme = cookieStore.get("theme")?.value ?? "dark";

	return (
		<html
			lang="en"
			data-theme={theme}
			className={`${manrope.variable} ${inter.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col font-body">
				<AppProviders>
					<div className="flex h-screen overflow-hidden bg-background max-md:flex-col">
						<Sidebar />
						<div className="flex flex-1 flex-col overflow-hidden">
							<Header />
							<main className="flex-1 overflow-y-auto px-8 pb-8 max-md:px-4 max-md:pb-20">
								{children}
							</main>
						</div>
					</div>
				</AppProviders>
			</body>
		</html>
	);
}
