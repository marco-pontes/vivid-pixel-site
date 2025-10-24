import path from "path";

export type BodyParams = string | object;

export interface Client {
	get: (path: string, init?: RequestInit) => Promise<Response>;
	post: (
		path: string,
		body?: BodyParams,
		init?: RequestInit
	) => Promise<Response>;
	put: (
		path: string,
		body?: BodyParams,
		init?: RequestInit
	) => Promise<Response>;
	patch: (
		path: string,
		body?: BodyParams,
		init?: RequestInit
	) => Promise<Response>;
	delete: (
		path: string,
		body?: BodyParams,
		init?: RequestInit
	) => Promise<Response>;
	head: (path: string, init?: RequestInit) => Promise<Response>;
	options: (path: string, init?: RequestInit) => Promise<Response>;
	baseUrl: string;
	headers: Record<string, string>;
}

export type HttpMethod =
	| "GET"
	| "POST"
	| "PATCH"
	| "DELETE"
	| "PUT"
	| "HEAD"
	| "OPTIONS";
export type CreateOptions = { headers: Record<string, string> };

/** Build RequestInit for JSON body if a plain object/string is provided. */
const asJsonInit = (body: BodyParams, init?: RequestInit): RequestInit => {
	const headers = new Headers(init?.headers || {});
	if (body !== undefined && body !== null && !(body instanceof FormData)) {
		if (!headers.has("content-type"))
			headers.set("content-type", "application/json");
		return {
			...init,
			headers,
			body: typeof body === "string" ? body : JSON.stringify(body),
		};
	}
	return { ...init, headers, body };
};

function create(defaultBaseUrl?: string, options?: CreateOptions): Client {
	const envCfg = { baseUrl: defaultBaseUrl || "" };

	const baseHeaders = { ...(options?.headers || {}) } as Record<string, string>;

	const request = async (
		method: HttpMethod,
		relativePath: string,
		init?: RequestInit
	) => {
		const url = path.join(envCfg.baseUrl, relativePath);
		// Merge baseHeaders with any provided init.headers. Use Headers API to preserve existing values
		const headers = new Headers(baseHeaders as Record<string, string>);
		if (init?.headers) {
			new Headers(init.headers as HeadersInit).forEach((value, key) =>
				headers.set(key, value)
			);
		}
		const rInit = { ...init, method, headers } as RequestInit;
		return fetch(url, rInit);
	};

	const withJson =
		(method: HttpMethod) =>
		(path: string, body: BodyParams = {}, init?: RequestInit) =>
			request(method, path, asJsonInit(body, init));

	const client: Client = {
		baseUrl: envCfg.baseUrl,
		headers: baseHeaders,
		get: (p, i) => request("GET", p, i),
		head: (p, i) => request("HEAD", p, i),
		options: (p, i) => request("OPTIONS", p, i),
		delete: withJson("DELETE"),
		post: withJson("POST"),
		put: withJson("PUT"),
		patch: withJson("PATCH"),
	};

	return client;
}

// Singleton client instance
let cachedClient: Client | null = null;

export const httpClient = (): Client => {
	if (cachedClient) return cachedClient;
	cachedClient = create();
	return cachedClient;
};
