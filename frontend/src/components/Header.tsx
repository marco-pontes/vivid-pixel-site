import type { FunctionComponent } from "@/types/types.ts";
import Image from "next/image";

export const Header = (): FunctionComponent => {
	return (
		<header className="header">
			<div className="header__logo-box">
				<Image
					priority
					alt="Logo"
					className="header__logo"
					height={35}
					src="/images/logo-white-2x.png"
					width={37}
				/>
			</div>
			<div className="header__text-box">
				<h1 className="heading-primary">
					<span className="heading-primary--main">
						<Image
							alt="Full logo"
							className="footer__logo"
							height={150}
							src="/images/vivid-white-2x.png"
							width={500}
						/>
					</span>
					<span className="heading-primary--sub">
						Smart Software Development
					</span>
				</h1>
				<a className="btn btn--white btn--animated" href="#section-prices">
					Discover our services
				</a>
			</div>
		</header>
	);
};

export default Header;
