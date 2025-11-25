// src/app/page.tsx
import YellowBooksGrid from '@/components/yellowbooks/YellowBooksGrid';
import { z } from 'zod';

// API response-ийг шалгах schema – PRISMA MODEL-ТЭЙ НЭГ ШУГАМ
export const YellowBookSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, 'Title should be at least 3 characters long'),
  description: z
    .string()
    .min(10, 'Description should be at least 10 characters long'),
  pricePerMonth: z
    .number()
    .int()
    .positive('Price must be a positive integer (per month)'),
  address: z.string(),
  latitude: z
    .number()
    .min(-90)
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z
    .number()
    .min(-180)
    .max(180, 'Longitude must be between -180 and 180'),
  category: z.string(),
  status: z.string(),
  contactName: z.string(),
  phone: z.string(),
  email: z.string().email().nullable().optional(),
  publishedAt: z.coerce.date(),
});

export type YellowBook = z.infer<typeof YellowBookSchema>;
export const YellowBookListSchema = z.array(YellowBookSchema);

type Category = {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
};

const CATEGORIES: Category[] = [
  { id: 'shop', label: 'Дэлгүүр', subtitle: 'Дэлгүүрүүд', icon: '🏬' },
  { id: 'restaurant', label: 'Ресторан', subtitle: 'Хоолны газар', icon: '🍽️' },
  { id: 'clinic', label: 'Эмнэлэг', subtitle: 'Эрүүл мэнд', icon: '🏥' },
  { id: 'service', label: 'Үйлчилгээ', subtitle: 'Бусад үйлчилгээ', icon: '🛠️' },
  { id: 'hotel', label: 'Зочид буудал', subtitle: 'Буудлууд', icon: '🏨' },
];

// API-аас дата татах
async function fetchYellowBooks(): Promise<YellowBook[]> {
  const API =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3333';

  const res = await fetch(`${API}/yellow-books`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch yellow-books:', res.status, res.statusText);
    return [];
  }

  const json = await res.json();
  const parsed = YellowBookListSchema.safeParse(json);

  if (!parsed.success) {
    console.error('YellowBook validation error:', parsed.error.flatten());
    return [];
  }

  return parsed.data;
}

export default async function HomePage() {
  const books = await fetchYellowBooks();

  return (
    <div className="bg-[#F8FAFC] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-0">
        {/* Hero */}
        <section className="mb-10">
          <div className="rounded-3xl bg-[#FFF7D6] px-6 py-12 text-center shadow-sm sm:px-10">
            <h1 className="mb-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Монголын үйлчилгээг нэг дороос
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">
              Дэлгүүр, ресторан, буудал, эмнэлэг, үйлчилгээ — бүгдийг Шар Ном
              хуудаснаас!
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Төрөл</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className="flex min-w-[130px] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-400 hover:shadow-md"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  {cat.icon}
                </span>
                <span className="text-left">
                  {cat.label}
                  <span className="block text-[11px] font-normal text-slate-500">
                    {cat.subtitle}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Featured – API-ээс ирсэн YellowBook-ууд */}
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Онцлох шар номнууд</h2>
            {books.length > 0 && (
              <p className="text-xs text-slate-500">
                Нийт {books.length} байгууллага
              </p>
            )}
          </div>

          {books.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 px-4 py-6 text-center text-sm text-slate-500">
              Одоогоор шар номын мэдээлэл ачаалагдсангүй. Backend эсвэл API
              тохиргоог шалгана уу.
            </div>
          ) : (
            <YellowBooksGrid books={books} />
          )}
        </section>
      </main>
    </div>
  );
}

// Seed/input-д createdAt, updatedAt шаардлагагүй болсон тул
// энэ хэсгийг одоохондоо ашиглахгүй байж болно, хэрэггүй бол хасаарай.
export const YellowBookInputSchema = YellowBookSchema.partial({
  publishedAt: true,
});
export type YellowBookInput = z.infer<typeof YellowBookInputSchema>;