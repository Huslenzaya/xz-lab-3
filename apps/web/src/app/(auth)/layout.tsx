// src/app/(auth)/layout.tsx
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-full max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-0 py-16">
      {children}
    </div>
  );
}
