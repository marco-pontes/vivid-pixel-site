import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../../globals.css";
import { routing, RTL_LOCALES, type Locale } from "@/i18n/routing";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

const SITE_URL = "https://vivid-pixel.com.br";

// Display face — the studio's own voice. Body text stays on the family's
// system-stack convention (see globals.css --font-sans). Non-Latin scripts
// (zh, hi, ar, bn) fall through to their native system fonts.
const bricolage = Bricolage_Grotesque({
	subsets: ["latin"],
	variable: "--font-bricolage",
	display: "swap",
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

/** URL for a path in a locale, honoring the "as-needed" prefix strategy. */
const localeUrl = (locale: string, path = "") =>
	locale === routing.defaultLocale
		? `${SITE_URL}${path || "/"}`
		: `${SITE_URL}/${locale}${path}`;

const languageAlternates = (path = "") => ({
	...Object.fromEntries(
		routing.locales.map((locale) => [locale, localeUrl(locale, path)])
	),
	"x-default": localeUrl(routing.defaultLocale, path),
});

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "Meta" });

	return {
		metadataBase: new URL(SITE_URL),
		title: t("title"),
		description: t("description"),
		alternates: {
			canonical: localeUrl(locale),
			languages: languageAlternates(),
		},
		openGraph: {
			type: "website",
			url: localeUrl(locale),
			siteName: "Vivid Pixel",
			title: t("title"),
			description: t("description"),
			locale,
			images: [{ url: "/images/hero.jpg", width: 1200, height: 800 }],
		},
		twitter: {
			card: "summary_large_image",
			title: t("title"),
			description: t("description"),
		},
		robots: { index: true, follow: true },
	};
}

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f7f5fa" },
		{ media: "(prefers-color-scheme: dark)", color: "#0d0b12" },
	],
};

/** Organization + WebSite structured data for rich results. */
const JSON_LD = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": `${SITE_URL}/#organization`,
			name: "Vivid Pixel",
			url: SITE_URL,
			logo: `${SITE_URL}/images/vivid-red-2x.png`,
			founder: { "@type": "Person", name: "Marco Aurelio Pontes" },
			sameAs: ["https://github.com/marco-pontes/"],
			knowsAbout: ["React", "Next.js", "TypeScript", "Frontend engineering"],
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: SITE_URL,
			name: "Vivid Pixel",
			publisher: { "@id": `${SITE_URL}/#organization` },
			inLanguage: [...routing.locales],
		},
	],
};

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();
	setRequestLocale(locale);

	const dir = RTL_LOCALES.includes(locale as Locale) ? "rtl" : "ltr";

	// suppressHydrationWarning: next-themes stamps the .dark class on <html>
	// before hydration; without this React reports a mismatch on every load.
	return (
		<html
			lang={locale}
			dir={dir}
			suppressHydrationWarning
			className={bricolage.variable}
		>
			<body>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
				/>
				<NextIntlClientProvider>
					<Provider>
						{children}
						<Toaster />
					</Provider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
