// src/app/(auth)/login/page.tsx
import Link from 'next/link';
import React from 'react';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white px-8 py-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
      <h1 className="mb-2 text-xl font-semibold text-slate-900">Нэвтрэх</h1>
      <p className="mb-6 text-xs text-slate-500">
        YellowBook аккаунтаараа нэвтрэн байгууллагуудаа удирдаарай.
      </p>

      <form className="space-y-4">
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

        <div className="flex items-center justify-between text-xs text-slate-600">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-slate-300 text-yellow-500 focus:ring-yellow-300"
            />
            <span>Сануулах</span>
          </label>

          <Link href="/auth/forgot-password" className="hover:text-slate-800">
            Нууц үг мартсан уу?
          </Link>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-[#FFD400] py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-[#ffcd00]"
        >
          Нэвтрэх
        </button>
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 text-[11px] text-slate-400">
        <div className="h-px flex-1 bg-slate-200" />
        эсвэл
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Social (placeholder) */}
      <div className="space-y-2">
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50">
          <span>🔐</span>
          Google-ээр нэвтрэх
        </button>
      </div>

      {/* Bottom text */}
      <p className="mt-6 text-center text-[11px] text-slate-500">
        Аккаунт байхгүй юу?{' '}
        <Link
          href="/register"
          className="font-medium text-slate-800 underline-offset-2 hover:underline"
        >
          Бүртгүүлэх
        </Link>
      </p>
    </div>
  );
}
