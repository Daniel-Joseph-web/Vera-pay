import React from 'react';
import { DashboardThemeProvider } from '@/components/layout/ThemeContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardThemeProvider>{children}</DashboardThemeProvider>;
}
