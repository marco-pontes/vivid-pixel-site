"use client";
import type { ContactForm, FunctionComponent } from "@/types/types.ts";
import { type FieldValues, useForm } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useSendContact } from "@/hooks/useSendContact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiMailLine } from "react-icons/ri";

export const Contact = (): FunctionComponent => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { mutate, isPending } = useSendContact(successFn);

	function successFn() {
		toaster.create({
			title: "Message sent",
			type: "success",
			description:
				"Thanks for reaching out! Our team will get back to you shortly.",
		});
	}

	const onValidFn = async (data: FieldValues) => {
		mutate(data as ContactForm);
	};

	return (
		<section className="section-book" id="section-contact">
			<div className="row">
				<div className="book">
					<div className="book__form">
						<form
							action="#"
							className="form"
							onSubmit={handleSubmit(onValidFn)}
						>
							<div className="u-margin-bottom-medium">
								<h2 className="heading-secondary">Let&rsquo;s build together</h2>
							</div>
							<div className="form__group">
								<Input
									{...register("name", {
										required: "The name must be informed",
									})}
									className="form__input"
									id="name"
									name="name"
									placeholder="Full name"
									type="text"
									aria-invalid={!!errors["name"]}
								/>
								<Label className="form__label" htmlFor="name">
									Full name
								</Label>
								{errors["name"]?.message && (
									<span className="text-sm text-red-600">
										{String(errors["name"]?.message)}
									</span>
								)}
							</div>

							<div className="form__group">
								<input
									{...register("email", {
										required: "The email must be informed",
									})}
									className="form__input"
									id="email"
									name="email"
									placeholder="Email address"
									type="email"
								/>
								{errors["email"] && <>{errors["email"]?.message}</>}
								<label className="form__label" htmlFor="email">
									Email address
								</label>
							</div>

							<div className="form__group">
								<textarea
									{...register("message", {
										required: "The message must be informed",
									})}
									className="form__input"
									id="message"
									name="message"
									placeholder="Explain what you want to develop or support"
								/>
								{errors["message"] && <>{errors["message"]?.message}</>}
								<label className="form__label" htmlFor="message">
									Describe your service requirement
								</label>
							</div>

							{/*<div className="form__group u-margin-bottom-medium">*/}
							{/*	<div className="form__radio-group">*/}
							{/*		<input*/}
							{/*			className="form__radio-input"*/}
							{/*			id="small"*/}
							{/*			name="size"*/}
							{/*			type="radio"*/}
							{/*		/>*/}
							{/*		<label className="form__radio-label" htmlFor="small">*/}
							{/*			<span className="form__radio-button"></span>*/}
							{/*			Small tour group*/}
							{/*		</label>*/}
							{/*	</div>*/}
							{/*	<div className="form__radio-group">*/}
							{/*		<input*/}
							{/*			className="form__radio-input"*/}
							{/*			id="large"*/}
							{/*			name="size"*/}
							{/*			type="radio"*/}
							{/*		/>*/}
							{/*		<label className="form__radio-label" htmlFor="large">*/}
							{/*			<span className="form__radio-button"></span>*/}
							{/*			Large tour group*/}
							{/*		</label>*/}
							{/*	</div>*/}
							{/*</div>*/}
							<div className="form__group">
								<div className="flex items-center gap-2">
									<Button
										disabled={isPending}
										variant="destructive"
										type="submit"
										className="btn h-auto"
									>
										<RiMailLine /> Send a Message
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
