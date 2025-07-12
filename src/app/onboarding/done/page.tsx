"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ClayCard } from "@/components/ui/clay-card";
import { ClayButton } from "@/components/ui/clay-button";
import { upsertOnboardingData } from "@/lib/supabase";
import { PartyPopper, CheckCircle, ArrowRight } from "lucide-react";

export default function DonePage() {
  const { user } = useUser();
  const router = useRouter();

  // Mark onboarding as complete
  useEffect(() => {
    const completeOnboarding = async () => {
      if (user) {
        try {
          await upsertOnboardingData({
            user_id: user.id,
            onboarding_complete: true,
          });
        } catch (error) {
          console.error("Error completing onboarding:", error);
        }
      }
    };

    completeOnboarding();
  }, [user]);

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className='max-w-lg w-full'
      >
        <ClayCard className='text-center space-y-8'>
          {/* Celebration Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            className='relative'
          >
            <div className='w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4'>
              <CheckCircle className='w-12 h-12 text-white' />
            </div>

            {/* Floating celebration emojis */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -20 }}
              transition={{
                delay: 0.6,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className='absolute -top-2 -left-8 text-2xl'
            >
              🎉
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -15 }}
              transition={{
                delay: 0.8,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className='absolute -top-4 -right-6 text-2xl'
            >
              ✨
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -25 }}
              transition={{
                delay: 1,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className='absolute -bottom-2 -left-4 text-2xl'
            >
              🚀
            </motion.div>
          </motion.div>

          <div className='space-y-4'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className='text-3xl font-bold text-gray-900 dark:text-white'
            >
              You're all set, {user?.firstName}! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className='text-lg text-gray-600 dark:text-gray-300'
            >
              Welcome to FinFit! Your financial journey begins now.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className='bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 space-y-3'
            >
              <h3 className='font-semibold text-gray-900 dark:text-white'>
                What's next?
              </h3>
              <ul className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
                <li className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-indigo-500 rounded-full'></div>
                  <span>View your personalized dashboard</span>
                </li>
                <li className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-indigo-500 rounded-full'></div>
                  <span>Set up your first savings goal</span>
                </li>
                <li className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-indigo-500 rounded-full'></div>
                  <span>Start tracking your spending</span>
                </li>
                <li className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-indigo-500 rounded-full'></div>
                  <span>Earn your first achievement</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className='pt-4'
          >
            <ClayButton
              onClick={handleGoToDashboard}
              variant='primary'
              size='lg'
              className='w-full group'
            >
              <span className='flex items-center justify-center space-x-2'>
                <span>Go to Dashboard</span>
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </span>
            </ClayButton>
          </motion.div>
        </ClayCard>
      </motion.div>
    </div>
  );
}
