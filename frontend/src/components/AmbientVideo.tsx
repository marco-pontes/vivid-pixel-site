"use client";

import { useEffect, useState } from "react";

/**
 * Ambient background video, gated on the user's motion preference: with
 * prefers-reduced-motion the element never mounts, so nothing downloads or
 * plays (display:none alone would keep the video playing invisibly).
 */
export const AmbientVideo = () => {
	const [allowed, setAllowed] = useState(false);

	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setAllowed(!query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);

	if (!allowed) return null;

	return (
		<video
			autoPlay
			loop
			muted
			playsInline
			aria-hidden="true"
			className="absolute inset-0 size-full object-cover opacity-10"
		>
			<source src="/images/video.webm" type="video/webm" />
			<source src="/images/video.mp4" type="video/mp4" />
		</video>
	);
};
