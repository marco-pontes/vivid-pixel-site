# Estágio 1: Dependências
# Instala dependências de forma isolada para aproveitar o cache do Docker
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Estágio 2: Build
# Constrói a aplicação
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variável de ambiente para o build (se você tiver uma)
# ENV NEXT_PUBLIC_SOME_VAR=foo

RUN npm run build

# Estágio 3: Produção (Runner)
# Imagem final, super leve, usando a saída 'standalone'
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copia os arquivos da 'standalone output' do estágio de build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# O Next.js 'standalone' roda por padrão na porta 3000
EXPOSE 3000

# O Cloud Run define a variável $PORT automaticamente.
# O servidor 'standalone' do Next.js (server.js) a utiliza por padrão.
# Se $PORT não estiver definida, ele usará a porta 3000.
CMD ["node", "server.js"]