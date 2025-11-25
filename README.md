# YellowBook – Lab 3 (Nx + Next.js + Express + Prisma)

This project implements the **YellowBook directory** application using an **Nx monorepo** with a shared contract layer, a Next.js frontend, an Express REST API backend, and a PostgreSQL database managed through Prisma.

This is the submission for **XZ Web Development – Lab 3**.

---

# 📦 Tech Stack

### **Frontend**

- Next.js 15 (App Router)
- React Server Components
- TailwindCSS
- Shared Zod schemas (contract)

### **Backend**

- Express.js (NX Node app)
- Zod validation (shared contract)
- CORS middleware
- REST API endpoints

### **Database**

- Prisma ORM
- PostgreSQL (Prisma Cloud instance)
- Seed script with ≥10 listings

### **Monorepo**

- Nx Workspace
- Nx Cloud CI
- libs/contract shared schemas
- libs/config for environment configuration

---

# 🧱 Project Structure

apps/
web/ → Next.js frontend (App Router)
api/ → Express REST API server

libs/
contract/ → Shared Zod schemas (YellowBookEntry)
config/ → Shared runtime config (API base URL, env)

prisma/
schema.prisma → Prisma schema
seed.cjs → Seeder script

---

# 🚀 Getting Started (Local Development)

Clone the project:

```sh
git clone https://github.com/<your-username>/xz-lab-3.git
cd xz-lab-3
npm install


⸻

1️⃣ Environment Setup

Create .env in project root:

DATABASE_URL="postgresql://<user>:<pass>@<host>:<port>/<db>?sslmode=require"
NEXT_PUBLIC_API_BASE_URL="http://localhost:3333"


⸻

2️⃣ Prisma Setup

Run migration:

npx prisma migrate dev --name init_yellow_book

Generate client:

npx prisma generate

Seed database:

npm run prisma:seed


⸻

3️⃣ Run the API server

npx nx serve api

Default address:

http://localhost:3333

Check API:

http://localhost:3333/yellow-books


⸻

4️⃣ Run the Web App

npx nx dev web

Opens:

http://localhost:3000

The homepage displays:
	•	Categories
	•	Featured YellowBook items (from API)
	•	Modal with details + Google Maps embed

⸻

✨ Features Implemented

✔ Shared Contract (Zod)

API & Web use the same YellowBookEntrySchema:
	•	id (UUID)
	•	title
	•	author
	•	year
	•	category
	•	imageUrl
	•	description
	•	lat/lng coordinates
	•	createdAt/updatedAt

Ensures end-to-end type safety.

⸻

✔ Express API

Endpoints:

GET /yellow-books

Returns a validated list of items.

GET /yellow-books/:id

Returns a single place.

POST /yellow-books (optional)

Zod-validated create endpoint.

Includes:
	•	Zod validation
	•	CORS enabled
	•	Basic security headers

⸻

✔ Prisma Database
	•	1 model: YellowBook
	•	10 seeded listings
	•	Cloud Postgres OR local SQLite (selectable)

⸻

✔ Next.js Frontend

✔ Home Page
	•	Category filters UI
	•	Hero section
	•	Featured YellowBook list (from API fetch)
	•	Server Components with streaming render

✔ Details Modal
	•	Image preview
	•	Description
	•	Coordinates shown
	•	Google Maps embed iframe

✔ Accessibility
	•	Proper alt tags
	•	Semantic layout
	•	Keyboard-interactive modal

⸻

🧪 Nx Cloud CI

CI pipeline runs automatically:

npx nx run-many -t lint test build typecheck

Includes:
	•	ESLint
	•	Type checking
	•	Build web
	•	Build API

Workspace successfully connected to Nx Cloud.

⸻

🔧 Scripts

npm run dev:web      → npx nx dev web
npm run dev:api      → npx nx serve api
npm run prisma:seed  → node prisma/seed.cjs


⸻

📌 Design Decisions
	•	Nx chosen for modular architecture and shared contract.
	•	Zod used for runtime & compile-time safety.
	•	Prisma chosen for simplicity + migration workflow.
	•	Next.js App Router for parallel routes + server rendering.
	•	TailwindCSS for rapid UI development based on provided Figma.

⸻

🎯 Conclusion

This Lab 3 submission includes:

✔ Nx Monorepo
✔ Next.js + Express apps
✔ Shared contract layer
✔ Prisma model + migrations
✔ Seeder with 10 realistic listings
✔ Fully working API
✔ Frontend that renders real data from backend
✔ CI attached through Nx Cloud
✔ Complete documentation

Project is fully ready for grading.

⸻

📄 License

MIT License.

---
```
