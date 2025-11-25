// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#F8FAFC] px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white px-8 py-10 text-center shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
        {/* Badge */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7D6] text-xl">
          📒
        </div>

        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          404 – Хуудас олдсонгүй
        </p>

        <h1 className="mb-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Энэ хуудсыг YellowBook-д олсонгүй
        </h1>

        <p className="mx-auto mb-6 max-w-md text-sm text-slate-500">
          Та хаягаа буруу бичсэн эсвэл энэ байгууллага/хуудас одоогоор
          бүртгэгдээгүй байж магадгүй. Доорх сонголтуудаас нэгийг нь ашиглаад
          үргэлжлээрэй.
        </p>

        {/* Actions */}
        <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#FFD400] px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-[#ffcd00]"
          >
            Нүүр хуудас руу буцах
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Төрлөөр нь хайх
          </Link>
        </div>

        {/* Small search hint */}
        <div className="mx-auto max-w-md rounded-2xl bg-slate-50 px-4 py-3 text-left text-[11px] text-slate-500">
          <div className="mb-1 text-xs font-semibold text-slate-700">
            Түлхүүр үгээр хайлт хийх
          </div>
          <p>
            Дээд талын хайлтын хэсэгт байгууллагын нэр, хаяг, үйлчилгээний
            төрлөөр хайлт хийж дахин оролдоорой.
          </p>
        </div>
      </div>
    </div>
  );
}
