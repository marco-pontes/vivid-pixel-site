import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";

export const Features = (): FunctionComponent => {
	const t = useTranslations("Features");
	return (
		<section className="section-features" id="section-features">
			<div className="row">
				<div className="col-1-of-4">
					<div className="feature-box">
						<i className="feature-box__icon icon-basic-world"></i>
						<h3 className="heading-tertiary u-margin-bottom-small">
							Best Practices
						</h3>
						<p className="feature-box__text">{t("best_practices.text")}</p>
					</div>
				</div>
				<div className="col-1-of-4">
					<div className="feature-box">
						<i className="feature-box__icon icon-basic-compass"></i>
						<h3 className="heading-tertiary u-margin-bottom-small">
							Unit Testing
						</h3>
						<p className="feature-box__text">
							Components covered with fast, reliable unit tests, so features
							ship with confidence and refactors never break your UI.
						</p>
					</div>
				</div>
				<div className="col-1-of-4">
					<div className="feature-box">
						<i className="feature-box__icon icon-basic-map"></i>
						<h3 className="heading-tertiary u-margin-bottom-small">
							E2E Testing
						</h3>
						<p className="feature-box__text">
							Critical user journeys validated end-to-end with Playwright,
							catching regressions before your customers ever do.
						</p>
					</div>
				</div>
				<div className="col-1-of-4">
					<div className="feature-box">
						<i className="feature-box__icon icon-basic-heart"></i>
						<h3 className="heading-tertiary u-margin-bottom-small">
							Code Quality Tools
						</h3>
						<p className="feature-box__text">
							Linting, type safety and CI pipelines enforced on every commit,
							keeping your codebase consistent and release-ready.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
