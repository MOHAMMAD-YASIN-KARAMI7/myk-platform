import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from '@/app/providers';
import { generateJsonLD } from '@/utils/metadata';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://myk-platform.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'MYK Platform | AI Engineer & Full-Stack Developer',
    template: '%s | MYK Platform',
  },
  description:
    'Mohammad Yasin Karami - AI Engineer, Python Developer, and Entrepreneur. Premium personal platform showcasing projects, expertise, and innovative solutions.',
  keywords: [
    'AI Engineer',
    'Python Developer',
    'Full Stack Developer',
    'Machine Learning',
    'Mohammad Yasin Karami',
    'Software Development',
    'Artificial Intelligence',
  ],
  authors: [
    {
      name: 'Mohammad Yasin Karami',
      url: baseUrl,
    },
  ],
  creator: 'Mohammad Yasin Karami',
  publisher: 'Mohammad Yasin Karami',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'MYK Platform | AI Engineer & Full-Stack Developer',
    description:
      'Mohammad Yasin Karami - AI Engineer, Python Developer, and Entrepreneur. Premium personal platform showcasing projects and expertise.',
    siteName: 'MYK Platform',
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'MYK Platform',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MYK Platform | AI Engineer & Full-Stack Developer',
    description:
      'Mohammad Yasin Karami - AI Engineer, Python Developer, and Entrepreneur.',
    images: [`${baseUrl}/og-image.png`],
    creator: '@MohamadYasn',
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: 'google-site-verification-code-here',
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLD = generateJsonLD({
    jobTitle: ['AI Engineer', 'Python Developer', 'Entrepreneur'],
    email: 'contact@myk-platform.com',
    telephone: '+98',
  });

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MYK Platform" />
        <link rel="canonical" href={baseUrl} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLD),
          }}
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
