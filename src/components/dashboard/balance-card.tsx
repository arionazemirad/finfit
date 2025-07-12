"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  balanceData: {
    totalBalance: number;
    accountCount: number;
    income: number;
    expenses: number;
    savings: number;
  };
  isLoading: boolean;
  error: string | null;
}

export function BalanceCard({
  balanceData,
  isLoading,
  error,
}: BalanceCardProps) {
  const { user } = useUser();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const { totalBalance, accountCount, income, expenses, savings } = balanceData;
  const isPositive = totalBalance > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className='relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20 shadow-lg'>
          <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5' />
          <CardHeader className='relative'>
            <div className='flex items-center justify-between'>
              <div>
                <Skeleton className='h-6 w-48 mb-2' />
                <Skeleton className='h-4 w-32' />
              </div>
              <Skeleton className='h-6 w-20' />
            </div>
          </CardHeader>
          <CardContent className='relative'>
            <div className='flex items-center justify-between mb-6'>
              <div className='flex flex-col'>
                <Skeleton className='h-4 w-24 mb-2' />
                <Skeleton className='h-10 w-32' />
              </div>
              <Skeleton className='h-6 w-24' />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='text-center'>
                <Skeleton className='h-8 w-20 mx-auto mb-1' />
                <Skeleton className='h-3 w-12 mx-auto' />
              </div>
              <div className='text-center'>
                <Skeleton className='h-8 w-20 mx-auto mb-1' />
                <Skeleton className='h-3 w-12 mx-auto' />
              </div>
              <div className='text-center'>
                <Skeleton className='h-8 w-20 mx-auto mb-1' />
                <Skeleton className='h-3 w-12 mx-auto' />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className='relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20 shadow-lg'>
        {/* Background gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5' />

        <CardHeader className='relative'>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-lg font-outfit font-medium text-foreground/90'>
                {getGreeting()}, {user?.firstName || "User"} 👋
              </CardTitle>
              <p className='text-sm text-muted-foreground mt-1'>
                Here's your financial overview
              </p>
            </div>
            <Badge
              variant='secondary'
              className='bg-white/20 dark:bg-gray-800/20 text-foreground border-white/20 dark:border-gray-700/20'
            >
              {accountCount} {accountCount === 1 ? "Account" : "Accounts"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className='relative'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-3'>
              <div className='flex flex-col'>
                <p className='text-sm font-medium text-muted-foreground'>
                  Total Balance
                </p>
                <div className='flex items-center space-x-2'>
                  <span className='text-3xl font-bold font-outfit'>
                    {isBalanceVisible ? formatCurrency(totalBalance) : "••••••"}
                  </span>
                  <button
                    onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {isBalanceVisible ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className='flex items-center space-x-1 text-sm'>
              {isPositive ? (
                <TrendingUp className='h-4 w-4 text-green-500' />
              ) : (
                <TrendingDown className='h-4 w-4 text-red-500' />
              )}
              <span className={isPositive ? "text-green-500" : "text-red-500"}>
                {isPositive ? "+" : ""}12.5%
              </span>
              <span className='text-muted-foreground'>vs last month</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className='grid grid-cols-3 gap-4'>
            <div className='text-center'>
              <p className='text-2xl font-bold text-green-500'>
                +{formatCurrency(income)}
              </p>
              <p className='text-xs text-muted-foreground'>Income</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-red-500'>
                -{formatCurrency(expenses)}
              </p>
              <p className='text-xs text-muted-foreground'>Expenses</p>
            </div>
            <div className='text-center'>
              <p className='text-2xl font-bold text-blue-500'>
                {formatCurrency(savings)}
              </p>
              <p className='text-xs text-muted-foreground'>Saved</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
