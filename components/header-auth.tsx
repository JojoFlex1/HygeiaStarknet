"use client";
import Link from 'next/link'
import { Button } from './ui/button'
import { ThemeSwitcher } from './theme-switcher'
import Image from 'next/image'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function HeaderAuth() {
  return (
    <div className="max-w-5xl mx-auto flex justify-between items-center h-full px-4">
      <div className="flex items-center font-semibold justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Home"
            width={40}
            height={40} // Fix aspect ratio warning
          />
          <h2 className="text-2xl font-bold leading-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Hygeia
          </h2>
        </Link>
        <ThemeSwitcher />
      </div>
      
      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-pink-600">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  )
}

// "use client";
// import Link from 'next/link'
// import { Button } from './ui/button'
// import { ThemeSwitcher } from './theme-switcher'
// import Image from 'next/image'
// import {
//   SignInButton,
//   SignOutButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
//   ClerkProvider,
// } from '@clerk/nextjs'

// export default function AuthButton() {
  
//   return (
//     <>
//         <div className="flex flex-col min-h-screen">
//           <nav className="sticky top-0 z-50 w-full  border-b-foreground/20 h-16 bg-pink-50 dark:bg-gray-900 transition-colors duration-300 shadow-xl">
//             <div className="max-w-5xl mx-auto flex justify-between items-center h-full px-4">
//               <div className="flex items-center font-semibold justify-between">
//                 <Link href="/" className=" flex items-center gap-2">
//                   <Image
//                     src="/images/logo.png"
//                     alt="Home"
//                     width={40}
//                     height={50}
//                   />
//                   <h2 className="text-2xl font-bold leading-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
//                     Hygeia
//                   </h2>
//                 </Link>

//                 <ThemeSwitcher />
//               </div>
//               <SignedIn>
//                 <UserButton />
//               </SignedIn>
//               <SignedOut>
//                 <SignInButton mode="modal">
//                   <Button className=" bg-pink-600">Sign In</Button>
//                 </SignInButton>
//               </SignedOut>
//             </div>
//           </nav>
//         </div>
//     </>
//   )
// }
