import type { FunctionComponent } from "@/types/types.ts";
import Link from "next/link";
import { PixelStrip } from "@/components/brand";

/**
 * Hero. Products lead the story; violet keeps the paying CTA primary.
 * The single gentle diagonal at the bottom is the one piece of the old
 * site's geometry kept as heritage.
 */
export const Header = (): FunctionComponent => {
	return (
		<section
			aria-label="Introduction"
			className="bg-surface px-6 pt-32 pb-24 sm:pb-32 [clip-path:polygon(0_0,100%_0,100%_calc(100%-3rem),0_100%)]"
			id="top"
		>
			<div className="mx-auto w-full max-w-5xl">
				<div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
					<PixelStrip />
				</div>
				<h1 className="mt-8 max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl">
					We build vivid software<span className="text-violet-full">.</span>
				</h1>
				{/* The functional headline: what a first-time visitor can buy. */}
				<p className="mt-5 max-w-xl text-lg text-muted-fg sm:text-xl">
					Products and senior frontend engineering from the studio behind{" "}
					<strong className="font-semibold text-foreground">Viva</strong> and{" "}
					<strong className="font-semibold text-foreground">Vivid Feed</strong>.
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<Link
						href="/#section-contact"
						className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-card transition-colors hover:bg-primary-hover"
					>
						Hire the studio
					</Link>
					<Link
						href="/#section-products"
						className="rounded-md border border-line-strong bg-inset px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-line"
					>
						See our products
					</Link>
				</div>
			</div>
		</section>
	);
};
