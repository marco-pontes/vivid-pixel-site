import type { FunctionComponent } from "@/types/types.ts";
import { useTranslations } from "next-intl";

export const Features = (): FunctionComponent => {
	const t = useTranslations("Features");
	return (
		<section className="section-features">
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
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
							minima sit veniam.
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
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
							minima sit veniam.
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
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
							minima sit veniam.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
