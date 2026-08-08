import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eyebrow, Section } from "@/components/brand";

/** Services — a diagonal inset band; blue voice, amber practice chips. */
const SERVICES = [
	{ icon: "{ }", titleKey: "embeddedTitle", textKey: "embeddedText" },
	{ icon: "◆", titleKey: "productTitle", textKey: "productText" },
	{ icon: "#", titleKey: "rescueTitle", textKey: "rescueText" },
] as const;

const PRACTICES = [
	"Playwright e2e",
	"Unit tested",
	"WCAG AA",
	"TypeScript strict",
	"CI/CD on every commit",
] as const;

export const Services = (): FunctionComponent => {
	const t = useTranslations("Services");
	return (
		<div className="seam-tb relative bg-inset py-6">
			<div aria-hidden="true" className="hatch absolute inset-y-0 right-0 w-20 opacity-70 max-lg:hidden" />
			<Section id="section-services">
				<Eyebrow hue="slate">{t("eyebrow")}</Eyebrow>
				<h2 className="mb-4 max-w-3xl font-display text-3xl font-light tracking-[0.08em] uppercase sm:text-4xl">
					{t("title")}
				</h2>
				<p className="mb-12 max-w-xl text-muted-fg">{t("lead")}</p>
				<div className="grid gap-8 sm:grid-cols-3">
					{SERVICES.map((service) => (
						<div
							key={service.titleKey}
							className="reveal border border-line bg-surface p-6 transition-colors hover:border-line-strong"
						>
							<div
								aria-hidden="true"
								className="mb-4 flex size-11 items-center justify-center bg-slate-tint font-mono text-sm font-bold text-slate-text"
							>
								{service.icon}
							</div>
							<h3 className="font-display text-lg font-normal tracking-wide">{t(service.titleKey)}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-fg">
								{t(service.textKey)}
							</p>
						</div>
					))}
				</div>
				<div className="mt-8 flex flex-wrap gap-2.5">
					{PRACTICES.map((practice) => (
						<span
							key={practice}
							className="bg-ochre-tint px-3.5 py-1.5 font-mono text-xs font-bold text-ochre-text"
						>
							{practice}
						</span>
					))}
				</div>
				<Link
					className="mt-10 inline-block font-mono text-sm font-semibold text-primary hover:underline"
					href="/about"
				>
					{t("seeHow")} <span aria-hidden="true">&rarr;</span>
				</Link>
			</Section>
		</div>
	);
};
