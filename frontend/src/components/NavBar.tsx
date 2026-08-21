import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ColorModeButton } from "@/components/ui/color-mode";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { VMark } from "@/components/brand";

const LINKS = [
	{ href: "/#section-products", key: "products" },
	{ href: "/#section-services", key: "services" },
	{ href: "/#section-pricing", key: "pricing" },
	{ href: "/#section-team", key: "team" },
	{ href: "/about", key: "about" },
] as const;

export const NavBar = (): FunctionComponent => {
	const t = useTranslations("Nav");
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/90 backdrop-blur-md">
			<nav
				aria-label="Main"
				className="mx-auto flex h-14 w-full max-w-5xl items-center gap-6 px-6"
			>
				<Link
					href="/"
					className="flex items-center gap-2.5 no-underline"
				>
					<VMark colored size={22} />
					<span className="font-display text-sm font-normal tracking-[0.22em] text-foreground uppercase">
						Vivid&nbsp;<span className="font-light tracking-[0.3em]">Pixel</span>
					</span>
				</Link>

				<div className="hidden flex-1 items-center gap-5 lg:flex">
					{LINKS.map((link) => (
						<Link
							key={link.key}
							href={link.href}
							className="text-sm text-muted-fg transition-colors hover:text-foreground"
						>
							{t(link.key)}
						</Link>
					))}
				</div>

				<div className="ms-auto flex items-center gap-2">
					<LocaleSwitcher />
					<ColorModeButton />
					<Link
						href="/#section-contact"
						className="hidden bg-primary px-4 py-1.5 font-mono text-xs font-semibold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary-hover sm:inline-block"
					>
						{t("hireUs")}
					</Link>

					{/* Mobile menu — native disclosure, no JS. */}
					<details className="relative lg:hidden">
						<summary
							className="flex size-9 cursor-pointer list-none items-center justify-center border border-line-strong text-foreground [&::-webkit-details-marker]:hidden"
							aria-label={t("menu")}
						>
							<span aria-hidden="true" className="font-mono text-sm">
								&#8801;
							</span>
						</summary>
						<div className="absolute end-0 mt-3 w-44 border border-line bg-surface p-2 shadow-xl">
							{LINKS.map((link) => (
								<Link
									key={link.key}
									href={link.href}
									className="block px-3 py-2 text-sm text-muted-fg transition-colors hover:bg-inset hover:text-foreground"
								>
									{t(link.key)}
								</Link>
							))}
						</div>
					</details>
				</div>
			</nav>
		</header>
	);
};
