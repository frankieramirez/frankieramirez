import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { GoogleAnalytics } from "@/components/analytics"
import { PersonSchema } from "@/components/structured-data"
import { ScrollToSection } from "@/components/scroll-to-section"
import { GameManager } from "@/components/game-manager"
import { Suspense } from "react"

// Optimize font loading with display swap
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Import Press Start 2P font for pixelated text
const pressStart2P = {
  variable: "--font-press-start",
}

// Update the metadata section with more comprehensive SEO tags
export const metadata: Metadata = {
  title: "Frankie Ramirez | Frontend Architect",
  description:
    "Personal website of Frankie Ramirez, a Frontend Architect specializing in modern web technologies including React, Next.js, and Node.js.",
  keywords:
    "Frankie Ramirez, Frontend Architect, React, Next.js, Web Development, UI Engineer, Frontend Developer, JavaScript Developer",
  authors: [{ name: "Frankie Ramirez" }],
  creator: "Frankie Ramirez",
  metadataBase: new URL("https://frankieramirez.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://frankieramirez.com",
    title: "Frankie Ramirez | Frontend Architect",
    description: "Personal website of Frankie Ramirez, a Frontend Architect specializing in modern web technologies.",
    siteName: "Frankie Ramirez",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Frankie Ramirez - Frontend Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frankie Ramirez | Frontend Architect",
    description: "Personal website of Frankie Ramirez, a Frontend Architect specializing in modern web technologies.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Add Press Start 2P font for pixelated text */}
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

        {/* Add structured data */}
        <PersonSchema />
      </head>
      <body className={`${inter.variable} ${pressStart2P.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <ScrollToSection />
          </Suspense>
          <Suspense fallback={null}>
            <GameManager />
          </Suspense>
          {/* Add scanlines and CRT effect for retro feel */}
          <div className="scanlines"></div>
          <div className="crt-effect"></div>

          {children}
          <Toaster />
        </ThemeProvider>
        {/* Add Google Analytics with Suspense */}
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  )
}
