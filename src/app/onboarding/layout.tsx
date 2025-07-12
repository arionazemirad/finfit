"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";

const steps = [
  { path: "/onboarding/start", label: "Welcome", step: 1 },
  { path: "/onboarding/goal", label: "Goal", step: 2 },
  { path: "/onboarding/job", label: "Job", step: 3 },
  { path: "/onboarding/connect", label: "Connect", step: 4 },
  { path: "/onboarding/done", label: "Done", step: 5 },
];

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const currentStep = steps.find((step) => step.path === pathname);
  const currentStepNumber = currentStep?.step || 1;
  const totalSteps = steps.length;

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-zinc-900 dark:to-zinc-800 font-outfit'>
      {/* Header with progress and theme toggle */}
      <div className='fixed top-0 left-0 right-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-purple-100 dark:border-zinc-700'>
        <div className='max-w-2xl mx-auto px-4 py-4 flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center space-x-2'>
            <span className='text-2xl font-bold text-gray-900 dark:text-white'>
              FinFit
            </span>
            <span className='text-2xl'>💸</span>
          </div>

          {/* Progress indicator */}
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              Step {currentStepNumber} of {totalSteps}
            </span>
            <div className='w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
              <motion.div
                className='h-2 bg-indigo-600 rounded-full'
                initial={{ width: 0 }}
                animate={{
                  width: `${(currentStepNumber / totalSteps) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'
          >
            {theme === "light" ? (
              <Moon className='w-5 h-5 text-gray-600' />
            ) : (
              <Sun className='w-5 h-5 text-yellow-500' />
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className='pt-20'>{children}</div>
    </div>
  );
}
