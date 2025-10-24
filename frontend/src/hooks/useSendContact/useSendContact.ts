import { API_ENDPOINTS, QUERY_KEYS } from "@/common/constants";
import {
	type UseMutationResult,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { httpClient } from "@/common/http-client";
import { ContactForm } from "@/types/types";

const sendEmail = async (variables: ContactForm): Promise<Response> => {
	const client = httpClient();
	return client.post(API_ENDPOINTS.SEND_CONTACT, variables);
};

export const useSendContact = (
	successFn: () => void
): UseMutationResult<Response, Error, ContactForm> => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: sendEmail,
		onSuccess: async () => {
			await queryClient
				.invalidateQueries({ queryKey: [QUERY_KEYS.SEND_CONTACT] })
				.then(successFn);
		},
		onError: (error) => {
			console.error("Erro ao completar o todo:", error);
		},
	});
};
