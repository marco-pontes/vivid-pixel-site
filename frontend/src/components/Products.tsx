import type { CSSProperties } from "react";
import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Eyebrow, Section } from "@/components/brand";

/**
 * Our products — asymmetric editorial rows. Each product gets a full-bleed
 * gradient panel glowing in its own color; rows alternate direction.
 */
const PRODUCTS = [
	{
		name: "Viva",
		tagline: "“Every event happening around you”",
		descriptionKey: "vivaDescription" as const,
		href: "https://viva-stage.com",
		domain: "viva-stage.com",
		gradient: "var(--grad-viva)",
		glowColor: "color-mix(in srgb, var(--brick-full) 45%, transparent)",
		linkClass: "text-brick-text",
		reversed: false,
	},
	{
		name: "Vivid Feed",
		tagline: "“All your feeds, one vivid place.”",
		descriptionKey: "feedDescription" as const,
		href: "https://vivid-feed.com",
		domain: "vivid-feed.com",
		gradient: "var(--grad-feed)",
		glowColor: "color-mix(in srgb, var(--sage-full) 45%, transparent)",
		linkClass: "text-sage-text",
		reversed: true,
	},
] as const;

export const Products = (): FunctionComponent => {
	const t = useTranslations("Products");
	return (
		<Section id="section-products">
			<Eyebrow hue="brick">{t("eyebrow")}</Eyebrow>
			<h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
				{t("title")}
			</h2>
			<p className="mb-14 max-w-xl text-muted-fg">{t("lead")}</p>
			<div className="grid gap-16">
				{PRODUCTS.map((product) => (
					<div
						key={product.name}
						className={`reveal grid items-center gap-8 md:grid-cols-[1.05fr_1fr] ${
							product.reversed ? "md:[&>*:first-child]:order-2" : ""
						}`}
					>
						<a
							href={product.href}
							target="_blank"
							rel="noopener noreferrer"
							className="glow group block rounded-3xl p-10 no-underline sm:p-12"
							style={
								{
									background: product.gradient,
									"--gl": product.glowColor,
								} as CSSProperties
							}
						>
							<h3 className="font-display text-3xl font-extrabold tracking-tight text-white">
								{product.name}
							</h3>
							<p className="mt-4 font-display text-2xl font-bold tracking-tight text-white/95 sm:text-3xl">
								{product.tagline}
							</p>
							<span className="mt-8 inline-block rounded-full bg-white/15 px-4 py-1.5 font-mono text-sm font-semibold text-white backdrop-blur-sm">
								{product.domain}{" "}
								<span
									aria-hidden="true"
									className="inline-block motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
								>
									&rarr;
								</span>
							</span>
						</a>
						<div>
							<p className="text-base leading-relaxed text-muted-fg">
								{t(product.descriptionKey)}
							</p>
							<a
								href={product.href}
								target="_blank"
								rel="noopener noreferrer"
								className={`mt-4 inline-block font-mono text-sm font-semibold ${product.linkClass} hover:underline`}
							>
								{t("visit", { domain: product.domain })}{" "}
								<span aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</div>
				))}
			</div>
		</Section>
	);
};
