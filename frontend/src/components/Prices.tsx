import { useTranslations } from "next-intl";

export const Prices = () => {
	const t = useTranslations("Prices");
	return (
		<section className="section-prices" id="section-prices">
			<div className="u-center-text u-margin-bottom-big">
				<h2 className="heading-secondary">{t("title")}</h2>
			</div>
			<div className="row">
				<div className="col-1-of-3">
					<div className="card">
						<div className="card__side card__side--front">
							<div className="card__picture card__picture--1"></div>
							<h4 className="card__heading">
								<span className="card__heading-span card__heading-span--1">
									{t("card1.title")}
								</span>
							</h4>
							<div className="card__details">
								<ul>
									<li>1 dedicated front-end specialist</li>
									<li>Senior React, Next.js &amp; TypeScript</li>
									<li>Works in your timezone</li>
									<li>Continuous delivery</li>
									<li>Flexible monthly contract</li>
								</ul>
							</div>
						</div>
						<div className="card__side card__side--back card__side--back-1">
							<div className="card__cta">
								<div className="card__price-box">
									<p className="card__price-only">
										Hourly rate (140 monthly hours)
									</p>
									<p className="card__price-value">$42</p>
								</div>
								<a href="#popup" className="btn btn--white">
									Hire now!
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-1-of-3">
					<div className="card">
						<div className="card__side card__side--front">
							<div className="card__picture card__picture--2"></div>
							<h4 className="card__heading">
								<span className="card__heading-span card__heading-span--2">
									{t("card2.title")}
								</span>
							</h4>
							<div className="card__details">
								<ul>
									<li>3 dedicated front-end engineers</li>
									<li>Shared senior tech lead</li>
									<li>Code reviews &amp; pair programming</li>
									<li>Continuous delivery</li>
									<li>Scale up or down anytime</li>
								</ul>
							</div>
						</div>
						<div className="card__side card__side--back card__side--back-2">
							<div className="card__cta">
								<div className="card__price-box">
									<p className="card__price-only">Hourly rate (per developer)</p>
									<p className="card__price-value">$38</p>
								</div>
								<a href="#popup" className="btn btn--white">
									Hire now!
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-1-of-3">
					<div className="card">
						<div className="card__side card__side--front">
							<div className="card__picture card__picture--3"></div>
							<h4 className="card__heading">
								<span className="card__heading-span card__heading-span--3">
									{t("card3.title")}
								</span>
							</h4>
							<div className="card__details">
								<ul>
									<li>Full cross-functional team</li>
									<li>Front-end, QA &amp; tech lead</li>
									<li>From discovery to deployment</li>
									<li>Dedicated project manager</li>
									<li>Fixed scope or monthly retainer</li>
								</ul>
							</div>
						</div>
						<div className="card__side card__side--back card__side--back-3">
							<div className="card__cta">
								<div className="card__price-box">
									<p className="card__price-only">Hourly rate (per specialist)</p>
									<p className="card__price-value">$36</p>
								</div>
								<a href="#popup" className="btn btn--white">
									Hire now!
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="u-center-text u-margin-top-huge">
				<a href="#section-contact" className="btn btn--green">
					Book a free consultation
				</a>
			</div>
		</section>
	);
};
