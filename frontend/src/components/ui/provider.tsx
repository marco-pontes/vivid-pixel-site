"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "@/components/ui/theme";
const client = new QueryClient();
export function Provider(props: ColorModeProviderProps) {
	return (
		<QueryClientProvider client={client}>
			<ChakraProvider value={theme}>
				<ColorModeProvider {...props} />
			</ChakraProvider>
		</QueryClientProvider>
	);
}
