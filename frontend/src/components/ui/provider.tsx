"use client";

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export function Provider(props: ColorModeProviderProps) {
	return (
		<QueryClientProvider client={client}>
			<ColorModeProvider {...props} />
		</QueryClientProvider>
	);
}
