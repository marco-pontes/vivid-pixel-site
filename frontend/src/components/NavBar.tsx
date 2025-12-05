"use client";

import type { FunctionComponent } from "@/types/types.ts";
import { MouseEventHandler, useRef } from "react";
import Link from "next/link";

export const NavBar = (): FunctionComponent => {
	const ref = useRef<HTMLInputElement>(null);

	const navigationClick = (): MouseEventHandler => () => {
		if (ref.current) ref.current.checked = !ref.current?.checked;
	};

	return (
		<div className="navigation">
			<input
				className="navigation__checkbox"
				id="navi-toggle"
				type="checkbox"
				ref={ref}
			/>
			<label className="navigation__button" htmlFor="navi-toggle">
				<span className="navigation__icon"></span>
			</label>
			<div className="navigation__background">&nbsp;</div>

			<nav className="navigation__nav">
				<ul className="navigation__list">
					<li className="navigation__item">
						<Link className="navigation__link" href="/about">
							<span>01</span>About Vivid Pixel{" "}
						</Link>
					</li>
					<li className="navigation__item">
						<Link
							className="navigation__link"
							onClick={navigationClick()}
							href="/#section-features"
						>
							<span>02</span>Technology
						</Link>
					</li>
					<li className="navigation__item">
						<Link
							className="navigation__link"
							onClick={navigationClick()}
							href="/#section-prices"
						>
							<span>03</span>Prices
						</Link>
					</li>
					<li className="navigation__item">
						<Link
							className="navigation__link"
							onClick={navigationClick()}
							href="/#section-developers"
						>
							<span>04</span>Developers
						</Link>
					</li>
					<li className="navigation__item">
						<Link
							className="navigation__link"
							onClick={navigationClick()}
							href="/#section-contact"
						>
							<span>05</span>Hire Now
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
