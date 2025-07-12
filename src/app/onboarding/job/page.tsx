"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ClayCard } from "@/components/ui/clay-card";
import { ClayButton } from "@/components/ui/clay-button";
import { upsertOnboardingData } from "@/lib/supabase";
import { Briefcase } from "lucide-react";

const jobSuggestions = [
  { label: "Student", emoji: "🎓" },
  { label: "Freelancer", emoji: "💻" },
  { label: "Teacher", emoji: "👨‍🏫" },
  { label: "Engineer", emoji: "⚙️" },
  { label: "Designer", emoji: "🎨" },
  { label: "Healthcare", emoji: "⚕️" },
  { label: "Finance", emoji: "💼" },
  { label: "Marketing", emoji: "📈" },
  { label: "Retail", emoji: "🛒" },
  { label: "Food Service", emoji: "🍽️" },
  { label: "Other", emoji: "💼" },
];

export default function JobPage() {
  const { user } = useUser();
  const router = useRouter();
  const [occupation, setOccupation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestionClick = (suggestion: string) => {
    setOccupation(suggestion);
  };

  const handleContinue = async () => {
    if (!occupation.trim() || !user) return;

    setIsLoading(true);
    try {
      await upsertOnboardingData({
        user_id: user.id,
        occupation: occupation.trim(),
      });
      router.push("/onboarding/connect");
    } catch (error) {
      console.error("Error saving occupation:", error);
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
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='flex justify-center'
            >
              <div className='w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center'>
                <Briefcase className='w-8 h-8 text-white' />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='text-3xl font-bold text-gray-900 dark:text-white'
            >
              What do you do?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className='text-lg text-gray-600 dark:text-gray-300'
            >
              Tell us about your work or studies
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <ClayCard>
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Your occupation
                  </label>
                  <input
                    type='text'
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder='e.g., Software Engineer, College Student...'
                    className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white'
                  />
                </div>

                <div>
                  <p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
                    Quick suggestions:
                  </p>
                  <div className='grid grid-cols-3 sm:grid-cols-4 gap-2'>
                    {jobSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={suggestion.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.6 + index * 0.05,
                          duration: 0.3,
                        }}
                        onClick={() => handleSuggestionClick(suggestion.label)}
                        className='p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors text-center'
                      >
                        <div className='text-xl mb-1'>{suggestion.emoji}</div>
                        <div className='text-xs text-gray-700 dark:text-gray-300'>
                          {suggestion.label}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </ClayCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className='pt-4'
          >
            <ClayButton
              onClick={handleContinue}
              disabled={!occupation.trim() || isLoading}
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
