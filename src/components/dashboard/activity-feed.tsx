"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockTransactions } from "@/lib/mock-data";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

interface ActivityFeedProps {
  activityData: Array<{
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    vendor: string;
    type: "income" | "expense";
  }>;
  isLoading: boolean;
  error: string | null;
}

export function ActivityFeed({
  activityData = [],
  isLoading = false,
  error = null,
}: ActivityFeedProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getVendorAvatar = (vendor: string) => {
    // Return first letter of vendor name as fallback
    return vendor.charAt(0).toUpperCase();
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Food: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      Transportation:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      Shopping:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      Income:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      Subscriptions:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20 shadow-lg'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-lg font-outfit font-medium'>
            Recent Activity
          </CardTitle>
          <Activity className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {(activityData.length > 0
              ? activityData
              : [
                  {
                    id: "1",
                    description: "Coffee & Pastry",
                    amount: -12.5,
                    category: "Food",
                    date: "2024-01-15",
                    vendor: "Starbucks",
                    type: "expense" as const,
                  },
                  {
                    id: "2",
                    description: "Salary Deposit",
                    amount: 3500.0,
                    category: "Income",
                    date: "2024-01-14",
                    vendor: "TechCorp Inc.",
                    type: "income" as const,
                  },
                  {
                    id: "3",
                    description: "Uber Ride",
                    amount: -18.75,
                    category: "Transportation",
                    date: "2024-01-13",
                    vendor: "Uber",
                    type: "expense" as const,
                  },
                  {
                    id: "4",
                    description: "Amazon Purchase",
                    amount: -45.99,
                    category: "Shopping",
                    date: "2024-01-12",
                    vendor: "Amazon",
                    type: "expense" as const,
                  },
                  {
                    id: "5",
                    description: "Freelance Project",
                    amount: 800.0,
                    category: "Income",
                    date: "2024-01-11",
                    vendor: "Design Studio",
                    type: "income" as const,
                  },
                ]
            )
              .slice(0, 5)
              .map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  className='flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200 group'
                >
                  <div className='flex items-center space-x-3'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${transaction.vendor}`}
                      />
                      <AvatarFallback className='text-xs'>
                        {getVendorAvatar(transaction.vendor)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center space-x-2'>
                        <p className='font-medium text-sm truncate'>
                          {transaction.description}
                        </p>
                        <Badge
                          variant='secondary'
                          className={`text-xs px-2 py-1 ${getCategoryColor(transaction.category)}`}
                        >
                          {transaction.category}
                        </Badge>
                      </div>
                      <div className='flex items-center space-x-2 text-xs text-muted-foreground'>
                        <span>{transaction.vendor}</span>
                        <span>•</span>
                        <span>{formatDate(transaction.date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <div className='text-right'>
                      <div className='flex items-center space-x-1'>
                        {transaction.type === "income" ? (
                          <ArrowUpRight className='h-3 w-3 text-green-500' />
                        ) : (
                          <ArrowDownLeft className='h-3 w-3 text-red-500' />
                        )}
                        <span
                          className={`font-semibold text-sm ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <MoreHorizontal className='h-3 w-3' />
                    </Button>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className='mt-4 pt-3 border-t border-white/10 dark:border-gray-700/10'>
            <Button
              variant='outline'
              className='w-full bg-white/5 hover:bg-white/10 dark:bg-gray-800/5 dark:hover:bg-gray-800/10 border-white/20 dark:border-gray-700/20'
            >
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
