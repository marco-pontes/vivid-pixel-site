import type { FunctionComponent } from "@/types/types.ts";
import Image from "next/image";
import { AmbientVideo } from "@/components/AmbientVideo";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/brand";

const SKILLS = [
	"JavaScript",
	"TypeScript",
	"React",
	"Next.js",
	"HTML 5 & CSS 3",
	"Python",
	"Ruby",
] as const;

/**
 * Founder — the photo breaks the square rule on purpose: a blob mask (G1's
 * earned exception) with a hard pink drop-shadow that follows the shape.
 */
export const Developers = (): FunctionComponent => {
	const t = useTranslations("Team");
	return (
		<section
			id="section-team"
			className="relative overflow-hidden px-6 py-20 sm:py-28"
		>
			<AmbientVideo />
			<div className="relative mx-auto w-full max-w-5xl">
				<Eyebrow hue="rose">{t("eyebrow")}</Eyebrow>
				<div
					className="glow reveal max-w-2xl rounded-3xl border border-line bg-surface/95 p-6 backdrop-blur-sm sm:p-8"
					style={
						{
							"--gl": "color-mix(in srgb, var(--rose-full) 35%, transparent)",
						} as React.CSSProperties
					}
				>
					<div className="flex flex-wrap items-start gap-7">
						<Image
							alt="Marco Aurelio, senior software engineer and founder of Vivid Pixel"
							className="blob size-24 object-cover [filter:drop-shadow(6px_6px_0_var(--rose-full))]"
							height={210}
							src="/images/marco.jpg"
							width={210}
						/>
						<div className="min-w-60 flex-1">
							<h2 className="font-display text-2xl font-extrabold tracking-tight">
								Marco Aurelio Pontes
							</h2>
							<p className="mt-0.5 font-mono text-sm text-muted-fg">
								{t("role")}
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted-fg">
								{t("bio")}
							</p>
							<p className="mt-2 text-sm leading-relaxed text-muted-fg">
								<a
									className="font-mono font-semibold text-primary hover:underline"
									href="https://github.com/marco-pontes/"
									target="_blank"
									rel="noopener noreferrer"
								>
									GitHub <span aria-hidden="true">&rarr;</span>
								</a>
							</p>
							<div className="mt-5 flex flex-wrap gap-2">
								{SKILLS.map((skill) => (
									<span
										key={skill}
										className="rounded-full bg-rose-tint px-3 py-1 font-mono text-xs font-semibold text-rose-text"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
