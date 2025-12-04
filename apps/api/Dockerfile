# apps/api/Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json nx.json tsconfig.base.json tsconfig.json eslint.config.mjs ./
COPY apps ./apps
COPY libs ./libs
COPY prisma ./prisma

RUN npm ci

RUN npx nx build api --configuration=production

RUN npx prisma generate

ENV NODE_ENV=production
ENV PORT=3333
EXPOSE 3333

# ⬇️ ЭНД ЗАСЛАА ХИЙНЭ
CMD ["node", "apps/api/dist/main.js"]
# Хэрвээ дээр node командаар шалгахад apps/api/dist/apps/api/src/main.js ажиллаж байвал:
# CMD ["node", "apps/api/dist/apps/api/src/main.js"]