import "../../globals.css";

/* Standalone root layout for the diet-planner tool — outside the localized
   site tree, intentionally untouched by the i18n routing. */
export default function DietPlannerLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>{children}</body>
		</html>
	);
}
