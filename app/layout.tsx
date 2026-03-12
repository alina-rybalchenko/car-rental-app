import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

import Header from '@/components/shared/Header/Header';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Car Rental App',
  description: 'Web application for browsing and renting cars',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <Header />

        <main>{children}</main>
      </body>
    </html>
  );
}
