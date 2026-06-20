import type { FunctionComponent } from "@/types/types.ts";
import Image from "next/image";

export const Modal = (): FunctionComponent => {
	return (
		<div className="popup" id="popup">
			<div className="popup__content">
				<div className="popup__left">
					<Image
						alt="Engineer working on frontend code"
						className="popup__img"
						height={400}
						src="/images/code-4.jpg"
						width={400}
					/>
					<Image
						alt="Code on a developer's screen"
						className="popup__img"
						height={400}
						src="/images/code-5.jpg"
						width={400}
					/>
				</div>
				<div className="popup__right">
					<a className="popup__close" href="#section-prices">
						&times;
					</a>
					<h2 className="heading_secondary u-margin-bottom-xs">
						Let&rsquo;s build your frontend
					</h2>
					<h3 className="heading-tertiary u-margin-bottom-xs">
						How our engagement works
					</h3>
					<p className="popup__text">
						Tell us what you&rsquo;re building and we&rsquo;ll match you with
						senior front-end engineers in days, not months. You stay in control
						&ndash; your tools, your workflow, your codebase. We work on a simple
						monthly contract, so you can scale the team up when you&rsquo;re
						shipping fast and dial it down when you&rsquo;re not. No recruitment
						fees, no overhead, no long-term lock-in. Book a quick call and
						we&rsquo;ll scope the right team for your roadmap.
					</p>
					<a className="btn btn--green" href="#section-contact">
						Hire now
					</a>
				</div>
			</div>
		</div>
	);
};
