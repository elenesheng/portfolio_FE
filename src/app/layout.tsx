import type React from 'react';
import type { Metadata } from 'next';
import './global.css';
import { Inter } from 'next/font/google';
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import { getSiteUrl } from '@lib/site';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = getSiteUrl();

const siteDescription =
  'Full-time full-stack developer working with React, Next.js, Node.js, and headless CMS (Strapi, Drupal). Occasional freelance when a project interests me. Tech writing, small creative-code experiments, practical notes on AI helpers in real projects, and film & street photography.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Elene Shengelia · Full-stack developer',
    template: '%s | Elene Shengelia',
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Elene Shengelia',
    title: 'Elene Shengelia · Full-stack developer',
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elene Shengelia · Full-stack developer',
    description: siteDescription,
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
