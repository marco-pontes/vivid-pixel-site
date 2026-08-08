"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_LABELS, routing, type Locale } from "@/i18n/routing";

export const LocaleSwitcher = () => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const t = useTranslations("Nav");

	return (
		<label className="relative">
			<span className="sr-only">{t("language")}</span>
			<select
				value={locale}
				onChange={(event) =>
					router.replace(pathname, { locale: event.target.value as Locale })
				}
				className="max-w-24 cursor-pointer appearance-none border border-line bg-transparent px-2.5 py-1.5 text-sm text-muted-fg transition-colors hover:text-foreground"
			>
				{routing.locales.map((code) => (
					<option key={code} value={code}>
						{LOCALE_LABELS[code]}
					</option>
				))}
			</select>
		</label>
	);
};
