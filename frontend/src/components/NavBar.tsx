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
		<header className="fixed inset-x-0 top-3 z-50 px-4">
			<nav
				aria-label="Main"
				className="mx-auto flex h-13 w-full max-w-4xl items-center gap-6 rounded-full border border-line bg-background/85 px-5 shadow-lg backdrop-blur-md"
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
						className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
					>
						Hire us
					</Link>

					{/* Mobile menu — native disclosure, no JS. */}
					<details className="relative md:hidden">
						<summary
							className="flex size-9 cursor-pointer list-none items-center justify-center rounded-full border border-line-strong text-foreground [&::-webkit-details-marker]:hidden"
							aria-label="Menu"
						>
							<span aria-hidden="true" className="font-mono text-sm">
								≡
							</span>
						</summary>
						<div className="absolute right-0 mt-3 w-44 rounded-2xl border border-line bg-surface p-2 shadow-xl">
							{LINKS.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="block rounded-lg px-3 py-2 text-sm text-muted-fg transition-colors hover:bg-inset hover:text-foreground"
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
