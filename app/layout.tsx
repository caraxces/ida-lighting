import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import FloatingContactButton from "@/components/floating-contact-button"
import { MusicPopup } from "@/components/music-popup"
import { SoundProvider } from "@/hooks/use-sound"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IDA Lighting - Giải pháp chiếu sáng chuyên nghiệp",
  description: "IDA Lighting cung cấp giải pháp chiếu sáng chuyên nghiệp, thiết kế ánh sáng sáng tạo và các sản phẩm chiếu sáng cao cấp cho không gian của bạn.",
  keywords: "IDA Lighting, chiếu sáng, đèn LED, thiết kế ánh sáng, giải pháp chiếu sáng",
  authors: [{ name: 'IDA Lighting' }],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://idalighting.vn',
    siteName: 'IDA Lighting',
    title: 'IDA Lighting - Giải pháp chiếu sáng chuyên nghiệp',
    description: 'Giải pháp chiếu sáng chuyên nghiệp, thiết kế ánh sáng sáng tạo',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IDA Lighting Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IDA Lighting - Giải pháp chiếu sáng chuyên nghiệp',
    description: 'Giải pháp chiếu sáng chuyên nghiệp, thiết kế ánh sáng sáng tạo',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://idalighting.vn" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Zalo specific meta tags */}
        <meta property="zalo:app_id" content="2654601455431390089" />
        <meta property="zalo:title" content="IDA Lighting - Giải pháp chiếu sáng chuyên nghiệp" />
        <meta property="zalo:description" content="Giải pháp chiếu sáng chuyên nghiệp, thiết kế ánh sáng sáng tạo" />
        <meta property="zalo:image" content="https://idalighting.vn/og-image.jpg" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IDA Lighting",
              "url": "https://idalighting.vn",
              "logo": "https://idalighting.vn/Ida B-W2.png",
              "sameAs": [
                "https://www.facebook.com/idalighting",
                // "https://www.instagram.com/idalighting"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+84-0918.259.789",
                "contactType": "customer service",
                "areaServed": "Vietnam",
                "availableLanguage": ["Vietnamese", "English"]
              }
            })
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} entry-active`} suppressHydrationWarning>
        <SoundProvider>
          {/* Entry screen that requires user interaction */}
          <MusicPopup />
          
          {/* Main content */}
          {children}
        </SoundProvider>

        {/* GSAP Scripts */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        
        {/* Howler.js for audio */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"
          strategy="beforeInteractive"
        />

        {/* Contact button with z-index lower than mobile menu */}
        <FloatingContactButton />
      </body>
    </html>
  )
}

import './globals.css'


