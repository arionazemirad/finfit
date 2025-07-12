"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockUpcomingBills } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Calendar, AlertCircle, CheckCircle } from "lucide-react";

interface UpcomingBillsProps {
  upcomingBillsData: Array<{
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    category: string;
    icon: string;
  }>;
  isLoading: boolean;
  error: string | null;
}

export function UpcomingBills({
  upcomingBillsData = [],
  isLoading = false,
  error = null,
}: UpcomingBillsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 1) return `${diffDays} days`;
    return "Overdue";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getBadgeVariant = (dueDate: string) => {
    const date = new Date(dueDate);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "destructive";
    if (diffDays <= 3) return "default";
    return "secondary";
  };

  const getIcon = (dueDate: string) => {
    const date = new Date(dueDate);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return <AlertCircle className='h-4 w-4 text-red-500' />;
    if (diffDays <= 3)
      return <AlertCircle className='h-4 w-4 text-yellow-500' />;
    return <CheckCircle className='h-4 w-4 text-green-500' />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20 shadow-lg'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-lg font-outfit font-medium'>
            Upcoming Bills
          </CardTitle>
          <Calendar className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {(upcomingBillsData.length > 0
              ? upcomingBillsData
              : [
                  {
                    id: "1",
                    name: "Netflix",
                    amount: 15.99,
                    dueDate: "2024-01-20",
                    category: "Subscriptions",
                    icon: "🎬",
                  },
                  {
                    id: "2",
                    name: "Spotify",
                    amount: 9.99,
                    dueDate: "2024-01-22",
                    category: "Subscriptions",
                    icon: "🎵",
                  },
                  {
                    id: "3",
                    name: "Rent",
                    amount: 1200.0,
                    dueDate: "2024-01-28",
                    category: "Housing",
                    icon: "🏠",
                  },
                  {
                    id: "4",
                    name: "Phone Bill",
                    amount: 45.0,
                    dueDate: "2024-01-25",
                    category: "Utilities",
                    icon: "📱",
                  },
                ]
            ).map((bill, index) => (
              <motion.div
                key={bill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className='flex items-center justify-between p-3 rounded-lg bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200'
              >
                <div className='flex items-center space-x-3'>
                  <div className='text-2xl'>{bill.icon}</div>
                  <div>
                    <p className='font-medium text-sm'>{bill.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      {bill.category}
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-2'>
                  <div className='text-right'>
                    <p className='font-semibold text-sm'>
                      {formatCurrency(bill.amount)}
                    </p>
                    <div className='flex items-center space-x-1'>
                      {getIcon(bill.dueDate)}
                      <Badge
                        variant={getBadgeVariant(bill.dueDate)}
                        className='text-xs'
                      >
                        {formatDate(bill.dueDate)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className='mt-4 pt-3 border-t border-white/10 dark:border-gray-700/10'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Total upcoming</span>
              <span className='font-semibold'>
                {formatCurrency(
                  (upcomingBillsData.length > 0
                    ? upcomingBillsData
                    : [
                        {
                          id: "1",
                          name: "Netflix",
                          amount: 15.99,
                          dueDate: "2024-01-20",
                          category: "Subscriptions",
                          icon: "🎬",
                        },
                        {
                          id: "2",
                          name: "Spotify",
                          amount: 9.99,
                          dueDate: "2024-01-22",
                          category: "Subscriptions",
                          icon: "🎵",
                        },
                        {
                          id: "3",
                          name: "Rent",
                          amount: 1200.0,
                          dueDate: "2024-01-28",
                          category: "Housing",
                          icon: "🏠",
                        },
                        {
                          id: "4",
                          name: "Phone Bill",
                          amount: 45.0,
                          dueDate: "2024-01-25",
                          category: "Utilities",
                          icon: "📱",
                        },
                      ]
                  ).reduce((sum, bill) => sum + bill.amount, 0)
                )}
              </span>
            </div>
          </div>

          <Button
            variant='outline'
            className='w-full mt-4 bg-white/5 hover:bg-white/10 dark:bg-gray-800/5 dark:hover:bg-gray-800/10 border-white/20 dark:border-gray-700/20'
          >
            View All Bills
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
