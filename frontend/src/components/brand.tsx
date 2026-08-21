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
 * The brand V (P2). `colored` renders the official colored logo SVG
 * as-is — never repainted. Otherwise the official silhouette is a CSS
 * mask painted with exactly one color via `paint`.
 */
export const VMark = ({
	size = 16,
	paint,
	colored = false,
	className = "",
}: {
	size?: number;
	paint?: string;
	colored?: boolean;
	className?: string;
}) =>
	colored ? (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src="/images/brand/v-colored.svg"
			alt=""
			aria-hidden="true"
			width={size}
			height={size}
			className={`inline-block shrink-0 select-none ${className}`}
		/>
	) : (
		<span
			aria-hidden="true"
			className={`vmask inline-block shrink-0 ${className}`}
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
