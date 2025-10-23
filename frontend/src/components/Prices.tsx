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
									<li>1 dedicated developer(Front-end specialist)</li>
									<li>7 working hours</li>
									<li>Follows your schedule</li>
									<li>Continuous Deliveries</li>
									<li>Contract</li>
								</ul>
							</div>
						</div>
						<div className="card__side card__side--back card__side--back-1">
							<div className="card__cta">
								<div className="card__price-box">
									<p className="card__price-only">
										Hourly Rate (140 montlhy hours)
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
									The forest hiker
								</span>
							</h4>
							<div className="card__details">
								<ul>
									<li>7 day tours</li>
									<li>Up to 40 people</li>
									<li>6 tour guides</li>
									<li>Sleep in provided tents</li>
									<li>Difficulty: medium</li>
								</ul>
							</div>
						</div>
						<div className="card__side card__side--back card__side--back-2">
							<div className="card__cta">
								<div className="card__price-box">
									<p className="card__price-only">Only</p>
									<p className="card__price-value">$497</p>
								</div>
								<a href="#popup" className="btn btn--white">
									Book now!
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
									The snow adventurer
								</span>
							</h4>
							<div className="card__details">
								<ul>
									<li>5 day tours</li>
									<li>Up to 15 people</li>
									<li>3 tour guides</li>
									<li>Sleep in provided tents</li>
									<li>Difficulty: hard</li>
								</ul>
							</div>
						</div>
						<div className="card__side card__side--back card__side--back-3">
							<div className="card__cta">
								<div className="card__price-box">
									<p className="card__price-only">Only</p>
									<p className="card__price-value">$697</p>
								</div>
								<a href="#popup" className="btn btn--white">
									Book now!
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="u-center-text u-margin-top-huge">
				<a href="#" className="btn btn--green">
					Discover all tours
				</a>
			</div>
		</section>
	);
};
