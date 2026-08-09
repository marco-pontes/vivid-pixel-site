import type { CSSProperties } from "react";
import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Eyebrow, Section } from "@/components/brand";

/**
 * Our products — serious square cards: gradient hairline on top, thin
 * tracked gradient name, a dissolving pixel patch in the product's color
 * (the V's speckle, echoed small), soft glow in the product's hue.
 */
const PRODUCTS = [
	{
		name: "Viva",
		tagline: "\u201cEvery event happening around you\u201d",
		descriptionKey: "vivaDescription" as const,
		href: "https://viva-stage.com",
		domain: "viva-stage.com",
		gradient: "var(--grad-viva)",
		glowColor: "color-mix(in srgb, var(--brick-full) 30%, transparent)",
		dissolve: "color-mix(in srgb, var(--brick-full) 45%, transparent)",
		linkClass: "text-brick-text",
	},
	{
		name: "Vivid Feed",
		tagline: "\u201cAll your feeds, one vivid place.\u201d",
		descriptionKey: "feedDescription" as const,
		href: "https://vivid-feed.com",
		domain: "vivid-feed.com",
		gradient: "var(--grad-feed)",
		glowColor: "color-mix(in srgb, var(--sage-full) 30%, transparent)",
		dissolve: "color-mix(in srgb, var(--sage-full) 45%, transparent)",
		linkClass: "text-sage-text",
	},
	{
		name: "Vivid Love",
		tagline: "\u201cThe real numbers of love\u201d",
		descriptionKey: "loveDescription" as const,
		href: "https://vivid-love.com",
		domain: "vivid-love.com",
		gradient: "linear-gradient(135deg, #91a7ff, #f783ac)",
		glowColor: "color-mix(in srgb, #f783ac 30%, transparent)",
		dissolve: "color-mix(in srgb, #f783ac 45%, transparent)",
		linkClass: "text-rose-text",
	},
] as const;

export const Products = (): FunctionComponent => {
	const t = useTranslations("Products");
	return (
		<Section id="section-products">
			<Eyebrow hue="brick">{t("eyebrow")}</Eyebrow>
			<h2 className="mb-4 font-display text-3xl font-light tracking-[0.08em] uppercase sm:text-4xl">
				{t("title")}
			</h2>
			<p className="mb-12 max-w-xl text-muted-fg">{t("lead")}</p>
			<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
				{PRODUCTS.map((product) => (
					<a
						key={product.name}
						href={product.href}
						target="_blank"
						rel="noopener noreferrer"
						className="glow reveal group relative block overflow-hidden border border-line bg-surface no-underline transition-colors hover:border-line-strong"
						style={{ "--gl": product.glowColor } as CSSProperties}
					>
						<div className="h-0.5" style={{ background: product.gradient }} />
						<div
							aria-hidden="true"
							className="pixel-dissolve absolute -end-4 top-8 h-24 w-40 opacity-80"
							style={{ "--pd": product.dissolve } as CSSProperties}
						/>
						<div className="relative p-8">
							<h3
								className="gtext font-display text-3xl font-light tracking-[0.14em] uppercase"
								style={{ "--gt": product.gradient } as CSSProperties}
							>
								{product.name}
							</h3>
							<p className="mt-4 font-display text-xl font-normal text-foreground">
								{product.tagline}
							</p>
							<p className="mt-4 text-sm leading-relaxed text-muted-fg">
								{t(product.descriptionKey)}
							</p>
							<span
								className={`mt-6 inline-block font-mono text-sm font-semibold ${product.linkClass}`}
							>
								{t("visit", { domain: product.domain })}{" "}
								<span
									aria-hidden="true"
									className="inline-block motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
								>
									&rarr;
								</span>
							</span>
						</div>
					</a>
				))}
			</div>
		</Section>
	);
};
