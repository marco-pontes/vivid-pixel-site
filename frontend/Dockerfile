# Estágio 1: Dependências
FROM node:20-alpine AS deps
# ... (sem mudanças)
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
# ... (sem mudanças)
# ... (cria user, copia ficheiros, etc)
CMD ["node", "server.js"]