import type { ReactNode } from 'react';
import { AppHeader } from './header';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="p-4 sm:p-6 lg:p-8 animate-fade-in">
        {children}
      </main>
    </>
  );
}
