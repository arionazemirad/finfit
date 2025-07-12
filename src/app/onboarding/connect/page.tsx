"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ClayCard } from "@/components/ui/clay-card";
import { ClayButton } from "@/components/ui/clay-button";
import { usePlaidLink } from "react-plaid-link";
import { Shield, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

export default function ConnectPage() {
  const { user } = useUser();
  const router = useRouter();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Fetch link token on component mount
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await fetch("/api/plaid/link-token", {
          method: "POST",
        });
        const data = await response.json();
        setLinkToken(data.link_token);

        // Check if we're in demo mode
        if (data.message?.includes("mock")) {
          setIsDemoMode(true);
        }
      } catch (error) {
        console.error("Error fetching link token:", error);
        setIsDemoMode(true);
      }
    };

    fetchLinkToken();
  }, []);

  // Handle successful Plaid Link
  const onSuccess = async (public_token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/plaid/exchange-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_token }),
      });

      if (response.ok) {
        setIsConnected(true);
        setTimeout(() => {
          router.push("/onboarding/done");
        }, 1500);
      }
    } catch (error) {
      console.error("Error exchanging token:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle demo mode connection
  const handleDemoConnect = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("/api/plaid/exchange-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_token: "demo_token" }),
      });

      if (response.ok) {
        setIsConnected(true);
        setTimeout(() => {
          router.push("/onboarding/done");
        }, 1500);
      }
    } catch (error) {
      console.error("Error in demo mode:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
    onEvent: (eventName, metadata) => {
      console.log("Plaid event:", eventName, metadata);
    },
    onExit: (err, metadata) => {
      console.log("Plaid exit:", err, metadata);
    },
  });

  const handleConnect = () => {
    if (isDemoMode) {
      handleDemoConnect();
    } else if (ready) {
      open();
    }
  };

  if (isConnected) {
    return (
      <div className='min-h-screen flex items-center justify-center p-8'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='max-w-lg w-full'
        >
          <ClayCard className='text-center space-y-6'>
            <CheckCircle className='w-16 h-16 text-green-500 mx-auto' />
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Bank Connected! 🎉
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              {isDemoMode
                ? "Demo connection successful!"
                : "Redirecting you to complete your setup..."}
            </p>
          </ClayCard>
        </motion.div>
      </div>
    );
  }

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
                <CreditCard className='w-8 h-8 text-white' />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className='text-3xl font-bold text-gray-900 dark:text-white'
            >
              Let's securely connect your bank 💳
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className='text-lg text-gray-600 dark:text-gray-300'
            >
              We use bank-level security to safely connect your accounts
            </motion.p>
          </div>

          {isDemoMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ClayCard className='bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'>
                <div className='flex items-center space-x-3'>
                  <AlertCircle className='w-5 h-5 text-amber-600 dark:text-amber-400' />
                  <div>
                    <p className='text-sm font-medium text-amber-800 dark:text-amber-200'>
                      Demo Mode
                    </p>
                    <p className='text-xs text-amber-600 dark:text-amber-300'>
                      Plaid isn't configured yet. This will simulate a bank
                      connection.
                    </p>
                  </div>
                </div>
              </ClayCard>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <ClayCard>
              <div className='space-y-6'>
                <div className='text-center space-y-4'>
                  <Shield className='w-12 h-12 text-green-500 mx-auto' />
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                    Your data is safe with us
                  </h3>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600 dark:text-gray-300'>
                      256-bit bank-level encryption
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600 dark:text-gray-300'>
                      Read-only access
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600 dark:text-gray-300'>
                      No login credentials stored
                    </span>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600 dark:text-gray-300'>
                      SOC 2 Type II certified
                    </span>
                  </div>
                </div>

                <div className='bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4'>
                  <p className='text-sm text-blue-800 dark:text-blue-200'>
                    <strong>Why connect your bank?</strong>
                    <br />
                    FinFit analyzes your spending patterns to provide
                    personalized insights, track your progress towards financial
                    goals, and help you make smarter money decisions.
                  </p>
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
              onClick={handleConnect}
              disabled={(!ready && !isDemoMode) || isLoading}
              variant='primary'
              size='lg'
              className='w-full'
            >
              {isLoading
                ? "Connecting..."
                : isDemoMode
                  ? "Connect Bank (Demo)"
                  : "Connect My Bank"}
            </ClayButton>

            <p className='text-xs text-gray-500 dark:text-gray-400 text-center mt-3'>
              {isDemoMode
                ? "Demo mode - no real bank connection"
                : "Powered by Plaid - trusted by millions"}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
