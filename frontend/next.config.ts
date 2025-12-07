import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,

	// 1. Habilitar o 'standalone output'
	// Isso cria uma pasta .next/standalone no 'build' com apenas
	// os arquivos necessários para produção, diminuindo muito a imagem Docker.
	output: "standalone",

	// 2. Configurar o 'Rewrite' (o substituto do proxy do Nginx)
	// Isso fará com que qualquer chamada do cliente (browser) para /api/*
	// seja redirecionada pelo servidor Next.js para o seu backend Python.
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				// A URL do backend. Usamos uma variável de ambiente
				// para que funcione tanto no docker-compose (dev)
				// quanto no Cloud Run (produção).
				destination: `${process.env["BACKEND_API_URL"]}/api/:path*`,
			},
		];
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
