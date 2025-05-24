import { EnvVarWarning } from '@/components/env-var-warning'
import HeaderAuth from '@/components/header-auth'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import './globals.css'
import { CartProvider } from '@/app/context/cart-context'
import { StarknetProvider } from '../lib/starknet-provider'
import Image from 'next/image'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

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
                <nav className="sticky top-0 z-50 w-full border-b border-b-foreground/10 h-16 bg-pink-50 dark:bg-gray-900 transition-colors duration-300">
                  <div className="max-w-5xl mx-auto flex justify-between items-center h-full px-4">
                    <div className="flex gap-5 items-center font-semibold">
                      <Link href="/">
                        <Image
                          src="/images/logo.png"
                          alt="Home"
                          width={100}
                          height={50} 
                        />
                      </Link>
                      <ThemeSwitcher />
                    </div>
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </div>
                </nav>
                <main className="flex-1">{children}</main>
                <footer className="border-t py-6 text-center text-xs bg-pink-50 dark:bg-gray-900 transition-colors duration-300">
                  <div className="max-w-5xl mx-auto px-4">
                    <p>
                      &copy; {new Date().getFullYear()} All rights reserved.
                    </p>
                  </div>
                </footer>
              </div>
            </ThemeProvider>
          </StarknetProvider>
        </body>
      </html>
    </CartProvider>
  )
}
