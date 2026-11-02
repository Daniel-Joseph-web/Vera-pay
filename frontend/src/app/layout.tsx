import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';


// @ts-ignore Next.js processes this stylesheet import at build time.
import './globals.css';

import { Navbar } from '@/components/layout/Navbar';
import { ShieldCheck } from 'lucide-react';

// Fallback font variables without external network dependency
const display = { variable: 'font-display' };
const body = { variable: 'font-body' };

export const metadata: Metadata = {
  title: 'Verapay | Verify, then release.',
  description:
    'AI-verified, milestone-gated, sender-approved payments directly to Nigerian providers.',
  icons: {
    icon: '/logo.png',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#061b16',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col bg-[#061b16] font-[family-name:var(--font-body)] text-white antialiased selection:bg-emerald-300 selection:text-[#05291e]">
        <Navbar />

        {/* Pages render their own <main>, so this is a plain wrapper */}
        <div className="flex flex-1 flex-col">{children}</div>

        {/* Global live status banner */}
        <footer className="border-t border-white/[0.06] bg-[#041610] px-4 py-2.5 text-[11px] text-white/60">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-2 text-center sm:justify-start sm:text-left">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="font-semibold text-white/90">Verapay Active Rails:</span>

              <span>
                PayPal Sandbox Checkout (Inbound) &bull; Paystack NIP Direct Transfers (Naira
                Payout)
              </span>
            </div>

            <div className="flex items-center gap-3 text-white/45">
              <span className="flex items-center gap-1 font-medium text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                100% Payment Protection Active
              </span>

              <span aria-hidden="true">&bull;</span>

              <span>Hackathon Prototype v2.0</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}