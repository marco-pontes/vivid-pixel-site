import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { ColorModeButton } from "@/components/ui/color-mode";
import { StrictMode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Vivid Pixel Website",
	description:
		"Smart software development - Contract - Low prices - Brazilian Developers",
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
						<ColorModeButton style={{ position: "fixed", right: 0, top: 0 }} />
					</Provider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
