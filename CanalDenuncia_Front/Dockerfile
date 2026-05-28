FROM node:20-alpine

WORKDIR /app

# Copia apenas package.json para instalar dependências (cacheia no build)
COPY package.json package-lock.json* ./

RUN npm install

# Copia o código-fonte (Docker Compose Watch sincroniza alterações depois)
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]