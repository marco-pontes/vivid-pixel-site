import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Eyebrow, Section } from "@/components/brand";

/** Services — a diagonal inset band; blue voice, amber practice chips. */
const SERVICES = [
	{
		icon: "{ }",
		title: "Embedded senior engineers",
		text: "Experienced React, Next.js and TypeScript specialists inside your team — your timezone, your standards, no long ramp-ups and no junior guesswork.",
	},
	{
		icon: "◆",
		title: "Product engineering",
		text: "From scattered idea to shipped product, built the way our own products are built: tested, accessible and continuously delivered.",
	},
	{
		icon: "#",
		title: "Frontend rescue",
		text: "Untested, slow or inaccessible UI brought back to standard — measured, not promised.",
	},
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
		<div className="bg-inset">
			<Section id="section-services">
				<Eyebrow hue="slate">Services</Eyebrow>
				<h2 className="mb-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
					{t("title")}
				</h2>
				<p className="mb-12 max-w-xl text-muted-fg">
					Skip the cost, overhead and risk of building an in-house frontend
					team. You get vetted Brazilian engineers working in your timezone,
					transparent contracts and continuous delivery &mdash; scaling up or
					down whenever your roadmap changes.
				</p>
				<div className="grid gap-8 sm:grid-cols-3">
					{SERVICES.map((service) => (
						<div
							key={service.title}
							className="reveal rounded-xl border border-line bg-surface p-6 shadow-sm transition-colors hover:border-line-strong"
						>
							<div
								aria-hidden="true"
								className="mb-4 flex size-11 items-center justify-center rounded-full bg-slate-tint font-mono text-sm font-bold text-slate-text"
							>
								{service.icon}
							</div>
							<h3 className="font-display text-lg font-bold">{service.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-fg">
								{service.text}
							</p>
						</div>
					))}
				</div>
				<div className="mt-8 flex flex-wrap gap-2.5">
					{PRACTICES.map((practice) => (
						<span
							key={practice}
							className="rounded-full bg-ochre-tint px-3.5 py-1.5 font-mono text-xs font-bold text-ochre-text"
						>
							{practice}
						</span>
					))}
				</div>
				<a
					className="mt-10 inline-block font-mono text-sm font-semibold text-primary hover:underline"
					href="/about"
				>
					See how we work <span aria-hidden="true">&rarr;</span>
				</a>
			</Section>
		</div>
	);
};
