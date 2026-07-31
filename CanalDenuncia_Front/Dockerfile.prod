FROM node:20-alpine AS base

# 1. Instalar dependências apenas quando necessário
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Aproveita o cache do Docker para dependências
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Reconstruir o código-fonte
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desativa a telemetria do Next para acelerar o build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 3. Imagem final de produção (Leve e Rápida)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# O modo standalone cria um servidor minimalista na pasta .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Caso você tenha arquivos .env.production, você pode copiá-los também:
COPY --from=builder /app/.env.production ./.env.production

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
