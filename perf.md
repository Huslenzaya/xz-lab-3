# Lab 4 Performance Report (perf.md)

## 1. Baseline (before Lab 4)

Before introducing ISR/SSG/SSR and streaming, the app rendered `/` using
simple server-side fetching on every request.

Measured on local machine (Chrome Lighthouse, mobile profile):

- `/` (home)
  - LCP: ~3.0s
  - TTFB: ~600ms

## 2. After Lab 4 Changes

### 2.1. /yellow-books – ISR + Streaming

- Implemented ISR with `export const revalidate = 60;`
- Created `BooksSection` async server component wrapped in `<Suspense>`
- First request generates static HTML, subsequent ones are served from cache
- Streaming allows layout to show before data fully loads

**Observed:**

- `/yellow-books`
  - LCP: ~1.5s
  - TTFB: ~150ms

### 2.2. /yellow-books/[id] – SSG + On-demand revalidation

- Used `generateStaticParams` to pre-build detail pages
- Added `/api/revalidate` endpoint to invalidate `/yellow-books` and `/yellow-books/[id]`
- Detail pages are static, very fast on first render

### 2.3. /yellow-books/search – SSR + Map island

- SSR for query-based search, `dynamic = 'force-dynamic'`
- Client-side map island (`SearchMapIsland`) renders Google Map only in the browser
- Search results and map are loaded in parallel with `<Suspense>`

---

## 3. Why It Helped

- ISR reduced repeated server work for listing pages.
- SSG for details improved TTFB and LCP for `/yellow-books/[id]`.
- SSR for search ensured always-fresh results with dynamic query.
- Streaming allowed partial HTML to reach the client earlier.

---

## 4. Next Optimization Ideas

- Add image optimization (`next/image`) for cover images.
- Move API to edge runtime or add CDN caching for API.
- Add database indexes on frequently filtered fields (title, category, address).
