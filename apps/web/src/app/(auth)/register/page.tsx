// src/app/(auth)/register/page.tsx
import Link from 'next/link';
import React from 'react';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white px-8 py-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
      <h1 className="mb-2 text-xl font-semibold text-slate-900">Бүртгүүлэх</h1>
      <p className="mb-6 text-xs text-slate-500">
        YellowBook-д бүртгүүлж, байгууллагаа нэмэх эсвэл дуртай газруудаа хадгалж аваарай.
      </p>

      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            Нэр
          </label>
          <input
            type="text"
            placeholder="Таны нэр"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            Имэйл
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            Нууц үг
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            Нууц үг (давтах)
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div className="flex flex-col gap-2 text-xs text-slate-600">
          <label className="inline-flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-yellow-500 focus:ring-yellow-300"
            />
            <span>
              Үйлчилгээний{' '}
              <Link
                href="/terms"
                className="font-medium text-slate-800 underline-offset-2 hover:underline"
              >
                нөхцөл
              </Link>{' '}
              болон{' '}
              <Link
                href="/privacy"
                className="font-medium text-slate-800 underline-offset-2 hover:underline"
              >
                нууцлалын бодлогыг
              </Link>{' '}
              хүлээн зөвшөөрч байна.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-[#FFD400] py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-[#ffcd00]"
        >
          Бүртгүүлэх
        </button>
      </form>

      <p className="mt-6 text-center text-[11px] text-slate-500">
        Аль хэдийн аккаунттай юу?{' '}
        <Link
          href="/login"
          className="font-medium text-slate-800 underline-offset-2 hover:underline"
        >
          Нэвтрэх
        </Link>
      </p>
    </div>
  );
}
