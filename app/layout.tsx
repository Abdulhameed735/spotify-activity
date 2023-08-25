import "./styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionWrapper } from "@/components/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Spotify activity",
	description:
		"Explore your music journey like never before with Spotify-Activity! Gain fascinating insights into your Spotify usage, from your most-played tracks and artists to your evolving music preferences. Dive into a world of data-driven discovery, all while enjoying the tunes that define your moments. Unveil your musical story with Spotify-Activity."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<SessionWrapper>{children}</SessionWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}
