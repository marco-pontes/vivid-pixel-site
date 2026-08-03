import type { FunctionComponent } from "@/types/types.ts";
import Image from "next/image";
import { AmbientVideo } from "@/components/AmbientVideo";
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

/** Founder section — boutique honesty. Rose is the team hue. */
export const Developers = (): FunctionComponent => {
	return (
		<section id="section-team" className="relative overflow-hidden px-6 py-20 sm:py-28">
			{/* Ambient video, kept from the old site — its subtlest idea. */}
			<AmbientVideo />
			<div className="relative mx-auto w-full max-w-5xl">
				<Eyebrow hue="rose">
					Who you&rsquo;ll work with
				</Eyebrow>
				<div className="max-w-2xl rounded-xl border border-line bg-surface/90 p-6 shadow-card sm:p-8">
					<div className="flex flex-wrap items-start gap-6">
						<Image
							alt="Marco Aurelio, senior software engineer and founder of Vivid Pixel"
							className="size-20 rounded-full object-cover"
							height={210}
							src="/images/marco.jpg"
							width={210}
						/>
						<div className="min-w-60 flex-1">
							<h2 className="font-display text-xl font-bold tracking-tight">
								Marco Aurelio Pontes
							</h2>
							<p className="mt-0.5 text-sm text-muted-fg">
								Senior software engineer · 15 years
							</p>
							<p className="mt-3 text-sm leading-relaxed text-muted-fg">
								Micro-frontends, CI/CD, technical leadership — the engineer who
								built both products above. When you hire Vivid Pixel, this is
								who shows up.
							</p>
							<p className="mt-2 text-sm leading-relaxed text-muted-fg">
								<a
									className="font-medium text-primary hover:underline"
									href="https://github.com/marco-pontes/"
									target="_blank"
									rel="noopener noreferrer"
								>
									GitHub <span aria-hidden="true">&rarr;</span>
								</a>
							</p>
							<div className="mt-4 flex flex-wrap gap-2">
								{SKILLS.map((skill) => (
									<span
										key={skill}
										className="rounded-full bg-rose-tint px-3 py-1 text-xs font-medium text-rose-text"
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
