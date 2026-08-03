import type { FunctionComponent } from "@/types/types.ts";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Eyebrow, Section } from "@/components/brand";

/**
 * Engagement models. Flat, readable, no hover required to see a number.
 * The staffing model is named out loud (Marco + a vetted senior bench),
 * and the tier closest to the product story is the premium one.
 */
const TIERS = [
	{
		name: "Embedded Senior",
		figure: "$42",
		unit: "/h",
		meta: "One engineer · 140 monthly hours",
		details: [
			"1 dedicated front-end specialist",
			"Senior React, Next.js & TypeScript",
			"Works in your timezone",
			"Continuous delivery",
			"Flexible monthly contract",
		],
		featured: false,
	},
	{
		name: "Front-end Squad",
		figure: "$38",
		unit: "/h · per dev",
		meta: "Marco + vetted senior bench, one lead",
		details: [
			"2–4 dedicated front-end engineers",
			"Shared senior tech lead",
			"Code reviews & pair programming",
			"Continuous delivery",
			"Scale up or down anytime",
		],
		featured: false,
	},
	{
		name: "Product Build",
		figure: "Scoped",
		unit: "per project",
		meta: "Design + build + ship, the way our products are made",
		details: [
			"From discovery to deployment",
			"Front-end, QA & tech lead",
			"Tested and accessible by default",
			"Fixed scope or monthly retainer",
			"You own everything we ship",
		],
		featured: true,
	},
] as const;

export const Prices = (): FunctionComponent => {
	const t = useTranslations("Pricing");
	return (
		<Section id="section-pricing" className="bg-surface">
			<Eyebrow hue="ochre">
				Pricing
			</Eyebrow>
			<h2 className="mb-10 font-display text-3xl font-bold tracking-tight sm:text-4xl">
				{t("title")}
			</h2>
			<div className="grid gap-5 sm:grid-cols-3">
				{TIERS.map((tier) => (
					<div
						key={tier.name}
						className={`flex flex-col rounded-xl border bg-background p-6 shadow-card ${
							tier.featured ? "border-ochre" : "border-line"
						}`}
					>
						<h3 className="text-sm font-medium text-muted-fg">{tier.name}</h3>
						<div className="mt-1 font-display text-3xl font-bold tabular-nums tracking-tight">
							{tier.figure}{" "}
							<span className="font-sans text-sm font-normal text-muted-fg">
								{tier.unit}
							</span>
						</div>
						<p className="mt-1 text-xs text-muted-fg">{tier.meta}</p>
						<ul className="mt-4 mb-6 flex-1 space-y-2 border-t border-line pt-4 text-sm text-muted-fg">
							{tier.details.map((detail) => (
								<li key={detail}>{detail}</li>
							))}
						</ul>
						<Link
							href="/#section-contact"
							className={`rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
								tier.featured
									? "bg-primary text-primary-foreground hover:bg-primary-hover"
									: "border border-line-strong bg-inset text-foreground hover:bg-line"
							}`}
						>
							Start a conversation
						</Link>
					</div>
				))}
			</div>
			<p className="mt-6 max-w-2xl text-sm text-subtle-fg">
				Public hourly rates on purpose — nearshore transparency you can budget
				against. Marco leads every engagement, drawing on a vetted circle of
				senior contractors assembled per project. Everything ships with tests,
				CI and documentation — the same bar as our products.
			</p>
		</Section>
	);
};
