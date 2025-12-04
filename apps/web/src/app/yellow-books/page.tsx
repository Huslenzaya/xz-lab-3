// apps/web/src/app/yellow-books/page.tsx
import type { YellowBook } from '@/app/page';
import YellowBooksGrid from '@/components/yellowbooks/YellowBooksGrid';
import { Suspense } from 'react';

// API base URL – .env дээрээ NEXT_PUBLIC_API_BASE_URL тохируулсан гэж үзнэ
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3333';

// ISR: Энэ хуудсыг static-ээр build хийгээд 60 секунд тутамд дахин шинэчилнэ
export const revalidate = 60;

// --- API-аас шар номнуудыг татах server utility ---
async function fetchYellowBooks(): Promise<YellowBook[]> {
  const res = await fetch(`${API_BASE}/yellow-books`, {
    // next: { revalidate: 60 } → энэ fetch өөрөө ч бас 60 сек тутам cache-ээ шинэчилнэ
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(
      'Failed to fetch yellow-books for /yellow-books:',
      res.status,
      res.statusText
    );
    return [];
  }

  const json = await res.json();
  // Анхнаасаа page.tsx дээрээ Zod-оор шалгадаг тул энд type-ээр л барьж авна
  return json as YellowBook[];
}

// --- Streaming хийх хэсэг: энэ component async тул Suspense дотор орно ---
async function BooksSection() {
  const books = await fetchYellowBooks();

  if (books.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 px-4 py-6 text-center text-sm text-slate-500">
        Одоогоор шар номын мэдээлэл ачаалагдсангүй. Backend эсвэл API тохиргоог
        шалгана уу.
      </div>
    );
  }

  return <YellowBooksGrid books={books} />;
}

// --- Гол хуудас ---
export default function YellowBooksPage() {
  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-0">
        {/* Title / Hero */}
        <section className="mb-6">
          <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
            Бүх шар номнууд
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            YellowBook-д бүртгэгдсэн бүх байгууллагыг эндээс хараарай. Өгөгдөл
            нь 60 секунд тутам автоматаар шинэчлэгдэнэ (ISR).
          </p>
        </section>

        {/* Streaming хэсэг – Suspense fallback-тай */}
        <section>
          <Suspense
            fallback={
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500">
                ⏳ Шар номын мэдээллийг серверээс ачааллаж байна...
              </div>
            }
          >
            {/* Энэ хэсгийг Next.js streaming-ээр хэсэг хэсгээр нь илгээнэ */}
            {/* BooksSection нь async тул Suspense хэрэгтэй */}
            <BooksSection />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
