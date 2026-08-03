import type { CSSProperties } from "react";
import type { FunctionComponent } from "@/types/types.ts";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Eyebrow, Section } from "@/components/brand";

/**
 * Engagement models — brutal squares. The premium tier wears the Viva
 * gradient as a border and casts the loudest shadow.
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
		<Section id="section-pricing">
			<Eyebrow hue="ochre">Pricing</Eyebrow>
			<h2 className="mb-12 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
				{t("title")}
			</h2>
			<div className="grid gap-10 sm:grid-cols-3">
				{TIERS.map((tier) => (
					<div
						key={tier.name}
						className={`hard reveal flex flex-col p-6 ${
							tier.featured
								? "gborder"
								: "border-3 border-ink bg-surface dark:border-line-strong"
						}`}
						style={
							{
								"--hs": tier.featured
									? "var(--brick-full)"
									: "var(--hard-shadow)",
								"--gb": "var(--grad-viva)",
							} as CSSProperties
						}
					>
						<h3 className="font-mono text-xs font-bold tracking-[0.12em] text-muted-fg uppercase">
							{tier.name}
						</h3>
						<div className="mt-2 font-display text-4xl font-extrabold tracking-tight tabular-nums">
							{tier.figure}{" "}
							<span className="font-sans text-sm font-normal text-muted-fg">
								{tier.unit}
							</span>
						</div>
						<p className="mt-1 text-xs text-muted-fg">{tier.meta}</p>
						<ul className="mt-5 mb-7 flex-1 space-y-2 border-t-2 border-line pt-5 text-sm text-muted-fg">
							{tier.details.map((detail) => (
								<li key={detail} className="flex gap-2">
									<span
										aria-hidden="true"
										className="mt-1.5 size-1.5 shrink-0 bg-ochre-full"
									/>
									{detail}
								</li>
							))}
						</ul>
						<Link
							href="/#section-contact"
							className={`cut-tr press inline-block px-4 py-2.5 text-center text-sm font-semibold ${
								tier.featured
									? "hard-sm bg-primary text-primary-foreground"
									: "border-2 border-ink bg-inset text-foreground hover:bg-line dark:border-line-strong"
							}`}
						>
							Start a conversation
						</Link>
					</div>
				))}
			</div>
			<p className="mt-8 max-w-2xl text-sm text-subtle-fg">
				Public hourly rates on purpose &mdash; nearshore transparency you can
				budget against. Marco leads every engagement, drawing on a vetted circle
				of senior contractors assembled per project. Everything ships with
				tests, CI and documentation &mdash; the same bar as our products.
			</p>
		</Section>
	);
};
