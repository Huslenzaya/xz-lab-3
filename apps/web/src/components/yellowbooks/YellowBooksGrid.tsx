// apps/web/src/components/yellowbooks/YellowBooksGrid.tsx
'use client';

import { useMemo, useState } from 'react';

// API-аас ирж буй бүтэцтэй таарах орон нутгийн type
type YellowBookForGrid = {
  id: string;
  title: string;
  description: string;
  pricePerMonth: number;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  status: string;
  contactName: string;
  phone: string;
  publishedAt: Date | string;
  // Prisma дээр String? учраас null байж болно, JSON-оор ирэхдээ байхгүй байж бас болно
  email?: string | null;
};

type Props = {
  books: YellowBookForGrid[];
};

export default function YellowBooksGrid({ books }: Props) {
  const [selected, setSelected] = useState<YellowBookForGrid | null>(null);

  // modal дотор ашиглах format-ласан огноо
  const formattedSelectedDates = useMemo(() => {
    if (!selected) return null;

    const published =
      selected.publishedAt instanceof Date
        ? selected.publishedAt
        : new Date(selected.publishedAt);

    return {
      published: published.toLocaleString(),
    };
  }, [selected]);

  const getCoverImage = (book: YellowBookForGrid) =>
    // DB-д imageUrl байхгүй тул id дээр суурилсан fallback зураг ашиглая
    `https://picsum.photos/seed/${book.id}/400/300`;

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <button
            key={book.id}
            type="button"
            onClick={() => setSelected(book)}
            className="group overflow-hidden rounded-3xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            {/* Image */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={getCoverImage(book)}
                alt={book.title}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="space-y-3 px-4 pb-4 pt-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 sm:text-xs">
                    {book.category} · {book.address}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-[11px] font-semibold text-yellow-700">
                    {book.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-900">
                    {book.pricePerMonth.toLocaleString()} ₮ / сар
                  </span>
                </div>
              </div>

              <p className="line-clamp-2 text-[11px] text-slate-600 sm:text-xs">
                {book.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 sm:text-xs">
                <span>
                  Lat: {book.latitude.toFixed(2)}, Lng:{' '}
                  {book.longitude.toFixed(2)}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                  Дэлгэрэнгүй
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && formattedSelectedDates && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setSelected(null)} // background дээр дарахад хаагдана
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition"
            onClick={(e) => e.stopPropagation()} // дотор нь дарахад хаагдахгүй
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-sm font-bold text-slate-700 hover:bg-black/10"
            >
              ×
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Cover image */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={getCoverImage(selected)}
                  alt={selected.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Text info */}
              <div className="space-y-3 px-6 pb-4 pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-600">
                  YellowBook · {selected.category}
                </p>
                <h2 className="text-lg font-semibold text-slate-900">
                  {selected.title}
                </h2>

                <p className="text-xs text-slate-500">
                  {selected.address} · Статус: {selected.status}
                </p>

                <p className="text-[11px] leading-relaxed text-slate-600 sm:text-xs">
                  {selected.description}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] text-slate-600 sm:text-xs">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      Түрээсийн үнэ
                    </div>
                    <div>{selected.pricePerMonth.toLocaleString()} ₮ / сар</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      Байршил (координат)
                    </div>
                    <div>
                      Lat: {selected.latitude.toFixed(4)}, Lng:{' '}
                      {selected.longitude.toFixed(4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      Нэмэгдсэн
                    </div>
                    <div>{formattedSelectedDates.published}</div>
                  </div>
                </div>
              </div>

              {/* Map section */}
              <div className="border-t px-6 pb-5 pt-4">
                <div className="mb-2 text-[11px] text-slate-500">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                    Байршил (газрын зураг)
                  </span>
                  <p className="text-[11px]">
                    Google Maps дээрх ойролцоо байршил:
                  </p>
                </div>
                <div className="h-56 w-full overflow-hidden rounded-2xl border border-slate-200">
                  <iframe
                    title="YellowBook location"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${selected.latitude},${selected.longitude}&z=15&output=embed`}
                  />
                </div>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="flex items-center justify-between border-t px-6 py-3 text-[11px] text-slate-500">
              <span className="truncate">
                ID: <span className="font-mono text-[10px]">{selected.id}</span>
              </span>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full bg-black px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-900"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
