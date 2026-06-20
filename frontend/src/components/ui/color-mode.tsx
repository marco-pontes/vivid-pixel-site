"use client";

import { ThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { LuMoon, LuSun } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
	return (
		<ThemeProvider attribute="class" disableTransitionOnChange {...props} />
	);
}

export type ColorMode = "light" | "dark";

export interface UseColorModeReturn {
	colorMode: ColorMode;
	setColorMode: (colorMode: ColorMode) => void;
	toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
	const { resolvedTheme, setTheme, forcedTheme } = useTheme();
	const colorMode = forcedTheme || resolvedTheme;
	const toggleColorMode = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};
	return {
		colorMode: colorMode as ColorMode,
		setColorMode: setTheme,
		toggleColorMode,
	};
}

export function useColorModeValue<T>(light: T, dark: T) {
	const { colorMode } = useColorMode();
	return colorMode === "dark" ? dark : light;
}

export function ColorModeIcon() {
	const { colorMode } = useColorMode();
	return colorMode === "dark" ? <LuMoon /> : <LuSun />;
}

type ColorModeButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	"aria-label"
>;

export const ColorModeButton = React.forwardRef<
	HTMLButtonElement,
	ColorModeButtonProps
>(function ColorModeButton(props, ref) {
	const [mounted, setMounted] = React.useState(false);
	const { toggleColorMode } = useColorMode();

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <Skeleton className="size-9" />;
	}

	return (
		<Button
			onClick={toggleColorMode}
			variant="ghost"
			size="icon"
			aria-label="Toggle color mode"
			ref={ref}
			{...props}
		>
			<ColorModeIcon />
		</Button>
	);
});

export const LightMode = React.forwardRef<
	HTMLSpanElement,
	React.ComponentProps<"span">
>(function LightMode({ className, ...props }, ref) {
	return (
		<span
			className={["light", className].filter(Boolean).join(" ")}
			style={{ display: "contents" }}
			ref={ref}
			{...props}
		/>
	);
});

export const DarkMode = React.forwardRef<
	HTMLSpanElement,
	React.ComponentProps<"span">
>(function DarkMode({ className, ...props }, ref) {
	return (
		<span
			className={["dark", className].filter(Boolean).join(" ")}
			style={{ display: "contents" }}
			ref={ref}
			{...props}
		/>
	);
});
