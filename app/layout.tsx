import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import LenisProvider from '@/components/LenisProvider';

const helvetica = localFont({
  src: [
    {
      path: '../fonts/helvetica-light-587ebe5a59211.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Helvetica.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Helvetica-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Helvetica-Oblique.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Helvetica-BoldOblique.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-helvetica',
});

export const metadata: Metadata = {
  title: 'Patil Group - Delivering Track Solutions | Railway Infrastructure',
  description: 'Trusted leader in railway infrastructure, delivering high-quality track solutions for urban and interurban transport. Made in India with over 50 years of expertise.',
  icons: {
    icon: [
      { url: '/pg.png', sizes: '32x32', type: 'image/png' },
      { url: '/pg.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/pg.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/pg.png',
  },
  openGraph: {
    title: 'Patil Group - Delivering Track Solutions | Railway Infrastructure',
    description: 'Trusted leader in railway infrastructure, delivering high-quality track solutions for urban and interurban transport. Made in India with over 50 years of expertise.',
    url: 'https://patilgroup.com',
    siteName: 'Patil Group',
    images: [
      {
        url: '/pg.png',
        width: 1200,
        height: 630,
        alt: 'Patil Group Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patil Group - Delivering Track Solutions | Railway Infrastructure',
    description: 'Trusted leader in railway infrastructure, delivering high-quality track solutions for urban and interurban transport. Made in India with over 50 years of expertise.',
    images: ['/pg.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and app icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/pg.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/pg.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/pg.png" />
        <link rel="shortcut icon" href="/pg.png" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/pg.png" as="image" />
      </head>
      <body className={`${helvetica.className} ${helvetica.variable}`}>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </LenisProvider>
      </body>
    </html>
  );
}