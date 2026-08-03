import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

// Display face — the studio's own voice. Body text stays on the family's
// system-stack convention (see globals.css --font-sans).
const bricolage = Bricolage_Grotesque({
	subsets: ["latin"],
	variable: "--font-bricolage",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Vivid Pixel — The studio behind Viva and Vivid Feed",
	description:
		"We build vivid software. Products and senior frontend engineering from the studio behind Viva and Vivid Feed — vetted senior React, Next.js and TypeScript engineers, nearshore in your timezone.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// suppressHydrationWarning: next-themes stamps the .dark class on <html>
	// before hydration; without this React reports a mismatch on every load.
	return (
		<html lang="en" suppressHydrationWarning className={bricolage.variable}>
			<body>
				<NextIntlClientProvider>
					<Provider>
						{children}
						<Toaster />
					</Provider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
