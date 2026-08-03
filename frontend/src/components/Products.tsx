import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Eyebrow, Section } from "@/components/brand";

/**
 * Our products — the studio's living case studies, promoted from footer
 * links to the site's centerpiece. The gradient bars are the only place on
 * the page where saturation covers area (R1): each product's real brand
 * gradient, quoted like a logo.
 */
const PRODUCTS = [
	{
		name: "Viva",
		tagline: "“Every event happening around you”",
		description:
			"Location-first live-event discovery. Concerts, festivals, talks and matches near you — every event corroborated across independent sources by the Viva Stage Engine.",
		href: "https://viva-stage.com",
		domain: "viva-stage.com",
		gradient: "linear-gradient(110deg, var(--brick-full), var(--plum-full))",
		linkClass: "text-brick-text",
	},
	{
		name: "Vivid Feed",
		tagline: "“All your feeds, one vivid place.”",
		description:
			"A clean, three-pane feed reader. Follow any site with RSS or Atom, organize sources into folders, and read without the noise.",
		href: "https://vivid-feed.com",
		domain: "vivid-feed.com",
		gradient: "linear-gradient(135deg, var(--sage-full), var(--iris-full))",
		linkClass: "text-sage-text",
	},
] as const;

export const Products = (): FunctionComponent => {
	const t = useTranslations("Products");
	return (
		<Section id="section-products">
			<Eyebrow hue="brick">
				Our products — living case studies
			</Eyebrow>
			<h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
				{t("title")}
			</h2>
			<p className="mb-10 max-w-xl text-muted-fg">
				The same team you can hire builds and runs two products. They are the
				proof behind every promise on this page.
			</p>
			<div className="grid gap-6 sm:grid-cols-2">
				{PRODUCTS.map((product) => (
					<a
						key={product.name}
						href={product.href}
						target="_blank"
						rel="noopener noreferrer"
						className="group block overflow-hidden rounded-xl border border-line bg-surface no-underline shadow-card transition-colors hover:border-line-strong"
					>
						<div className="h-1.5" style={{ background: product.gradient }} />
						<div className="p-6">
							<h3 className="font-display text-lg font-bold">{product.name}</h3>
							<p className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
								{product.tagline}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted-fg">
								{product.description}
							</p>
							<span
								className={`mt-4 inline-block text-sm font-semibold ${product.linkClass}`}
							>
								{product.domain}{" "}
								<span
									aria-hidden="true"
									className="inline-block motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
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
