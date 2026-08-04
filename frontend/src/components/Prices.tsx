import type { CSSProperties } from "react";
import type { FunctionComponent } from "@/types/types.ts";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Eyebrow, Section } from "@/components/brand";

/**
 * Engagement models — brutal squares. The premium tier wears the Viva
 * gradient as a border and casts the loudest shadow.
 */
const TIERS = [
	{
		key: "embedded",
		figure: "$42",
		featured: false,
	},
	{
		key: "squad",
		figure: "$38",
		featured: false,
	},
	{
		key: "build",
		figure: null,
		featured: true,
	},
] as const;

const DETAILS = ["D1", "D2", "D3", "D4", "D5"] as const;

export const Prices = (): FunctionComponent => {
	const t = useTranslations("Pricing");
	return (
		<Section id="section-pricing">
			<Eyebrow hue="ochre">{t("eyebrow")}</Eyebrow>
			<h2 className="mb-12 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
				{t("title")}
			</h2>
			<div className="grid gap-10 sm:grid-cols-3">
				{TIERS.map((tier) => (
					<div
						key={tier.key}
						className={`reveal relative flex flex-col rounded-xl p-6 ${
							tier.featured
								? "gborder glow md:-rotate-1"
								: "border border-line bg-surface shadow-sm"
						}`}
						style={
							{
								"--gb": "var(--grad-viva)",
								"--gl": "color-mix(in srgb, var(--brick-full) 35%, transparent)",
							} as CSSProperties
						}
					>
						{tier.featured && (
							<span className="sticker absolute -top-4 -right-3 bg-ochre-full px-3.5 py-1.5 font-mono text-xs font-bold text-ink">
								{t("sticker")}
							</span>
						)}
						<h3 className="font-mono text-xs font-bold tracking-[0.12em] text-muted-fg uppercase">
							{t(`${tier.key}Name`)}
						</h3>
						<div className="mt-2 font-display text-4xl font-extrabold tracking-tight tabular-nums">
							{tier.figure ?? t("buildFigure")}{" "}
							<span className="font-sans text-sm font-normal text-muted-fg">
								{t(`${tier.key}Unit`)}
							</span>
						</div>
						<p className="mt-1 text-xs text-muted-fg">{t(`${tier.key}Meta`)}</p>
						<ul className="mt-5 mb-7 flex-1 space-y-2 border-t-2 border-line pt-5 text-sm text-muted-fg">
							{DETAILS.map((detail) => (
								<li key={detail} className="flex gap-2">
									<span
										aria-hidden="true"
										className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ochre-full"
									/>
									{t(`${tier.key}${detail}`)}
								</li>
							))}
						</ul>
						<Link
							href="/#section-contact"
							className={`inline-block rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
								tier.featured
									? "bg-primary text-primary-foreground hover:bg-primary-hover"
									: "border border-line-strong bg-inset text-foreground hover:bg-line"
							}`}
						>
							{t("cta")}
						</Link>
					</div>
				))}
			</div>
			<p className="mt-8 max-w-2xl text-sm text-subtle-fg">{t("smallprint")}</p>
		</Section>
	);
};
