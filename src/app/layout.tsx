import type React from 'react';
import './global.css';
import { Inter } from 'next/font/google';
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Elene Shengelia - Creative Portfolio',
  description: 'Designer, developer, and creative thinker',
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
