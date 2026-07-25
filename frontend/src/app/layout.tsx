'use client'

import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { PwaRegister } from '@/app/pwa-register'
import { useI18n } from '@/store/i18n'
import { useEffect } from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { direction, language, setLanguage } = useI18n()

  // Load language from localStorage if possible on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('myk_lang')
      if (stored) {
        setLanguage(stored)
      }
    }
  }, [setLanguage])

  return (
    <html lang={language} dir={direction}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#030014" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* SEO Tags */}
        <title>MYK Platform | Mohammad Yasin Karami</title>
        <meta name="description" content="Mohammad Yasin Karami's Personal Platform. Building Tomorrow with Artificial Intelligence. Evolving Next-Gen AI Services." />
        <link rel="canonical" href="https://myk-platform.com" />

        {/* OpenGraph Tags */}
        <meta property="og:title" content="MYK Platform | Mohammad Yasin Karami" />
        <meta property="og:description" content="Building Tomorrow with Artificial Intelligence. Advanced AI services, projects, books, and courses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://myk-platform.com" />
        <meta property="og:site_name" content="MYK Platform" />
        <meta property="og:image" content="https://myk-platform.com/og-image.jpg" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MYK Platform | Mohammad Yasin Karami" />
        <meta name="twitter:description" content="Building Tomorrow with Artificial Intelligence. Advanced AI services, projects, books, and courses." />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohammad Yasin Karami",
              "jobTitle": "AI Engineer & Entrepreneur",
              "url": "https://myk-platform.com",
              "sameAs": [
                "https://github.com/mohammadyasinkarami"
              ]
            })
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-[#030014] text-foreground">
        <PwaRegister />
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
