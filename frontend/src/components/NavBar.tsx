import type { FunctionComponent } from "@/types/types.ts";
import Link from "next/link";
import { ColorModeButton } from "@/components/ui/color-mode";

const LINKS = [
	{ href: "/#section-products", label: "Products" },
	{ href: "/#section-services", label: "Services" },
	{ href: "/#section-pricing", label: "Pricing" },
	{ href: "/#section-team", label: "Team" },
	{ href: "/about", label: "About" },
] as const;

export const NavBar = (): FunctionComponent => {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
			<nav
				aria-label="Main"
				className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-6"
			>
				<Link
					href="/"
					className="font-display text-base font-bold tracking-tight text-foreground no-underline"
				>
					Vivid Pixel<span className="text-violet-full">.</span>
				</Link>

				<div className="hidden flex-1 items-center gap-5 md:flex">
					{LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-sm text-muted-fg transition-colors hover:text-foreground"
						>
							{link.label}
						</Link>
					))}
				</div>

				<div className="ml-auto flex items-center gap-2">
					<ColorModeButton />
					<Link
						href="/#section-contact"
						className="rounded-md bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
					>
						Hire us
					</Link>

					{/* Mobile menu — native disclosure, no JS. */}
					<details className="relative md:hidden">
						<summary
							className="flex size-9 cursor-pointer list-none items-center justify-center rounded-md border border-line text-foreground [&::-webkit-details-marker]:hidden"
							aria-label="Menu"
						>
							<span aria-hidden="true" className="font-mono text-sm">
								≡
							</span>
						</summary>
						<div className="absolute right-0 mt-2 w-44 rounded-lg border border-line bg-surface p-2 shadow-overlay">
							{LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="block rounded-md px-3 py-2 text-sm text-muted-fg transition-colors hover:bg-inset hover:text-foreground"
								>
									{link.label}
								</Link>
							))}
						</div>
					</details>
				</div>
			</nav>
		</header>
	);
};
