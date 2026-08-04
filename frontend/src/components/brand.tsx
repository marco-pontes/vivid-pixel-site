import type { ReactNode } from "react";

/** The nine family hues, in site order. Anchors are the shipped hexes. */
export const SPECTRUM = [
	"brick",
	"plum",
	"sage",
	"iris",
	"slate",
	"clay",
	"ochre",
	"rose",
	"violet",
] as const;

export type Hue = (typeof SPECTRUM)[number];

/* Full literal class names so Tailwind's extractor sees them. */
const EYEBROW_TEXT: Record<Hue, string> = {
	brick: "text-brick-text",
	plum: "text-plum-text",
	sage: "text-sage-text",
	iris: "text-iris-text",
	slate: "text-slate-text",
	clay: "text-clay-text",
	ochre: "text-ochre-text",
	rose: "text-rose-text",
	violet: "text-primary",
};

/** Row of saturated dots — the spectrum echo, now round (less pixel). */
export const SpectrumDots = ({ size = 8 }: { size?: number }) => (
	<div aria-hidden="true" className="flex gap-1.5">
		{SPECTRUM.map((hue) => (
			<span
				key={hue}
				className="rounded-full"
				style={{
					width: size,
					height: size,
					background: `var(--${hue}-full)`,
				}}
			/>
		))}
	</div>
);

/** Mono section eyebrow with a saturated round marker. */
export const Eyebrow = ({
	hue,
	children,
}: {
	hue: Hue;
	children: ReactNode;
}) => (
	<div
		className={`mb-4 flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.12em] uppercase ${EYEBROW_TEXT[hue]}`}
	>
		<span
			aria-hidden="true"
			className="size-2.5 rounded-full"
			style={{ background: `var(--${hue}-full)` }}
		/>
		{children}
	</div>
);

/** Shared section shell — consistent rhythm across the page. */
export const Section = ({
	id,
	className = "",
	children,
}: {
	id?: string;
	className?: string;
	children: ReactNode;
}) => (
	<section id={id} className={`px-6 py-20 sm:py-28 ${className}`}>
		<div className="mx-auto w-full max-w-5xl">{children}</div>
	</section>
);
