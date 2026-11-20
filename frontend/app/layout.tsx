import React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
});

export const metadata: Metadata = {
  title: 'AETHER-RAMI | De Novo Mixture-of-Experts Equivariant Diffusion',
  description: 'Structure-based generative AI platform overcoming acquired single and double gatekeeper drug resistance across 36 clinical disease targets.',
  keywords: ['drug discovery', 'SE(3) diffusion', 'ESM-2', 'mixture of experts', 'gatekeeper resistance', 'KRAS', 'EGFR', 'MDR-TB'],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/icon.svg',
    shortcut: '/icon.svg'
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#FFE600" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body suppressHydrationWarning className="bg-canvas text-ink min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
