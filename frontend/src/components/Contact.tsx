"use client";
import type { ContactForm, FunctionComponent } from "@/types/types.ts";
import { useForm } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useSendContact } from "@/hooks/useSendContact";
import { RiMailLine } from "react-icons/ri";
import { Section } from "@/components/brand";

/**
 * Contact — the Viva gradient on a rounded panel with a plum glow.
 * Light-constant fields (white paper) sit on the gradient in both themes;
 * the send button is an amber pill with constant ink.
 */
export const Contact = (): FunctionComponent => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactForm>();

	const { mutate, isPending } = useSendContact(
		() =>
			toaster.create({
				title: "Message sent",
				type: "success",
				description:
					"Thanks for reaching out! Our team will get back to you shortly.",
			}),
		() =>
			toaster.create({
				title: "Something went wrong",
				type: "error",
				description:
					"Your message could not be sent. Please try again in a moment.",
			})
	);

	const onValidFn = (data: ContactForm) => {
		mutate(data);
	};

	const fieldClass =
		"w-full rounded-lg border-2 border-transparent bg-white px-3.5 py-2.5 text-sm text-[#171321] placeholder:text-[#5f5872] outline-none focus-visible:border-[#f59f00] focus-visible:outline-none";

	return (
		<Section id="section-contact">
			<div
				className="glow reveal rounded-3xl p-8 sm:p-12"
				style={
					{
						background: "var(--grad-viva)",
						"--gl": "color-mix(in srgb, var(--plum-full) 50%, transparent)",
					} as React.CSSProperties
				}
			>
				<div className="mb-4 flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.12em] text-white/90 uppercase">
					<span aria-hidden="true" className="size-2.5 rounded-full bg-ochre-full" />
					Contact
				</div>
				<h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
					Let&rsquo;s build together
				</h2>
				<p className="mt-3 max-w-md text-white/90">
					Tell us what you want to develop or support. We reply fast &mdash;
					usually within a business day.
				</p>
				<form
					className="mt-8 grid max-w-lg gap-5"
					onSubmit={handleSubmit(onValidFn)}
				>
					<div className="grid gap-1.5">
						<label htmlFor="name" className="text-sm font-semibold text-white">
							Full name
						</label>
						<input
							{...register("name", {
								required: "The name must be informed",
							})}
							id="name"
							placeholder="Full name"
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
							Email address
						</label>
						<input
							{...register("email", {
								required: "The email must be informed",
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Enter a valid email address",
								},
							})}
							id="email"
							placeholder="you@company.com"
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
							Describe your service requirement
						</label>
						<textarea
							{...register("message", {
								required: "The message must be informed",
							})}
							id="message"
							rows={5}
							placeholder="Explain what you want to develop or support"
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
							className="inline-flex items-center gap-2 rounded-full bg-ochre-full px-7 py-3 text-sm font-bold text-ink transition-transform disabled:pointer-events-none disabled:opacity-70 motion-safe:hover:-translate-y-0.5"
						>
							<RiMailLine aria-hidden="true" /> Send a message
						</button>
					</div>
				</form>
			</div>
		</Section>
	);
};
