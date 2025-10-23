# Estágio 1: Dependências
# Instala dependências de forma isolada para aproveitar o cache do Docker
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Estágio 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# --- A GRANDE MUDANÇA ESTÁ AQUI ---
# 1. Declara um argumento que será recebido do 'docker build'
ARG BUILD_TIME_BACKEND_API_URL

# 2. Define a variável de ambiente (ENV) a partir desse argumento (ARG)
# Se o argumento não for passado, ele usa o placeholder como fallback.
ENV BACKEND_API_URL=${BUILD_TIME_BACKEND_API_URL:-"http://build-time-placeholder.com"}
# --- FIM DA MUDANÇA ---

# Agora o 'npm run build' usará a URL real (se fornecida)
RUN npm run build

# Estágio 3: Produção (Runner)
FROM node:20-alpine AS runner
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