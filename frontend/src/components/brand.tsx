import type { CSSProperties, ReactNode } from "react";

/**
 * The nine-hue spectrum, in site-section order. Each entry pairs the muted
 * page-level hue with its full-saturation anchor — the hex the product
 * actually ships. Rest state is quiet; hover answers at full volume (R3).
 */
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

/* Full saturation is the rest state now — the strip IS the voice (G3). */
const cellVars = (hue: Hue): CSSProperties =>
	({
		"--c": `var(--${hue}-full)`,
	}) as CSSProperties;

export const PixelStrip = ({ size = 28 }: { size?: number }) => (
	<div
		className="flex flex-wrap gap-1.5"
		role="img"
		aria-label="The Vivid Pixel spectrum — nine muted hues drawn from the product family's colors"
	>
		{SPECTRUM.map((hue) => (
			<span
				key={hue}
				className="pixel-cell"
				style={{ ...cellVars(hue), width: size, height: size }}
			/>
		))}
	</div>
);

/** Mono section eyebrow. The 10px pixel is full saturation — punctuation. */
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
			className="size-2.5"
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
