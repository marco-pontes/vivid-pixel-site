import { defineRouting } from "next-intl/routing";

/**
 * The 8 most spoken languages worldwide. English stays unprefixed
 * (localePrefix "as-needed") so existing URLs keep working.
 */
export const routing = defineRouting({
	locales: ["en", "zh", "hi", "es", "fr", "ar", "bn", "pt"],
	defaultLocale: "en",
	localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

/** Native-name labels for the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
	en: "English",
	zh: "中文",
	hi: "हिन्दी",
	es: "Español",
	fr: "Français",
	ar: "العربية",
	bn: "বাংলা",
	pt: "Português",
};

/** Arabic is the only RTL locale in the set. */
export const RTL_LOCALES: ReadonlyArray<Locale> = ["ar"];
