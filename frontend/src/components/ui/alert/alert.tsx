import { cva, type VariantProps } from "class-variance-authority";
import {
	CircleAlert,
	CircleCheck,
	Info as InfoIcon,
	TriangleAlert,
} from "lucide-react";
import type { AlertProps, FunctionComponent } from "@/types/types";
import { AlertType } from "@/types/types";
import { cn } from "@/lib/utils";

const alertVariants = cva(
	"relative flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-sm",
	{
		variants: {
			status: {
				success: "border-emerald-200 bg-emerald-50 text-emerald-800",
				info: "border-sky-200 bg-sky-50 text-sky-800",
				warning: "border-amber-200 bg-amber-50 text-amber-800",
				error: "border-red-200 bg-red-50 text-red-800",
			},
		},
		defaultVariants: {
			status: "info",
		},
	}
);

const STATUS_ICON: Record<
	AlertType,
	React.ComponentType<{ className?: string }>
> = {
	[AlertType.success]: CircleCheck,
	[AlertType.info]: InfoIcon,
	[AlertType.warning]: TriangleAlert,
	[AlertType.error]: CircleAlert,
};

type AlertVariantProps = VariantProps<typeof alertVariants>;

export const Alert = ({ type, message }: AlertProps): FunctionComponent => {
	const Icon = STATUS_ICON[type];
	return (
		<div
			role="alert"
			data-slot="alert"
			className={cn(alertVariants({ status: type as AlertVariantProps["status"] }))}
		>
			<Icon className="size-4 shrink-0" />
			<span data-slot="alert-title" className="font-medium">
				{message}
			</span>
		</div>
	);
};
