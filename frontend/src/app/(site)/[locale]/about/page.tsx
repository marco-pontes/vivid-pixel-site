import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Eyebrow, Section } from "@/components/brand";

const SITE_URL = "https://vivid-pixel.com.br";

const localeUrl = (locale: string, path = "") =>
	locale === routing.defaultLocale
		? `${SITE_URL}${path || "/"}`
		: `${SITE_URL}/${locale}${path}`;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Meta" });
	return {
		title: t("aboutTitle"),
		description: t("aboutDescription"),
		alternates: {
			canonical: localeUrl(locale, "/about"),
			languages: {
				...Object.fromEntries(
					routing.locales.map((l) => [l, localeUrl(l, "/about")])
				),
				"x-default": localeUrl(routing.defaultLocale, "/about"),
			},
		},
	};
}

const BLOCKS = ["b1", "b2", "b3", "b4"] as const;

function AboutContent() {
	const t = useTranslations("About");
	return (
		<Section>
			<Eyebrow hue="violet">{t("eyebrow")}</Eyebrow>
			<h1 className="mb-6 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
				{t.rich("title", {
					g: (chunks) => (
						<span
							className="gtext"
							style={{ "--gt": "var(--grad-viva)" } as CSSProperties}
						>
							{chunks}
						</span>
					),
				})}
			</h1>

			<div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
				{BLOCKS.map((block) => (
					<div key={block}>
						<h2 className="mb-2 font-display text-xl font-bold tracking-tight">
							{t(`${block}Title`)}
						</h2>
						<p className="leading-relaxed text-muted-fg">{t(`${block}Text`)}</p>
					</div>
				))}
			</div>
			<div className="mt-14">
				<Link
					href="/#section-contact"
					className="glow rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
				>
					{t("cta")}
				</Link>
			</div>
		</Section>
	);
}

export default async function About({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<NavBar />
			<main className="pt-14">
				<AboutContent />
			</main>
			<Footer />
		</>
	);
}
