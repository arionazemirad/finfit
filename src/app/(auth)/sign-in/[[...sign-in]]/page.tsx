"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ClayCard } from "@/components/ui/clay-card";

export default function SignInPage() {
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
              Welcome Back
            </h1>
            <p className='text-gray-600 dark:text-gray-300'>
              Continue your financial journey 💪
            </p>
          </div>

          <SignIn
            forceRedirectUrl="/dashboard"
            signUpUrl="/onboarding/start"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
              },
            }}
          />
          
          <div className='text-center pt-4'>
            <p className='text-gray-600 dark:text-gray-300 text-sm'>
              Don't have an account?{" "}
              <a
                href='/onboarding/start'
                className='text-indigo-600 hover:text-indigo-700 font-semibold transition-colors'
              >
                Sign up
              </a>
            </p>
          </div>
        </ClayCard>
      </motion.div>
    </div>
  );
} 