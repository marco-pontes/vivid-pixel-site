export type FunctionComponent = React.ReactElement | null;

export enum AlertType {
	success = "success",
	warning = "warning",
	info = "info",
	error = "error",
}
export type AlertProps = { type: AlertType; message: string };

export type ContactForm = {
	name: string;
	email: string;
	message: string;
};
