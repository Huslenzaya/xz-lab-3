# YellowBook – Labs 3, 4, 5

Nx + Next.js + Express + Prisma + Docker + AWS ECR

![CI](https://github.com/Huslenzaya/xz-lab-3/actions/workflows/ci.yml/badge.svg)

Энэ репо нь **YellowBook directory** төслийг Nx монорепо дээр хэрэгжүүлсэн хувилбар бөгөөд:

- **apps/web** – Next.js 15 (App Router) фронт
- **apps/api** – Express REST API + Prisma
- **libs/contract** – API & Web хоорондоо хуваалцдаг Zod схемүүд
- **libs/config** – тохиргооны давхардлыг бууруулсан config давхарга
- **prisma** – PostgreSQL schema + migration + seed

Доорх тайлбар нь Lab 3, Lab 4, Lab 5-ийн даалгаврыг хэрхэн биелүүлснийг харуулна.

---

## 📦 Tech Stack

### Frontend (apps/web)

- Next.js 15 – App Router, Server Components
- React + Suspense, Streaming
- TailwindCSS
- Shared Zod contract-оос үүсгэсэн төрөлүүд
- Google Maps iframe (client island)

### Backend (apps/api)

- Express.js (Nx Node app)
- Shared Zod `YellowBookEntry` validation
- CORS + энгийн security header-ууд
- `/yellow-books` REST endpoint-ууд

### Database (Prisma)

- Prisma ORM
- PostgreSQL (Prisma Data Platform – `db.prisma.io`)
- 5+ реалист YellowBook listings бүхий seed

### Monorepo / DevX

- Nx workspace (`apps/`, `libs/`)
- Nx Cloud (CI cache + run details)
- ESLint + Prettier + TypeScript strict typecheck
- GitHub Actions CI

---

## 🧱 Folder Structure

```bash
apps/
  api/        # Express + Prisma API
    src/main.ts
    Dockerfile
  web/        # Next.js 15 frontend
    src/app/...
    Dockerfile

libs/
  contract/   # Zod schemas + shared types
  config/     # API base URL, runtime configs

prisma/
  schema.prisma
  seed.cjs    # inserts sample YellowBook rows

.tmp/, .nx/, .github/workflows/ci.yml ...


⸻

🚀 Getting Started (Local Dev)

1️⃣ Clone & Install

git clone https://github.com/Huslenzaya/xz-lab-3.git
cd xz-lab-3
npm install

2️⃣ Environment variables

./.env файл үүсгээд:

# Prisma Postgres (Prisma Data Platform)
DATABASE_URL="postgres://<user>:<password>@db.prisma.io:5432/postgres?sslmode=require"

# Web app → API руу хандах URL
NEXT_PUBLIC_API_BASE_URL="http://localhost:3333"

3️⃣ Prisma

# Migration (хоёрдахь удаа ажиллуулах шаардлагагүй)
npx prisma migrate dev --name init_yellow_book

# Client
npx prisma generate

# Seed (5+ yellow book listing)
npm run prisma:seed

4️⃣ API server (dev)

npx nx serve api
# http://localhost:3333
# http://localhost:3333/yellow-books

5️⃣ Web app (dev)

npx nx dev web
# http://localhost:3000


⸻

🧪 CI & Quality

GitHub Actions-д дараах командууд автоматаар ажиллана:

npx nx run-many -t lint test build typecheck

	•	lint – ESLint
	•	build – API + Web production build
	•	typecheck – TypeScript --noEmit
	•	Nx Cloud cache ашиглаж хурдыг нэмсэн.

CI badge дээрээс хамгийн сүүлийн байдлыг харж болно.

⸻

🟡 Lab 3 – Nx + Contract + Prisma + Basic API & Web

Үүрэг
	•	Nx монорепо (apps/web, apps/api, libs/contract, libs/config)
	•	Shared Zod YellowBookEntrySchema
	•	Prisma model + migration + seed
	•	/yellow-books endpoint болон фронт жагсаалт

Хэрэгжилт

Contract (libs/contract)
	•	YellowBookEntrySchema – API ба Web хоёулангын хэрэглэж буй гол schema.
	•	Талбарууд (богинохон хувилбар):
	•	id: string (uuid)
	•	title: string
	•	description: string
	•	pricePerMonth: number
	•	address: string
	•	latitude / longitude: number
	•	category: string
	•	status: string
	•	contactName: string
	•	phone: string
	•	email?: string | null
	•	publishedAt: Date

Prisma (prisma/schema.prisma)

model YellowBook {
  id            String   @id @default(uuid())
  title         String
  description   String
  pricePerMonth Int
  address       String
  latitude      Float
  longitude     Float
  category      String
  status        String
  contactName   String
  phone         String
  email         String?
  publishedAt   DateTime @default(now())
}

API (apps/api)
	•	GET /yellow-books – Prisma-гаар DB-ээс уншиж, Zod-оор validate хийгээд буцаана.
	•	GET /yellow-books/:id – ганц байгууллагын дэлгэрэнгүй.
	•	Хэрэв алдаа гарвал 500 { error: "Internal server error" }.

Web (apps/web)
	•	Нүүр хуудас /
	•	Hero блок
	•	Category chips
	•	“Онцлох шар номнууд” – API-аас ирсэн жагсаалтаар.
	•	List component: YellowBooksGrid – shared YellowBook төрөл ашиглана.
	•	Details page (Lab 4-тэй хамт доор тайлбарласан).

⸻

🌐 Lab 4 – Rendering Modes, Streaming & Search

Lab 4-ийн зорилго: Next.js дээр янз бүрийн render стратеги ашиглах.

1. /yellow-books – ISR + Streaming Section
	•	src/app/yellow-books/page.tsx
	•	export const revalidate = 60 – 60 секунд тутамд ISR.
	•	Сайтын нэг хэсэг (жагсаалт) дээр Suspense ашиглан streaming fallback үзүүлдэг.
	•	API-аас /yellow-books fetch хийж, Zod schema-аар validate хийнэ.

2. /yellow-books/[id] – SSG + On-demand revalidation
	•	generateStaticParams ашиглаж анхны 5–6 listing-ийг build дээр статик байдлаар үүсгэнэ.
	•	revalidate = 60 – 1 минут тутамд дахин шалгана.
	•	/api/revalidate route-оор on-demand revalidate хийх боломжтой.
	•	Дэлгэрэнгүй хуудас:
	•	Баруун талд Google Maps iframe
	•	Зүүн талд байгууллагын мэдээлэл (price, status, contact, address).

3. /yellow-books/search – SSR + Client Map Island

Файл: apps/web/src/app/yellow-books/search/page.tsx

Гол санаа:
	•	SSR хайлт – dynamic = 'force-dynamic', searchParams.q-д тулгуурлан сервер дээрээс хайлт.
	•	/yellow-books бүх дата → сервер дээр filter хийгээд жагсаалт буцаана.
	•	Suspense fallback:
	•	“⏳ “ХХХ” хайлтын үр дүнг серверээс ачааллаж байна…” гэсэн мессеж stream-лэгдэнэ.
	•	Map island – SearchMapIsland гэдэг client component:
	•	Хайлтын үр дүнгийн координатуудыг google map дээр cluster болгож харуулна.

4. Performance Notes – perf.md

Root-д байгаа perf.md файлд:
	•	TTFB, LCP-ийн өмнөх/дараах хэмжилт
	•	Яагаад:
	•	ISR
	•	SSG
	•	SSR + streaming
	•	Client island-ууд тус бүр performance-д нөлөөлж байгааг тайлбарласан.

⸻

🐳 Lab 5 – Docker + AWS ECR + CI

Lab 5-ийн зорилго: монорепо-гоо Docker болгож, GitHub Actions-оор build/push хийж, AWS ECR дээр байрлуулах.

1. Dockerfiles

API (apps/api/Dockerfile)
	•	Root файлууд + apps, libs, prisma-г COPY
	•	npm ci
	•	npx nx build api --configuration=production
	•	npx prisma generate
	•	CMD ["node", "apps/api/dist/apps/api/src/main.js"]
	•	EXPOSE 3333

Web (apps/web/Dockerfile)
	•	Root + apps/libs COPY
	•	npm ci
	•	npx nx build web --configuration=production
	•	CMD ["node", "apps/web/.next/standalone/server.js"] маягаар Next production server
	•	EXPOSE 3000

2. Local sanity check

# API image build + run
docker build -f apps/api/Dockerfile -t xz-lab-3-api:local .
docker run --rm -p 3333:3333 --env-file .env xz-lab-3-api:local

# Web image build + run
docker build -f apps/web/Dockerfile -t xz-lab-3-web:local .
docker run --rm -p 3000:3000 --env-file .env xz-lab-3-web:local

	•	API: http://localhost:3333/yellow-books → JSON гарна.
	•	Web: http://localhost:3000 → YellowBook UI бүрэн ачаалдаг.

3. AWS ECR

Region: ap-southeast-1, Account: 179263214332.

Хоёр private repo:
	•	xz-lab-3-api
	•	xz-lab-3-web

Жишээ image URI-үүд:

179263214332.dkr.ecr.ap-southeast-1.amazonaws.com/xz-lab-3-api:latest
179263214332.dkr.ecr.ap-southeast-1.amazonaws.com/xz-lab-3-web:latest

Хоёуланд нь:
	•	Image status: Active
	•	Digest (sha256:...) бүртгэгдсэн
	•	Vulnerability scan – Complete.

4. GitHub Actions – CI + Push to ECR

Файл: .github/workflows/ci.yml

Үндсэн алхмууд:
	1.	Checkout + Node setup
	2.	Install – npm ci
	3.	Nx quality checks

npx nx run-many -t lint test build typecheck


	4.	AWS credentials configure
GitHub Secrets:
	•	AWS_ACCESS_KEY_ID
	•	AWS_SECRET_ACCESS_KEY
	•	AWS_REGION
	•	ECR_REGISTRY
	•	ECR_REPO_API
	•	ECR_REPO_WEB
	5.	ECR login – aws-actions/amazon-ecr-login.
	6.	Set image tags

API_IMAGE=${ECR_REGISTRY}/${ECR_REPO_API}:${GITHUB_SHA}
WEB_IMAGE=${ECR_REGISTRY}/${ECR_REPO_WEB}:${GITHUB_SHA}


	7.	Build & push

docker build -f apps/api/Dockerfile -t "$API_IMAGE" .
docker push "$API_IMAGE"

docker build -f apps/web/Dockerfile -t "$WEB_IMAGE" .
docker push "$WEB_IMAGE"


	8.	CI run ногоон → ECR дээр :latest болон :<sha> tag-тай image-үүд гарч ирдэг.

⸻

🔧 Useful Scripts

// package.json (жишээ)
"scripts": {
  "dev:web": "nx dev web",
  "dev:api": "nx serve api",
  "build:web": "nx build web --configuration=production",
  "build:api": "nx build api --configuration=production",
  "prisma:seed": "node prisma/seed.cjs"
}


⸻

📌 Design Decisions
	•	Nx монорепо – contract, config, app-уудыг цэвэр тусгаарласан.
	•	Zod contract – API болон Web хоёулаа ижил schema ашигласнаар type safety + validation.
	•	Prisma + Postgres – migration, seeding, Prisma Studio ашиглахад тохиромжтой.
	•	Rendering strategies (Lab 4) – ISR / SSG / SSR + streaming-ийн ялгааг бодитоор харуулахын тулд гурван өөр хуудас.
	•	Docker + ECR (Lab 5) – lab-ийн дараагийн алхам болох EKS deploy-д бэлэн байхаар CI-гоор автоматаар image build/push хийдэг болгосон.

```
