import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
	/* Skip API routes, Next internals, static files, and the standalone
	   diet-planner tool (not part of the localized site). */
	matcher: ["/((?!api|_next|_vercel|diet-planner|.*\\..*).*)"],
};
