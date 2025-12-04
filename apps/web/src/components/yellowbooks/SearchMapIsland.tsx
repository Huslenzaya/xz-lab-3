'use client';

import type { YellowBook } from '@/app/page';

type Props = {
  books: YellowBook[];
};

export function SearchMapIsland({ books }: Props) {
  if (!books.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-500">
        Хайлтаар тохирох байгууллага олдсонгүй.
      </div>
    );
  }

  const first = books[0];

  const lat =
    'lat' in first ? (first as any).lat : (first as any).latitude ?? 47.92;
  const lng =
    'lng' in first ? (first as any).lng : (first as any).longitude ?? 106.92;

  return (
    <div className="space-y-3">
      <div className="text-xs text-slate-500">
        Газрын зураг нь эхний үр дүнгийн ойролцоо байршлыг харуулж байна.
      </div>
      <div className="h-64 w-full overflow-hidden rounded-2xl border border-slate-200">
        <iframe
          title="Search results map"
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${lat},${lng}&z=13&output=embed`}
        />
      </div>
    </div>
  );
}
