import type React from 'react';
import type { Metadata } from 'next';
import './global.css';
import { Inter } from 'next/font/google';
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import { getSiteUrl } from '@lib/site';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Elene Shengelia · Freelance full-stack developer',
    template: '%s | Elene Shengelia',
  },
  description:
    'Freelance React and Next.js work with headless CMSs (Strapi, Drupal). Tech writing, small creative-code experiments, practical notes on AI helpers in real projects, and film & street photography.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Elene Shengelia',
    title: 'Elene Shengelia · Freelance full-stack developer',
    description:
      'Freelance React and Next.js work with headless CMSs (Strapi, Drupal). Tech writing, small creative-code experiments, practical notes on AI helpers in real projects, and film & street photography.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elene Shengelia · Freelance full-stack developer',
    description:
      'Freelance React and Next.js work with headless CMSs (Strapi, Drupal). Tech writing, small creative-code experiments, practical notes on AI helpers in real projects, and film & street photography.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
