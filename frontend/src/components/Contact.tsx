"use client";
import type { ContactForm, FunctionComponent } from "@/types/types.ts";
import { useForm } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useSendContact } from "@/hooks/useSendContact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RiMailLine } from "react-icons/ri";
import { Eyebrow, Section } from "@/components/brand";

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

	return (
		<Section id="section-contact">
			<div className="rounded-xl bg-primary-tint p-8 sm:p-12">
				<Eyebrow hue="violet">Contact</Eyebrow>
				<h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
					Let&rsquo;s build together
				</h2>
				<p className="mt-3 max-w-md text-muted-fg">
					Tell us what you want to develop or support. We reply fast &mdash;
					usually within a business day.
				</p>
				<form
					className="mt-8 grid max-w-lg gap-5"
					onSubmit={handleSubmit(onValidFn)}
				>
					<div className="grid gap-1.5">
						<Label htmlFor="name">Full name</Label>
						<Input
							{...register("name", {
								required: "The name must be informed",
							})}
							id="name"
							placeholder="Full name"
							type="text"
							autoComplete="name"
							className="bg-surface"
							aria-invalid={!!errors.name}
							aria-describedby={errors.name ? "name-error" : undefined}
						/>
						{errors.name?.message && (
							<span id="name-error" className="text-sm text-destructive">
								{errors.name.message}
							</span>
						)}
					</div>

					<div className="grid gap-1.5">
						<Label htmlFor="email">Email address</Label>
						<Input
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
							className="bg-surface"
							aria-invalid={!!errors.email}
							aria-describedby={errors.email ? "email-error" : undefined}
						/>
						{errors.email?.message && (
							<span id="email-error" className="text-sm text-destructive">
								{errors.email.message}
							</span>
						)}
					</div>

					<div className="grid gap-1.5">
						<Label htmlFor="message">Describe your service requirement</Label>
						<Textarea
							{...register("message", {
								required: "The message must be informed",
							})}
							id="message"
							rows={5}
							placeholder="Explain what you want to develop or support"
							className="bg-surface"
							aria-invalid={!!errors.message}
							aria-describedby={errors.message ? "message-error" : undefined}
						/>
						{errors.message?.message && (
							<span id="message-error" className="text-sm text-destructive">
								{errors.message.message}
							</span>
						)}
					</div>

					<div>
						<Button disabled={isPending} type="submit" className="gap-2">
							<RiMailLine aria-hidden="true" /> Send a message
						</Button>
					</div>
				</form>
			</div>
		</Section>
	);
};
