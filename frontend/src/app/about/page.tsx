import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Eyebrow, Section } from "@/components/brand";

export const metadata: Metadata = {
	title: "About — Vivid Pixel",
	description:
		"Vivid Pixel is a software studio focused exclusively on the frontend — the team behind Viva and Vivid Feed.",
};

const BLOCKS = [
	{
		title: "Frontend is all we do",
		text: "Vivid Pixel is a software studio focused exclusively on the frontend. While generalist agencies spread themselves thin, we go deep on the part of your product your customers actually see and touch – building fast, accessible, pixel-perfect interfaces with React, Next.js and TypeScript.",
	},
	{
		title: "A team that plugs into yours",
		text: "We’re a nearshore team of senior Brazilian engineers who work as an extension of your own. We adopt your tools, your rituals and your definition of done – so collaboration feels in-house, not outsourced.",
	},
	{
		title: "Why companies outsource to us",
		text: "Hiring senior frontend talent is slow and expensive. With Vivid Pixel you skip the recruitment, overhead and risk: get vetted engineers working in your timezone within days, on a flexible contract you can scale up or down as your roadmap shifts.",
	},
	{
		title: "Our promise",
		text: "Production-grade code, tested and reviewed, delivered continuously. Clear communication, transparent pricing and no long-term lock-in. We measure our success by the features you ship – not the hours we bill.",
	},
] as const;

export default function About() {
	return (
		<>
			<NavBar />
			<main className="pt-14">
				<Section>
					<Eyebrow hue="violet">
						About the studio
					</Eyebrow>
					<h1 className="mb-6 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
						Who we <span className="gtext" style={{ "--gt": "var(--grad-viva)" } as React.CSSProperties}>are</span>
					</h1>

					<div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
						{BLOCKS.map((block) => (
							<div key={block.title}>
								<h2 className="mb-2 font-display text-xl font-bold tracking-tight">
									{block.title}
								</h2>
								<p className="leading-relaxed text-muted-fg">{block.text}</p>
							</div>
						))}
					</div>
					<div className="mt-14">
						<Link
							href="/#section-contact"
							className="glow rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
						>
							Hire our team
						</Link>
					</div>
				</Section>
			</main>
			<Footer />
		</>
	);
}
