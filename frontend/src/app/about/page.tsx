import { NavBar } from "@/components/NavBar";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function About() {
	return (
		<>
			<NavBar></NavBar>
			<Header></Header>
			<main>
				<section className="section-about">
					<div className="u-center-text u-margin-bottom-big">
						<h2 className="heading-secondary">Who we are</h2>
					</div>

					<div className="row">
						<div className="col-1-of-2">
							<h3 className="heading-tertiary u-margin-bottom-small">
								Frontend is all we do
							</h3>
							<p className="paragraph">
								Vivid Pixel is a software studio focused exclusively on the
								frontend. While generalist agencies spread themselves thin, we
								go deep on the part of your product your customers actually see
								and touch &ndash; building fast, accessible, pixel-perfect
								interfaces with React, Next.js and TypeScript.
							</p>

							<h3 className="heading-tertiary u-margin-bottom-small">
								A team that plugs into yours
							</h3>
							<p className="paragraph">
								We&rsquo;re a nearshore team of senior Brazilian engineers who
								work as an extension of your own. We adopt your tools, your
								rituals and your definition of done &ndash; so collaboration
								feels in-house, not outsourced.
							</p>
						</div>

						<div className="col-1-of-2">
							<h3 className="heading-tertiary u-margin-bottom-small">
								Why companies outsource to us
							</h3>
							<p className="paragraph">
								Hiring senior frontend talent is slow and expensive. With Vivid
								Pixel you skip the recruitment, overhead and risk: get vetted
								engineers working in your timezone within days, on a flexible
								contract you can scale up or down as your roadmap shifts.
							</p>

							<h3 className="heading-tertiary u-margin-bottom-small">
								Our promise
							</h3>
							<p className="paragraph">
								Production-grade code, tested and reviewed, delivered
								continuously. Clear communication, transparent pricing and no
								long-term lock-in. We measure our success by the features you
								ship &ndash; not the hours we bill.
							</p>
						</div>
					</div>

					<div className="u-center-text u-margin-top-huge">
						<a className="btn btn--green" href="/#section-contact">
							Hire our team
						</a>
					</div>
				</section>
			</main>
			<Footer></Footer>
		</>
	);
}
