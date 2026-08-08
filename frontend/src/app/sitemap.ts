import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://vivid-pixel.com.br";

const localeUrl = (locale: string, path = "") =>
	locale === routing.defaultLocale
		? `${SITE_URL}${path || "/"}`
		: `${SITE_URL}/${locale}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
	const paths = ["", "/about"] as const;

	return paths.flatMap((path) =>
		routing.locales.map((locale) => ({
			url: localeUrl(locale, path),
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: path === "" ? 1 : 0.7,
			alternates: {
				languages: Object.fromEntries(
					routing.locales.map((alt) => [alt, localeUrl(alt, path)])
				),
			},
		}))
	);
}
