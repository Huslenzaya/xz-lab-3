// apps/web/src/app/yellow-books/[id]/page.tsx
import { notFound } from 'next/navigation';
import { z } from 'zod';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3333';

export const revalidate = 60;

// API-с ирэх нэг шар номын бүтэц
const YellowBookDetailSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  pricePerMonth: z.number().int(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  category: z.string(),
  status: z.string(),
  contactName: z.string(),
  phone: z.string(),
  email: z.string().nullable().optional(),
  publishedAt: z.coerce.date(),
});

type YellowBookDetail = z.infer<typeof YellowBookDetailSchema>;

// build үед SSG хийхэд ашиглагдах params
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_BASE}/yellow-books`, {
      // build үед cache-лээд л авна
      cache: 'force-cache',
    });

    if (!res.ok) {
      console.error('generateStaticParams: failed to fetch list', res.status);
      return [];
    }

    const json = await res.json();
    const parsed = z.array(YellowBookDetailSchema).safeParse(json);

    if (!parsed.success) {
      console.error(
        'generateStaticParams: validation error',
        parsed.error.flatten()
      );
      return [];
    }

    return parsed.data.map((b) => ({ id: b.id }));
  } catch (e) {
    // ⚠️ ЭНЭ try/catch байхгүйгээс чинь "fetch failed" гээд build унаж байсан
    console.error('generateStaticParams: fetch failed', e);
    return [];
  }
}

async function fetchYellowBook(id: string): Promise<YellowBookDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/yellow-books/${id}`, {
      // detail хуудсыг SSG + ISR-ээр болгохын тулд revalidate хэрэглэж болно
      next: { revalidate },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      console.error('fetchYellowBook: failed', res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    const parsed = YellowBookDetailSchema.safeParse(json);

    if (!parsed.success) {
      console.error(
        'fetchYellowBook: validation error',
        parsed.error.flatten()
      );
      return null;
    }

    return parsed.data;
  } catch (e) {
    // Build үед API асаагүй байвал энд орж ирнэ – алдаагаа залгичихаад null буцаана,
    // тэгээд доор notFound() дуудагдана, build унана гэж айхгүй.
    console.error('fetchYellowBook: fetch failed', e);
    return null;
  }
}

type PageProps = {
  params: { id: string };
};

export default async function YellowBookDetailPage({ params }: PageProps) {
  const book = await fetchYellowBook(params.id);

  if (!book) {
    // data олдохгүй бол 404 page (app/not-found.tsx) руу
    notFound();
  }

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-0">
        <section className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
          {/* Left: зураг + дэлгэрэнгүй */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="h-56 w-full overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${book.id}/800/400`}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-3 px-6 pb-6 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-600">
                YellowBook · {book.category}
              </p>
              <h1 className="text-xl font-semibold sm:text-2xl">
                {book.title}
              </h1>
              <p className="text-xs text-slate-500">
                {book.address} · Статус: {book.status}
              </p>

              <p className="text-[11px] leading-relaxed text-slate-600 sm:text-xs">
                {book.description}
              </p>
            </div>
          </div>

          {/* Right: үнэ, контакт, map */}
          <div className="space-y-4">
            <div className="rounded-3xl bg-white px-6 py-5 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Түрээсийн үнэ
              </div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                {book.pricePerMonth.toLocaleString()} ₮
                <span className="text-sm font-normal text-slate-500">
                  {' '}
                  / сар
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-[11px] text-slate-600 sm:text-xs">
                <div>
                  <div className="font-semibold text-slate-500">
                    Холбоо барих хүн
                  </div>
                  <div>{book.contactName}</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-500">Утас</div>
                  <div>{book.phone}</div>
                </div>
                {book.email && (
                  <div>
                    <div className="font-semibold text-slate-500">Имэйл</div>
                    <div>{book.email}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white px-6 py-5 shadow-sm">
              <div className="mb-2 text-[11px] text-slate-500">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                  Байршил (газрын зураг)
                </span>
              </div>
              <div className="h-56 w-full overflow-hidden rounded-2xl border border-slate-200">
                <iframe
                  title="YellowBook location"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${book.latitude},${book.longitude}&z=15&output=embed`}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
