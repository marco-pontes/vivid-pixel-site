"use client";

import { toast } from "sonner";

export { Toaster } from "./sonner";

type ToastType = "success" | "error" | "warning" | "info" | "loading";

interface ToastOptions {
	title?: string;
	description?: string;
	type?: ToastType;
}

/**
 * Thin compatibility shim that preserves the previous `toaster.create(...)`
 * call site while delegating to sonner under the hood.
 */
export const toaster = {
	create({ title, description, type = "info" }: ToastOptions) {
		const message = title ?? description ?? "";
		const opts = title && description ? { description } : undefined;

		switch (type) {
			case "success":
				return toast.success(message, opts);
			case "error":
				return toast.error(message, opts);
			case "warning":
				return toast.warning(message, opts);
			case "loading":
				return toast.loading(message, opts);
			default:
				return toast.info(message, opts);
		}
	},
};
