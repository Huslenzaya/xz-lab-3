# apps/web/Dockerfile

FROM node:20-alpine

WORKDIR /app

# 1. Root файлууд
COPY package.json package-lock.json nx.json tsconfig.base.json tsconfig.json eslint.config.mjs ./

# 2. Apps + libs
COPY apps ./apps
COPY libs ./libs

# 3. Install dependencies
RUN npm ci

# 4. Web app-ийг production build хийнэ
RUN npx nx build web --configuration=production

# 5. Environment
ENV NODE_ENV=production
ENV PORT=3000

# Docker контейнер доторх Next app 3000 портоор сонсоно
EXPOSE 3000

# 6. Prod server асаах
# Nx-ийн Next app-уудын хувьд "start" target байдаг (next start).
CMD ["npx", "nx", "start", "web", "--configuration=production", "--port", "3000", "--hostname", "0.0.0.0"]