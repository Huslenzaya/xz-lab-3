// src/app/layout.tsx
import { SiteHeader } from '@/components/layout/SideHeader';
import './global.css';
import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SideFooter';

export const metadata: Metadata = {
  title: 'YellowBook',
  description: 'Монголын үйлчилгээг нэг дороос',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="bg-[#F5F5F5] text-slate-900">
        <div className="min-h-screen flex flex-col">
          <SiteHeader />

\          <main className="flex-1">{children}</main>

          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
