import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
	theme: {
		tokens: {
			fonts: {
				heading: { value: "Plus Jakarta Sans Variable, sans-serif" },
				body: { value: "Plus Jakarta Sans Variable, sans-serif" },
			},
		},
	},
});

export const theme = createSystem(defaultConfig, config);
