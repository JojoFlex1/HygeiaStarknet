'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ConnectWalletButton from './connectWalletButton'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="static top-16 z-20 w-1/2 flex justify-center border-b border-b-foreground/10 h-16 bg-background mx-auto">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
        <Link
  href="/protected"
  className={`pb-1 transition-colors duration-300
    ${pathname === '/protected'
      ? 'text-pink-700 border-b-2 border-pink-700 dark:text-pink-400 dark:border-pink-400'
      : 'text-black hover:text-pink-700 dark:text-white dark:hover:text-pink-400'
    }`}
>
  Products
</Link>

<Link
  href="/cart"
  className={`pb-1 transition-colors duration-300
    ${pathname === '/cart'
      ? 'text-pink-700 border-b-2 border-pink-700 dark:text-pink-400 dark:border-pink-400'
      : 'text-black hover:text-pink-700 dark:text-white dark:hover:text-pink-400'
    }`}
>
  Cart
</Link>

          <div className="flex items-center gap-2"></div>
        </div>
        <div>
          <ConnectWalletButton/>
        </div>
      </div>
    </nav>
  )
}
