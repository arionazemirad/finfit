"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ClayCard } from "@/components/ui/clay-card";
import { ClayButton } from "@/components/ui/clay-button";
import { Sparkles } from "lucide-react";

export default function StartPage() {
  const { user } = useUser();
  const router = useRouter();

  const handleStart = () => {
    router.push("/onboarding/goal");
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='max-w-lg w-full'
      >
        <ClayCard className='text-center space-y-8'>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className='flex justify-center'
          >
            <div className='w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center'>
              <Sparkles className='w-10 h-10 text-white' />
            </div>
          </motion.div>

          <div className='space-y-4'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='text-3xl font-bold text-gray-900 dark:text-white'
            >
              Hey {user?.firstName || "there"}! 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className='text-lg text-gray-600 dark:text-gray-300'
            >
              Let's personalize your FinFit journey and get you started on the
              path to financial freedom!
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className='pt-4'
          >
            <ClayButton
              onClick={handleStart}
              variant='primary'
              size='lg'
              className='w-full'
            >
              Let's Go 🚀
            </ClayButton>
          </motion.div>
        </ClayCard>
      </motion.div>
    </div>
  );
}
