"use client";

import type { ReactNode } from 'react';
import { MainLayout } from '@/components/layout/main-layout';

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
