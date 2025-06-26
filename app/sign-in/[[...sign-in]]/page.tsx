import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
      <div className=" flex justify-center items-center py-8 bg-pink-50 dark:bg-gray-900 h-max">
          <SignIn/>
    </div>
  )
}
