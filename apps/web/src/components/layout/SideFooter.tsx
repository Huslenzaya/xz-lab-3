// src/components/layout/SiteFooter.tsx
import React from 'react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-0">
        <div className="grid gap-8 text-xs text-slate-500 sm:grid-cols-4">
          {/* Logo + short text */}
          <div className="sm:col-span-1">
            <div className="mb-2 text-base font-semibold text-slate-900">
              Yellow<span className="text-yellow-500">Book</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Монголын үйлчилгээний газруудыг нэг дор цуглуулсан
              хайлтын платформ.
            </p>
          </div>

          {/* Main links */}
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
              Сайт
            </h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:text-slate-700">
                  Нүүр хуудас
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-slate-700">
                  Төрлүүд
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-slate-700">
                  Байгууллага нэмэх
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-slate-700">
                  Үнийн санал
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
              Тусламж
            </h4>
            <ul className="space-y-1">
              <li>
                <Link href="/contact" className="hover:text-slate-700">
                  Холбоо барих
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-slate-700">
                  Тусламжийн төв
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-slate-700">
                  Түгээмэл асуултууд
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-slate-700">
                  Байгууллагаар нэвтрэх
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal + social */}
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
              Бодлогын мэдээлэл
            </h4>
            <ul className="space-y-1">
              <li>
                <Link href="/terms" className="hover:text-slate-700">
                  Үйлчилгээний нөхцөл
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-700">
                  Нууцлалын бодлого
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-slate-700">
                  Cookie бодлого
                </Link>
              </li>
            </ul>

            <div className="mt-4 flex gap-3 text-lg">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-slate-700"
              >
                👍
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="hover:text-slate-700"
              >
                📸
              </Link>
              <Link
                href="https://x.com"
                target="_blank"
                className="hover:text-slate-700"
              >
                ✕
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t pt-4 text-[11px] text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} YellowBook.mn — Бүх эрх хуулиар хамгаалагдсан.</span>
          <span className="text-[10px]">
            Made for Lab 3 · NX / Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}
