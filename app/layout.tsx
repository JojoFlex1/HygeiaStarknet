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
  title: 'Hygeia',
  description: 'A Blockchain-powered menstrual health e-commerce platform that makes menstrual products more accessible, affordable and traceable for girls across Kenya.',
  icons: {
    icon: '/images/logo.png',
  },
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
                <nav className="sticky top-0 z-50 w-full  border-b-foreground/20 h-16 bg-pink-50 dark:bg-gray-900 transition-colors duration-300 shadow-xl">
                  <div className="max-w-5xl mx-auto flex justify-between items-center h-full px-4">
                    <div className="flex items-center font-semibold justify-between">
                      <Link href="/" className=' flex items-center gap-2'>
                        <Image
                          src="/images/logo.png"
                          alt="Home"
                          width={40}
                          height={50}
                        />
                         <h2 className="text-2xl font-bold leading-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                        Hygeia
                                      </h2>
                      </Link>                     
                       
                      <ThemeSwitcher />
                    </div>
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </div>
                </nav>
                <main className="flex-1">{children}</main>
              </div>
            </ThemeProvider>
          </StarknetProvider>
        </body>
      </html>
    </CartProvider>
  )
}
