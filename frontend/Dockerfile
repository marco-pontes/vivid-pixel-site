# Estágio 1: Dependências
# Instala dependências de forma isolada para aproveitar o cache do Docker
FROM node:25-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Estágio 2: Build
# Constrói a aplicação
FROM node:25-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# --- A CORREÇÃO ESTÁ AQUI ---
# Forneça uma URL de placeholder válida *apenas para a etapa de build*.
# Isto permite que 'next build' valide o next.config.js.
ENV BACKEND_API_URL="http://build-time-placeholder.com"

RUN npm run build

# Estágio 3: Produção (Runner)
# Imagem final, super leve, usando a saída 'standalone'
FROM node:25-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia os ficheiros da 'standalone output' do estágio de build
# Agora o comando '--chown' irá funcionar
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Muda o utilizador para o utilizador sem privilégios que acabou de criar
USER nextjs
# O Next.js 'standalone' roda por padrão na porta 3000
EXPOSE 3000

# O Cloud Run define a variável $PORT automaticamente.
# O servidor 'standalone' do Next.js (server.js) a utiliza por padrão.
# Se $PORT não estiver definida, ele usará a porta 3000.
CMD ["node", "server.js"]