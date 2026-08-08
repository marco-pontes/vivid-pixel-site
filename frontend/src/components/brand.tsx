import type { CSSProperties, ReactNode } from "react";

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

/**
 * The brand V, painted with any color or gradient via CSS mask (P2).
 * `paint` accepts a CSS color/gradient; `mixed` uses the four logo
 * colorways as hard-stop quadrants.
 */
export const VMark = ({
	size = 16,
	paint,
	mixed = false,
	className = "",
}: {
	size?: number;
	paint?: string;
	mixed?: boolean;
	className?: string;
}) => (
	<span
		aria-hidden="true"
		className={`vmask inline-block shrink-0 ${mixed ? "vpaint-mixed" : ""} ${className}`}
		style={
			{
				width: size,
				height: size,
				...(paint ? { "--vpaint": paint } : {}),
			} as CSSProperties
		}
	/>
);

/** Mono section eyebrow marked with a small V in the section's hue. */
export const Eyebrow = ({
	hue,
	children,
}: {
	hue: Hue;
	children: ReactNode;
}) => (
	<div
		className={`mb-5 flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.14em] uppercase ${EYEBROW_TEXT[hue]}`}
	>
		<VMark
			size={14}
			paint={hue === "violet" ? "var(--violet-full)" : `var(--${hue}-full)`}
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
