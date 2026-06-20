import type { FunctionComponent } from "@/types/types.ts";
import Image from "next/image";
import { memo } from "react";
import { useTranslations } from "next-intl";

export const About = memo(function About(): FunctionComponent {
	const t = useTranslations("About");

	return (
		<section className="section-about">
			<div className="u-center-text u-margin-bottom-big">
				<h2 className="heading-secondary">{t("title")}</h2>
			</div>

			<div className="row">
				<div className="col-1-of-2">
					<h3 className="heading-tertiary u-margin-bottom-small">
						Senior frontend specialists, ready to ship
					</h3>
					<p className="paragraph">
						Vivid Pixel embeds experienced React, Next.js and TypeScript
						engineers directly into your team. No long ramp-ups, no junior
						guesswork &ndash; just clean, accessible, high-performance
						interfaces built to your standards and shipped on your schedule.
					</p>

					<h3 className="heading-tertiary u-margin-bottom-small">
						Outsourcing without the headaches
					</h3>
					<p className="paragraph">
						Skip the cost, overhead and risk of building an in-house frontend
						team. You get vetted Brazilian engineers working in your timezone,
						transparent contracts and continuous delivery &ndash; scaling up or
						down whenever your roadmap changes.
					</p>

					<a className="btn-text" href="/about">
						See how we work &rarr;
					</a>
				</div>
				<div className="col-1-of-2">
					<div className="composition">
						<Image
							alt="Photo 1"
							className="composition__photo composition__photo--p1"
							sizes="(max-width: 37.5em) 20vw, (max-width: 56.25em) 30vw, 300px"
							src="/images/sourcing-2.png"
							width={200}
							height={200}
						/>
						<Image
							alt="Photo 2"
							className="composition__photo composition__photo--p2"
							sizes="(max-width: 37.5em) 20vw, (max-width: 56.25em) 30vw, 300px"
							src="/images/rdstation-3.png"
							width={200}
							height={200}
						/>
						<Image
							alt="Photo 3"
							className="composition__photo composition__photo--p3"
							sizes="(max-width: 37.5em) 20vw, (max-width: 56.25em) 30vw, 300px"
							src="/images/rdstation-2.gif"
							width={200}
							height={200}
							unoptimized
						/>
					</div>
				</div>
			</div>
		</section>
	);
});
