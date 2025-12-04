// apps/web/src/app/yellow-books/search/page.tsx
import type { YellowBook } from '@/app/page';
import { SearchMapIsland } from '@/components/yellowbooks/SearchMapIsland';
import Link from 'next/link';
import { Suspense } from 'react';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3333';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: {
    q?: string;
  };
};

async function searchYellowBooks(q: string): Promise<YellowBook[]> {
  if (!q.trim()) return [];

  const res = await fetch(`${API_BASE}/yellow-books`, {});

  if (!res.ok) return [];

  const all = (await res.json()) as YellowBook[];
  const lower = q.toLowerCase();

  return all.filter((b) => {
    const title = (b as any).title?.toLowerCase?.() || '';
    const category = (b as any).category?.toLowerCase?.() || '';
    const desc = (b as any).description?.toLowerCase?.() || '';
    const address = (b as any).address?.toLowerCase?.() || '';

    return (
      title.includes(lower) ||
      category.includes(lower) ||
      desc.includes(lower) ||
      address.includes(lower)
    );
  });
}

async function SearchResultsSection({ q }: { q: string }) {
  const results = await searchYellowBooks(q);

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[2fr,1fr]">
      {/* Left: List */}
      <div className="space-y-3">
        <p className="text-xs text-slate-500">
          Хайлтын үг: <span className="font-medium">“{q}”</span> –{' '}
          {results.length} тохирох байгууллага
        </p>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-500">
            Хайлтаар тохирох байгууллага олдсонгүй.
          </div>
        ) : (
          <ul className="space-y-3">
            {results.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/yellow-books/${b.id}`}
                  className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold">
                        {(b as any).title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {(b as any).category} · {(b as any).address ?? '—'}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-slate-900">
                      {'pricePerMonth' in b
                        ? `${(b as any).pricePerMonth} ₮/сар`
                        : ''}
                    </div>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] text-slate-600">
                    {(b as any).description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <SearchMapIsland books={results} />
      </div>
    </div>
  );
}

export default async function YellowBooksSearchPage({
  searchParams,
}: PageProps) {
  const q = searchParams?.q || '';

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-0">
        <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
          Шар ном хайх
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Байгууллагын нэр, төрөл, хаяг зэргээр хайлт хийж болно. Энэ хуудас
          SSR-ээр render хийгдэнэ.
        </p>

        <form className="mt-4" action="/yellow-books/search" method="GET">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Жишээ нь: ресторан, эмнэлэг, дэлгүүр..."
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-0 transition hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-yellow-300"
            />
            <button
              type="submit"
              className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-900"
            >
              Хайх
            </button>
          </div>
        </form>

        {q ? (
          <Suspense
            key={q}
            fallback={
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-500">
                ⏳ “{q}” хайлтын үр дүнг серверээс ачааллаж байна...
              </div>
            }
          >
            <SearchResultsSection q={q} />
          </Suspense>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/60 px-4 py-6 text-sm text-slate-500">
            Хайлтын үгээ оруулаад хайлт хийнэ үү.
          </div>
        )}
      </main>
    </div>
  );
}
