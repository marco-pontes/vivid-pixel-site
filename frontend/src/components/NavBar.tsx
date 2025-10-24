"use client";

import type { FunctionComponent } from "@/types/types.ts";
import { MouseEventHandler, useState } from "react";

export const NavBar = (): FunctionComponent => {
	const [nav, setNav] = useState(false);

	const navigationClick =
		(dest: string): MouseEventHandler =>
		(event) => {
			event.preventDefault();
			setNav(!nav);
			window.location.assign(dest);
		};

	return (
		<div className="navigation">
			<input
				className="navigation__checkbox"
				id="navi-toggle"
				type="checkbox"
				checked={nav}
			/>
			<label
				className="navigation__button"
				onClick={() => setNav(!nav)}
				htmlFor="navi-toggle"
			>
				<span className="navigation__icon"></span>
			</label>
			<div className="navigation__background">&nbsp;</div>

			<nav className="navigation__nav">
				<ul className="navigation__list">
					<li className="navigation__item">
						<a
							className="navigation__link"
							onClick={navigationClick("about")}
							href="#"
						>
							<span>01</span>About Vivid Pixel{" "}
						</a>
					</li>
					<li className="navigation__item">
						<a
							className="navigation__link"
							onClick={navigationClick("#section-features")}
							href="#"
						>
							<span>02</span>Technology
						</a>
					</li>
					<li className="navigation__item">
						<a
							className="navigation__link"
							onClick={navigationClick("#section-prices")}
							href="#section-prices"
						>
							<span>03</span>Prices
						</a>
					</li>
					<li className="navigation__item">
						<a
							className="navigation__link"
							onClick={navigationClick("#section-developers")}
							href="#section-developers"
						>
							<span>04</span>Developers
						</a>
					</li>
					<li className="navigation__item">
						<a
							className="navigation__link"
							onClick={navigationClick("#section-contact")}
							href="#section-contact"
						>
							<span>05</span>Hire Now
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};
