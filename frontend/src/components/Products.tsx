import type { CSSProperties } from "react";
import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Eyebrow, Section } from "@/components/brand";

/**
 * Our products — ink-framed squares with a corner cut, each casting a hard
 * shadow in its own brand color, its name set in its own shipped gradient.
 */
const PRODUCTS = [
	{
		name: "Viva",
		tagline: "“Every event happening around you”",
		description:
			"Location-first live-event discovery. Concerts, festivals, talks and matches near you — every event corroborated across independent sources by the Viva Stage Engine.",
		href: "https://viva-stage.com",
		domain: "viva-stage.com",
		gradient: "var(--grad-viva)",
		shadow: "var(--brick-full)",
		linkClass: "text-brick-text",
	},
	{
		name: "Vivid Feed",
		tagline: "“All your feeds, one vivid place.”",
		description:
			"A clean, three-pane feed reader. Follow any site with RSS or Atom, organize sources into folders, and read without the noise.",
		href: "https://vivid-feed.com",
		domain: "vivid-feed.com",
		gradient: "var(--grad-feed)",
		shadow: "var(--sage-full)",
		linkClass: "text-sage-text",
	},
] as const;

export const Products = (): FunctionComponent => {
	const t = useTranslations("Products");
	return (
		<Section id="section-products">
			<Eyebrow hue="brick">Our products &mdash; living case studies</Eyebrow>
			<h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
				{t("title")}
			</h2>
			<p className="mb-12 max-w-xl text-muted-fg">
				The same team you can hire builds and runs two products. They are the
				proof behind every promise on this page.
			</p>
			<div className="grid gap-10 sm:grid-cols-2">
				{PRODUCTS.map((product) => (
					<a
						key={product.name}
						href={product.href}
						target="_blank"
						rel="noopener noreferrer"
						className="group hard press reveal block border-3 border-ink bg-surface no-underline dark:border-line-strong"
						style={{ "--hs": product.shadow } as CSSProperties}
					>
						<div className="h-2" style={{ background: product.gradient }} />
						<div className="p-7">
							<h3
								className="gtext font-display text-2xl font-extrabold tracking-tight"
								style={{ "--gt": product.gradient } as CSSProperties}
							>
								{product.name}
							</h3>
							<p className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">
								{product.tagline}
							</p>
							<p className="mt-4 text-sm leading-relaxed text-muted-fg">
								{product.description}
							</p>
							<span
								className={`mt-5 inline-block font-mono text-sm font-semibold ${product.linkClass}`}
							>
								{product.domain}{" "}
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
