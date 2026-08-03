import type { FunctionComponent } from "@/types/types.ts";
import Link from "next/link";
import { SPECTRUM } from "@/components/brand";

const PRODUCT_LINKS = [
	{ label: "Viva", href: "https://viva-stage.com" },
	{ label: "Vivid Feed", href: "https://vivid-feed.com" },
] as const;

const STUDIO_LINKS = [
	{ label: "Services", href: "/#section-services" },
	{ label: "Pricing", href: "/#section-pricing" },
	{ label: "Team", href: "/#section-team" },
	{ label: "Contact", href: "/#section-contact" },
	{ label: "About", href: "/about" },
] as const;

export const Footer = (): FunctionComponent => {
	return (
		<footer className="border-t border-line bg-inset px-6 py-14">
			<div className="mx-auto w-full max-w-5xl">
				<div className="flex flex-wrap gap-x-16 gap-y-10">
					<div>
						<h3 className="mb-3 font-mono text-xs font-medium tracking-[0.12em] text-subtle-fg uppercase">
							Our products
						</h3>
						<ul className="space-y-1.5">
							{PRODUCT_LINKS.map((link) => (
								<li key={link.href}>
									<a
										className="text-sm text-muted-fg transition-colors hover:text-foreground"
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="mb-3 font-mono text-xs font-medium tracking-[0.12em] text-subtle-fg uppercase">
							Studio
						</h3>
						<ul className="space-y-1.5">
							{STUDIO_LINKS.map((link) => (
								<li key={link.href}>
									<Link
										className="text-sm text-muted-fg transition-colors hover:text-foreground"
										href={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="max-w-xs">
						<h3 className="mb-3 font-mono text-xs font-medium tracking-[0.12em] text-subtle-fg uppercase">
							A personal note
						</h3>
						<p className="text-sm leading-relaxed text-muted-fg">
							A project close to my heart &mdash;{" "}
							<a
								className="font-semibold text-rose-text hover:underline"
								href="https://help-marco-buy-a-prosthetic-hand.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								Help Marco buy a prosthetic hand
							</a>
						</p>
					</div>
				</div>

				<div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
					<div aria-hidden="true" className="flex gap-1">
						{SPECTRUM.map((hue) => (
							<span
								key={hue}
								className="size-2 rounded-[2px]"
								style={{
									background:
										hue === "violet" ? "var(--primary)" : `var(--${hue})`,
								}}
							/>
						))}
					</div>
					<p className="font-mono text-xs text-subtle-fg">
						&copy; {new Date().getFullYear()} Vivid Pixel &middot; Built by{" "}
						<a
							className="hover:text-foreground"
							href="https://github.com/marco-pontes/"
						>
							Marco Pontes
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};
