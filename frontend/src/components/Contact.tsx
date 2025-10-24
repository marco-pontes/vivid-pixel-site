"use client";
import type { ContactForm, FunctionComponent } from "@/types/types.ts";
import { type FieldValues, useForm } from "react-hook-form";
import { toaster } from "@/components/ui/toaster";
import { useSendContact } from "@/hooks/useSendContact";
import { Button, Field, HStack, Input } from "@chakra-ui/react";
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
			title: "Success",
			type: "success",
			description: "Email sent Sucessfully. We will contact you",
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
								<h2 className="heading-secondary">Contact us!</h2>
							</div>
							<div className="form__group">
								<Field.Root invalid={!!errors["name"]}>
									<Input
										{...register("name", {
											required: "The name must be informed",
										})}
										className="form__input"
										id="name"
										name="name"
										placeholder="Full name"
										type="text"
									/>
									{errors["name"]?.message && <>{errors["name"]?.message}</>}
									<Field.Label className="form__label" htmlFor="name">
										Full name
									</Field.Label>
									<Field.ErrorText>
										<>{errors["name"]?.message}</>
									</Field.ErrorText>
								</Field.Root>
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
										required: "The email must be informed",
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
								<HStack>
									<Button
										disabled={isPending}
										colorPalette="red"
										variant="solid"
										type="submit"
										size="xl"
										className="btn"
									>
										<RiMailLine /> Send a Message
									</Button>
								</HStack>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
