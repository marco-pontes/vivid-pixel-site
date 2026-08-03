import type { FunctionComponent } from "@/types/types.ts";
import Link from "next/link";
import { PixelStrip } from "@/components/brand";

/**
 * Hero — the loudest block on the page. Pixel-grid field, spinning spectrum
 * ring, gradient display word, hard-shadowed square CTAs, diagonal exit (G4).
 */
export const Header = (): FunctionComponent => {
	return (
		<section
			aria-label="Introduction"
			className="seam-b relative overflow-hidden bg-surface px-6 pt-36 pb-32"
			id="top"
		>
			<div aria-hidden="true" className="pixel-field absolute inset-0" />
			<div
				aria-hidden="true"
				className="spectrum-ring absolute -top-28 -right-28 hidden size-[26rem] opacity-70 md:block dark:opacity-90"
			/>
			<div className="relative mx-auto w-full max-w-5xl">
				<div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
					<PixelStrip />
				</div>
				<h1 className="mt-10 max-w-4xl font-display text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
					We build{" "}
					<span className="gtext" style={{ "--gt": "var(--grad-sweep)" } as React.CSSProperties}>
						vivid
					</span>{" "}
					software<span className="text-brick-text">.</span>
				</h1>
				<p className="mt-6 max-w-xl text-lg text-muted-fg sm:text-xl">
					Products and senior frontend engineering from the studio behind{" "}
					<strong className="font-semibold text-foreground">Viva</strong> and{" "}
					<strong className="font-semibold text-foreground">Vivid Feed</strong>.
				</p>
				<div className="mt-10 flex flex-wrap gap-5">
					<Link
						href="/#section-contact"
						className="cut-tr hard-sm press inline-block bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
					>
						Hire the studio
					</Link>
					<Link
						href="/#section-products"
						className="gborder hard-sm press inline-block px-6 py-3 text-sm font-semibold text-foreground"
					>
						See our products
					</Link>
				</div>
			</div>
		</section>
	);
};
