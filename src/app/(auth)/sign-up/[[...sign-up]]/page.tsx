"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ClayCard } from "@/components/ui/clay-card";

export default function SignUpPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md'
      >
        <ClayCard className='flex flex-col items-center space-y-6'>
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
              Welcome to FinFit
            </h1>
            <p className='text-gray-600 dark:text-gray-300'>
              Your financial journey starts here 🚀
            </p>
          </div>

          <SignUp
            forceRedirectUrl='/onboarding/start'
            signInUrl='/sign-in'
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
              },
            }}
          />
        </ClayCard>
      </motion.div>
    </div>
  );
}
