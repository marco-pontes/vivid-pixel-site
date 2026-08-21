import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { VMark } from "@/components/brand";

/**
 * Hero — thin tracked uppercase type beside the one loud element: the
 * giant mixed-color brush-pixel V (P2), casting an ink drop-shadow that
 * follows its speckled silhouette. Hatch texture, diagonal exit (P4).
 * The brand line stays in English across locales as a mark.
 */
export const Header = (): FunctionComponent => {
	const t = useTranslations("Hero");

	return (
		<section
			aria-label="Introduction"
			className="seam-b relative overflow-hidden bg-surface pt-40 pb-28"
			id="top"
		>
			<div
				aria-hidden="true"
				className="hatch absolute inset-y-0 left-0 w-24 opacity-60 max-lg:hidden"
			/>
			<div
				aria-hidden="true"
				className="pixel-dissolve absolute top-24 right-0 h-40 w-72 opacity-70"
			/>
			<div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
				<div>
					<h1 className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 max-w-2xl font-display text-5xl font-light tracking-[0.06em] uppercase sm:text-6xl lg:text-7xl">
						{t.rich("title", {
							v: (chunks) => (
								<span
									className="gtext font-normal"
									style={{ "--gt": "var(--grad-sweep)" } as React.CSSProperties}
								>
									{chunks}
								</span>
							),
							d: (chunks) => (
								<span className="font-normal text-brick-text">{chunks}</span>
							),
						})}
					</h1>
					<p className="mt-7 max-w-xl text-lg text-muted-fg">
						{t.rich("sub", {
							s: (chunks) => (
								<strong className="font-semibold text-foreground">
									{chunks}
								</strong>
							),
						})}
					</p>
					<div className="mt-10 flex flex-wrap items-center gap-5">
						<Link
							href="/#section-contact"
							className="bg-primary px-7 py-3 font-mono text-sm font-semibold tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary-hover"
						>
							{t("hireStudio")}
						</Link>
						<Link
							href="/#section-products"
							className="border border-line-strong px-7 py-3 font-mono text-sm font-semibold tracking-wide text-foreground uppercase transition-colors hover:border-foreground"
						>
							{t("seeProducts")}
						</Link>
					</div>
				</div>
				{/* The mixed-color V — the pixel lives here. */}
				<div className="relative mx-auto max-lg:mt-4">
					<VMark
						colored
						size={340}
						className="motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-1000  max-sm:size-56!"
					/>
				</div>
			</div>
		</section>
	);
};
