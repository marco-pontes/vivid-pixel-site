import type { Metadata } from "next";
import "./globals.css";
// Project SCSS + icon font. Imported here (not via @import in globals.css) so
// Next's sass-loader compiles the Sass; Tailwind's pipeline cannot. Loaded
// after globals.css and kept unlayered → outranks Tailwind utility layers.
import "@/styles/sass/main.scss";
import "@/styles/css/icon-font.css";
import { NextIntlClientProvider } from "next-intl";
import { ColorModeButton } from "@/components/ui/color-mode";
import { StrictMode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Vivid Pixel — Senior Frontend Engineering Teams On Demand",
	description:
		"Vivid Pixel is a frontend software development studio. Hire vetted senior React, Next.js and TypeScript engineers on flexible contracts — nearshore Brazilian talent, in your timezone, with continuous delivery.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="light" style={{ colorScheme: "light" }}>
			<body>
				<NextIntlClientProvider>
					<Provider>
						<StrictMode>{children}</StrictMode>
						<Toaster />
						<ReactQueryDevtools initialIsOpen={false} position="bottom" />
						<ColorModeButton
							style={{ position: "fixed", right: 0, top: 0 }}
							size="icon"
						/>
					</Provider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
