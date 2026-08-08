"use client";
import type { ContactForm, FunctionComponent } from "@/types/types.ts";
import { useForm } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useSendContact } from "@/hooks/useSendContact";
import { RiMailLine } from "react-icons/ri";
import { useTranslations } from "next-intl";
import { Section, VMark } from "@/components/brand";

/**
 * Contact — the Viva gradient on a square panel with a plum glow and a
 * ghost V watermark. Light-constant fields (white paper) sit on the
 * gradient in both themes; the send button is square amber with ink.
 */
export const Contact = (): FunctionComponent => {
	const t = useTranslations("Contact");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactForm>();

	const { mutate, isPending } = useSendContact(
		() =>
			toaster.create({
				title: t("successTitle"),
				type: "success",
				description: t("successDescription"),
			}),
		() =>
			toaster.create({
				title: t("errorTitle"),
				type: "error",
				description: t("errorDescription"),
			})
	);

	const onValidFn = (data: ContactForm) => {
		mutate(data);
	};

	const fieldClass =
		"w-full border-2 border-transparent bg-white px-3.5 py-2.5 text-sm text-[#171321] placeholder:text-[#5f5872] outline-none focus-visible:border-[#f59f00] focus-visible:outline-none";

	return (
		<Section id="section-contact">
			<div
				className="glow reveal relative overflow-hidden p-8 sm:p-12"
				style={
					{
						background: "var(--grad-viva)",
						"--gl": "color-mix(in srgb, var(--plum-full) 50%, transparent)",
					} as React.CSSProperties
				}
			>
				{/* Ghost V watermark — the pixel echo inside the panel. */}
				<VMark
					size={380}
					paint="rgba(255,255,255,0.09)"
					className="pointer-events-none absolute -end-16 -bottom-24 max-sm:hidden"
				/>
				<div className="relative mb-4 flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.12em] text-white/90 uppercase">
					<VMark size={14} paint="var(--ochre-full)" />
					{t("eyebrow")}
				</div>
				<h2 className="font-display text-3xl font-light tracking-[0.08em] text-white uppercase sm:text-4xl">
					{t("title")}
				</h2>
				<p className="mt-3 max-w-md text-white/90">{t("lead")}</p>
				<form
					className="mt-8 grid max-w-lg gap-5"
					onSubmit={handleSubmit(onValidFn)}
				>
					<div className="grid gap-1.5">
						<label htmlFor="name" className="text-sm font-semibold text-white">
							{t("nameLabel")}
						</label>
						<input
							{...register("name", {
								required: t("nameError"),
							})}
							id="name"
							placeholder={t("namePlaceholder")}
							type="text"
							autoComplete="name"
							className={fieldClass}
							aria-invalid={!!errors.name}
							aria-describedby={errors.name ? "name-error" : undefined}
						/>
						{errors.name?.message && (
							<span id="name-error" className="text-sm font-semibold text-white">
								{errors.name.message}
							</span>
						)}
					</div>

					<div className="grid gap-1.5">
						<label htmlFor="email" className="text-sm font-semibold text-white">
							{t("emailLabel")}
						</label>
						<input
							{...register("email", {
								required: t("emailError"),
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: t("emailInvalid"),
								},
							})}
							id="email"
							placeholder={t("emailPlaceholder")}
							type="email"
							autoComplete="email"
							className={fieldClass}
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? "email-error" : undefined}
						/>
						{errors.email?.message && (
							<span
								id="email-error"
								className="text-sm font-semibold text-white"
							>
								{errors.email.message}
							</span>
						)}
					</div>

					<div className="grid gap-1.5">
						<label
							htmlFor="message"
							className="text-sm font-semibold text-white"
						>
							{t("messageLabel")}
						</label>
						<textarea
							{...register("message", {
								required: t("messageError"),
							})}
							id="message"
							rows={5}
							placeholder={t("messagePlaceholder")}
							className={fieldClass}
							aria-invalid={!!errors.message}
							aria-describedby={errors.message ? "message-error" : undefined}
						/>
						{errors.message?.message && (
							<span
								id="message-error"
								className="text-sm font-semibold text-white"
							>
								{errors.message.message}
							</span>
						)}
					</div>

					<div>
						<button
							disabled={isPending}
							type="submit"
							className="inline-flex items-center gap-2 bg-ochre-full px-7 py-3 font-mono text-sm font-bold tracking-wide text-ink uppercase transition-transform disabled:pointer-events-none disabled:opacity-70 motion-safe:hover:-translate-y-0.5"
						>
							<RiMailLine aria-hidden="true" /> {t("send")}
						</button>
					</div>
				</form>
			</div>
		</Section>
	);
};
