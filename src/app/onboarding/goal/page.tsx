"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ClayCard } from "@/components/ui/clay-card";
import { ClayButton } from "@/components/ui/clay-button";
import { upsertOnboardingData } from "@/lib/supabase";
import { PiggyBank, ShoppingCart, TrendingUp, Search } from "lucide-react";

const goals = [
  {
    id: "save_big",
    title: "Save for something big",
    description: "Building up for a major purchase or goal",
    icon: PiggyBank,
    emoji: "💰",
  },
  {
    id: "stop_overspending",
    title: "Stop overspending",
    description: "Get control over impulse purchases",
    icon: ShoppingCart,
    emoji: "🛑",
  },
  {
    id: "build_habits",
    title: "Build better habits",
    description: "Create sustainable financial routines",
    icon: TrendingUp,
    emoji: "📈",
  },
  {
    id: "curious",
    title: "Just curious",
    description: "Exploring what FinFit is all about",
    icon: Search,
    emoji: "🤔",
  },
];

export default function GoalPage() {
  const { user } = useUser();
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedGoal || !user) return;

    setIsLoading(true);
    try {
      await upsertOnboardingData({
        user_id: user.id,
        goal: selectedGoal,
      });
      router.push("/onboarding/job");
    } catch (error) {
      console.error("Error saving goal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='max-w-2xl w-full'
      >
        <div className='space-y-8'>
          <div className='text-center space-y-4'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='text-3xl font-bold text-gray-900 dark:text-white'
            >
              Why are you joining FinFit?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='text-lg text-gray-600 dark:text-gray-300'
            >
              This helps us personalize your experience
            </motion.p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <ClayCard
                  onClick={() => setSelectedGoal(goal.id)}
                  selected={selectedGoal === goal.id}
                  hoverable
                  className='h-full text-center space-y-4 cursor-pointer'
                >
                  <div className='text-4xl'>{goal.emoji}</div>
                  <div className='space-y-2'>
                    <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                      {goal.title}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300'>
                      {goal.description}
                    </p>
                  </div>
                </ClayCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className='pt-4'
          >
            <ClayButton
              onClick={handleContinue}
              disabled={!selectedGoal || isLoading}
              variant='primary'
              size='lg'
              className='w-full'
            >
              {isLoading ? "Saving..." : "Continue"}
            </ClayButton>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
