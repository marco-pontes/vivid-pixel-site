import type { CSSProperties } from "react";
import type { FunctionComponent } from "@/types/types.ts";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Eyebrow, Section, VMark } from "@/components/brand";

/**
 * Engagement models — the original site's 3D card flip, kept as heritage
 * and modernized (P5). Fronts are quiet paper: thin uppercase name, big
 * price, details. Hover or keyboard focus turns the card to a full-bleed
 * brand-gradient back with a ghost V and the CTA — the way the old flip
 * cards hid their price behind the turn, inverted: here the front informs,
 * the back asks. Touch devices get both faces stacked, no 3D.
 */
const TIERS = [
	{
		key: "embedded",
		figure: "$52",
		back: "linear-gradient(135deg, #1c7ed6, #5f3dc4)",
		featured: false,
	},
	{
		key: "squad",
		figure: "$46",
		back: "var(--grad-feed)",
		featured: false,
	},
	{
		key: "build",
		figure: null,
		back: "var(--grad-viva)",
		featured: true,
	},
] as const;

const DETAILS = ["D1", "D2", "D3", "D4", "D5"] as const;

export const Prices = (): FunctionComponent => {
	const t = useTranslations("Pricing");
	return (
		<Section id="section-pricing">
			<Eyebrow hue="ochre">{t("eyebrow")}</Eyebrow>
			<h2 className="mb-12 font-display text-3xl font-light tracking-[0.08em] uppercase sm:text-4xl">
				{t("title")}
			</h2>
			<div className="grid gap-10 md:grid-cols-3">
				{TIERS.map((tier) => (
					<div key={tier.key} className="flip-scene reveal">
						<div className="flip-inner h-full">
							{/* FRONT — paper */}
							<div
								className={`flip-front flex h-full flex-col border bg-surface p-6 ${
									tier.featured ? "border-ochre-text" : "border-line"
								}`}
							>
								<h3 className="font-mono text-xs font-bold tracking-[0.14em] text-muted-fg uppercase">
									{t(`${tier.key}Name`)}
								</h3>
								<div className="mt-3 font-display text-5xl font-light tracking-tight tabular-nums">
									{tier.figure ?? (
										<span className="text-4xl">{t("buildFigure")}</span>
									)}{" "}
									<span className="font-sans text-sm text-muted-fg">
										{t(`${tier.key}Unit`)}
									</span>
								</div>
								<p className="mt-2 text-xs text-muted-fg">
									{t(`${tier.key}Meta`)}
								</p>
								<ul className="mt-5 flex-1 space-y-2 border-t border-line pt-5 text-sm text-muted-fg">
									{DETAILS.map((detail) => (
										<li key={detail} className="flex gap-2">
											<span
												aria-hidden="true"
												className="mt-1.5 size-1.5 shrink-0 bg-ochre-full"
											/>
											{t(`${tier.key}${detail}`)}
										</li>
									))}
								</ul>
								<p
									aria-hidden="true"
									className="mt-4 hidden font-mono text-[0.65rem] tracking-[0.14em] text-subtle-fg uppercase [@media(hover:hover)]:block"
								>
									&#8635;
								</p>
							</div>
							{/* BACK — the brand gradient asks for the conversation */}
							<div
								className="flip-back flex flex-col items-start justify-end overflow-hidden p-6"
								style={{ background: tier.back } as CSSProperties}
							>
								<VMark
									size={230}
									paint="rgba(255,255,255,0.12)"
									className="pointer-events-none absolute -end-10 -top-10"
								/>
								<h3 className="relative font-mono text-xs font-bold tracking-[0.14em] text-white/85 uppercase">
									{t(`${tier.key}Name`)}
								</h3>
								<div className="relative mt-2 mb-6 font-display text-6xl font-light tracking-tight text-white tabular-nums">
									{tier.figure ?? (
										<span className="text-4xl">{t("buildFigure")}</span>
									)}
									<span className="ms-2 align-middle font-sans text-sm text-white/85">
										{t(`${tier.key}Unit`)}
									</span>
								</div>
								<Link
									href="/#section-contact"
									className="relative bg-white px-5 py-2.5 text-center font-mono text-sm font-bold tracking-wide text-[#100e2c] uppercase transition-transform motion-safe:hover:-translate-y-0.5"
								>
									{t("cta")}
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
			<p className="mt-8 max-w-2xl text-sm text-subtle-fg">{t("smallprint")}</p>
		</Section>
	);
};
