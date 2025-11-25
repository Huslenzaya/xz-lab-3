// src/components/layout/SiteHeader.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Нүүр' },
  { href: '/categories', label: 'Төрлүүд' },
  { href: '/business', label: 'Байгууллага нэмэх' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight">
            Yellow<span className="text-yellow-500">Book</span>
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            Mongolia
          </span>
        </Link>

        {/* Center nav + search (desktop) */}
        <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
          {/* Nav items */}
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    'rounded-full px-3 py-1.5 transition ' +
                    (active
                      ? 'bg-slate-900 text-white'
                      : 'hover:bg-slate-100')
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Нэр, төрөл, хаягаар хайх…"
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-xs outline-none ring-0 transition hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-yellow-300"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-900">
              Хайх
            </button>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Mobile: simple search icon */}
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-xs md:hidden">
            🔍
          </button>

          <Link
            href="/login"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Нэвтрэх
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-900"
          >
            Бүртгүүлэх
          </Link>
        </div>
      </div>

      {/* Mobile search (доод хэсэгт) */}
      <div className="border-t bg-white px-4 pb-3 pt-2 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Нэр, төрөл, хаягаар хайх…"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 pr-10 text-sm outline-none ring-0 transition hover:border-slate-300 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-yellow-300"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-black px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-900">
            Хайх
          </button>
        </div>
      </div>
    </header>
  );
}
