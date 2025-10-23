import type { FunctionComponent } from "@/types/types.ts";
import Image from "next/image";
import { memo } from "react";
import { useTranslations } from "next-intl";
import { Box, HStack, Tag } from "@chakra-ui/react";

export const Developers = memo(function Stories(): FunctionComponent {
	const t = useTranslations("Developers");
	console.count("Stories Renders");
	const size = "xl";
	return (
		<section className="section-stories">
			<div className="bg-video">
				<video autoPlay loop muted className="bg-video__content">
					<source src="/images/video.mp4" type="video/mp4" />
					<source src="/images/video.webm" type="video/webm" />
					Your browser is not supported
				</video>
			</div>
			<div className="u-center-text u-margin-bottom-big">
				<h2 className="heading-secondary">{t("title")}</h2>
			</div>
			<div className="row">
				<div className="story">
					<figure className="story__shape">
						<Image
							alt="Person on a tour"
							className="story__image"
							height={210}
							src="/images/marco.jpg"
							width={210}
						/>
						<figcaption className="story__caption">Marco Aurelio</figcaption>
					</figure>
					<div className="story__text">
						<h3 className="heading-tertiary u-margin-bottom-small">
							<a href="Marco_Aurelio_Pontes_-_Senior_Software_Engineer_.pdf">
								Senior Front-end Engineer
							</a>
						</h3>
						<p>
							Dynamic Senior Software Engineer with 15 years of experience
							driving innovative solutions and enhancing product performance in
							the software development landscape.
						</p>
						<p>
							Proficient in front-end technologies, particularly React,
							JavaScript and Typescript with a strong background in implementing
							micro-frontend architectures and optimizing CI/CD processes.
						</p>
						<p>
							Proven ability to lead technical teams, mentor junior engineers,
							and enhance collaboration across multi-disciplinary teams,
							resulting in heightened efficiency and system stability.
						</p>
						<Box mt={"5"}>
							<HStack>
								{[
									"JavaScript",
									"Typescript",
									"React",
									"Next.js",
									"HTML 5 & CSS 3",
									"Python",
									"Ruby",
								].map((skill) => (
									<Tag.Root
										size={size}
										rounded="full"
										p={"2"}
										variant="solid"
										backgroundColor={"var(--chakra-colors-red-700)"}
									>
										<Tag.Label>{skill}</Tag.Label>
									</Tag.Root>
								))}
							</HStack>
						</Box>
					</div>
				</div>
			</div>
			{/*<div className="row">*/}
			{/*	<div className="story">*/}
			{/*		<figure className="story__shape">*/}
			{/*			<Image*/}
			{/*				alt="Person on a tour"*/}
			{/*				className="story__image"*/}
			{/*				height={400}*/}
			{/*				src="/images/nat-9.jpg"*/}
			{/*				width={400}*/}
			{/*			/>*/}
			{/*			<figcaption className="story__caption">Coming Soon</figcaption>*/}
			{/*		</figure>*/}
			{/*		<div className="story__text">*/}
			{/*			<h3 className="heading-tertiary u-margin-bottom-small">*/}
			{/*				Coming Soon*/}
			{/*			</h3>*/}
			{/*			<p>New developers will be added to the team soon.</p>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
			{/*<div className="u-center-text u-margin-top-huge">*/}
			{/*	<a className="btn-text" href="#">*/}
			{/*		Read all stories &rarr;*/}
			{/*	</a>*/}
			{/*</div>*/}
		</section>
	);
});
