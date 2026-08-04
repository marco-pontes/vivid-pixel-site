import type { CSSProperties } from "react";
import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Hero — mesh-gradient glow blobs (the common move) under a squiggle-
 * underlined gradient word and a tagline marquee (the uncommon ones).
 * The brand line stays in English across locales as a mark; the localized
 * subheadline carries the meaning.
 */
const MarqueeContent = ({
	items,
	hidden,
}: {
	items: string[];
	hidden?: boolean;
}) => (
	<span
		aria-hidden={hidden || undefined}
		className="marquee-track font-mono text-xs font-semibold tracking-[0.14em] text-muted-fg uppercase"
	>
		{items.map((item) => (
			<span key={item} className="flex items-center gap-10">
				{item}
				<span aria-hidden="true" className="text-ochre-text">
					&#9670;
				</span>
			</span>
		))}
	</span>
);

export const Header = (): FunctionComponent => {
	const t = useTranslations("Hero");
	const marqueeItems = [t("marquee1"), t("marquee2"), t("marquee3")];

	return (
		<section
			aria-label="Introduction"
			className="relative overflow-hidden bg-surface pt-36"
			id="top"
		>
			{/* Mesh glow — each blob borrows a product gradient. */}
			<div
				aria-hidden="true"
				className="absolute -top-40 -right-32 size-[34rem] rounded-full opacity-35 blur-[110px] dark:opacity-45"
				style={{ background: "var(--grad-viva)" } as CSSProperties}
			/>
			<div
				aria-hidden="true"
				className="absolute top-40 -left-40 size-[30rem] rounded-full opacity-30 blur-[110px] dark:opacity-40"
				style={{ background: "var(--grad-feed)" } as CSSProperties}
			/>
			<div className="relative mx-auto w-full max-w-5xl px-6 pb-24">
				{/* Brand line — intentionally English in every locale. */}
				<h1
					dir="ltr"
					className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 max-w-4xl text-start font-display text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
				>
					We build{" "}
					<span className="relative inline-block">
						<span
							className="gtext"
							style={{ "--gt": "var(--grad-sweep)" } as CSSProperties}
						>
							vivid
						</span>
						{/* Hand-drawn squiggle underline */}
						<svg
							aria-hidden="true"
							viewBox="0 0 200 14"
							className="absolute -bottom-2 left-0 w-full"
							preserveAspectRatio="none"
						>
							<path
								d="M3 10 Q 25 3, 50 9 T 100 9 T 150 9 T 197 8"
								fill="none"
								stroke="var(--ochre-full)"
								strokeWidth="5"
								strokeLinecap="round"
							/>
						</svg>
					</span>{" "}
					software<span className="text-brick-text">.</span>
				</h1>
				<p className="mt-7 max-w-xl text-lg text-muted-fg sm:text-xl">
					{t.rich("sub", {
						s: (chunks) => (
							<strong className="font-semibold text-foreground">{chunks}</strong>
						),
					})}
				</p>
				<div className="mt-10 flex flex-wrap items-center gap-6">
					<Link
						href="/#section-contact"
						className="glow rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
					>
						{t("hireStudio")}
					</Link>
					<Link
						href="/#section-products"
						className="text-sm font-semibold text-foreground underline decoration-2 underline-offset-4 hover:text-primary"
					>
						{t("seeProducts")} <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
			{/* Tagline marquee — doubles as a products teaser. */}
			<div className="marquee relative border-y border-line bg-background py-3" dir="ltr">
				<MarqueeContent items={marqueeItems} />
				<MarqueeContent items={marqueeItems} hidden />
			</div>
		</section>
	);
};
