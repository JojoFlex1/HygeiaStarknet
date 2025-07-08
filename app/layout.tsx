import HeaderAuth from '@/components/header-auth'
import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { CartProvider } from '@/app/context/cart-context'
import { StarknetProvider } from '../lib/starknet-provider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'

const appearance = {
  elements: {     
   footer: "hidden"
  },
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://hygeia-starknet.vercel.app`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Hygeia',
  description:
    'Hygeia is a blockchain-powered menstrual health e-commerce platform that makes menstrual products more accessible, affordable, and traceable for girls across Kenya.',

  keywords: [
    'Hygeia',
    'menstrual health',
    'e-commerce',
    'blockchain',
    'menstrual products',
    'Kenya',
    'affordable sanitary pads',
    'traceability',
  ],

  authors: [{ name: 'Hygeia Team' }],
  creator: 'Hygeia',

  openGraph: {
    title: 'Hygeia - Menstrual Health on the Blockchain',
    description:
      'A blockchain-powered e-commerce platform that empowers girls in Kenya through affordable and traceable menstrual products.',
    url: 'https://hygeia-starknet.vercel.app',
    siteName: 'Hygeia',
    images: [
      {
        url: '/images/logo.png', // Ensure this path works in prod
        width: 1200,
        height: 630,
        alt: 'Hygeia Logo',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Hygeia - Menstrual Health on the Blockchain',
    description:
      'Making menstrual products more accessible, affordable, and transparent for girls across Kenya.',
    images: ['/images/logo.png'],
    creator: 'https://x.com/JJ638055109535', // optional if you have a Twitter/X handle
  },

  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png', // optional
  },

  alternates: {
    canonical: 'https://hygeia-starknet.vercel.app',
  },
};


const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider appearance={appearance}>
      <CartProvider>
        <html lang="en" className={geistSans.className} suppressHydrationWarning>
          <body className="bg-background text-foreground">
            <StarknetProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex flex-col min-h-screen">
                  <nav className="sticky top-0 z-50 w-full  border-b-foreground/20 h-16 bg-pink-50 dark:bg-gray-900 transition-colors duration-300 shadow-xl">
                    <HeaderAuth/>
                  </nav>
                  <main className="flex-1">{children}</main>
                </div>
              </ThemeProvider>
            </StarknetProvider>
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  )
}
