import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Eyebrow, Section } from "@/components/brand";

/** Services take slate; the practice chips take clay, the practices hue. */
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
		<Section id="section-services">
			<Eyebrow hue="slate">
				Services
			</Eyebrow>
			<h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
				{t("title")}
			</h2>
			<p className="mb-10 max-w-xl text-muted-fg">
				Skip the cost, overhead and risk of building an in-house frontend team.
				You get vetted Brazilian engineers working in your timezone, transparent
				contracts and continuous delivery — scaling up or down whenever your
				roadmap changes.
			</p>
			<div className="grid gap-5 sm:grid-cols-3">
				{SERVICES.map((service) => (
					<div
						key={service.title}
						className="rounded-xl border border-line bg-surface p-5 shadow-card transition-colors hover:border-line-strong"
					>
						<div
							aria-hidden="true"
							className="mb-3 flex size-9 items-center justify-center rounded-md bg-slate-tint font-mono text-sm text-slate-text"
						>
							{service.icon}
						</div>
						<h3 className="text-[0.95rem] font-semibold">{service.title}</h3>
						<p className="mt-1.5 text-sm leading-relaxed text-muted-fg">
							{service.text}
						</p>
					</div>
				))}
			</div>
			<div className="mt-6 flex flex-wrap gap-2">
				{PRACTICES.map((practice) => (
					<span
						key={practice}
						className="rounded-full bg-clay-tint px-3 py-1 text-xs font-medium text-clay-text"
					>
						{practice}
					</span>
				))}
			</div>
			<a
				className="mt-8 inline-block text-sm font-medium text-primary hover:underline"
				href="/about"
			>
				See how we work <span aria-hidden="true">&rarr;</span>
			</a>
		</Section>
	);
};
