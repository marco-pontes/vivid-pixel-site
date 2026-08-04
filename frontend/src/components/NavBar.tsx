import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ColorModeButton } from "@/components/ui/color-mode";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

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
		<header className="fixed inset-x-0 top-3 z-50 px-4">
			<nav
				aria-label="Main"
				className="mx-auto flex h-13 w-full max-w-4xl items-center gap-5 rounded-full border border-line bg-background/85 px-5 shadow-lg backdrop-blur-md"
			>
				<Link
					href="/"
					className="font-display text-base font-bold tracking-tight text-foreground no-underline"
				>
					Vivid Pixel<span className="text-violet-full">.</span>
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
						className="hidden rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover sm:inline-block"
					>
						{t("hireUs")}
					</Link>

					{/* Mobile menu — native disclosure, no JS. */}
					<details className="relative lg:hidden">
						<summary
							className="flex size-9 cursor-pointer list-none items-center justify-center rounded-full border border-line-strong text-foreground [&::-webkit-details-marker]:hidden"
							aria-label={t("menu")}
						>
							<span aria-hidden="true" className="font-mono text-sm">
								&#8801;
							</span>
						</summary>
						<div className="absolute end-0 mt-3 w-44 rounded-2xl border border-line bg-surface p-2 shadow-xl">
							{LINKS.map((link) => (
								<Link
									key={link.key}
									href={link.href}
									className="block rounded-lg px-3 py-2 text-sm text-muted-fg transition-colors hover:bg-inset hover:text-foreground"
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
