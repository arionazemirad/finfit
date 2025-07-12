"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { mockSpendingData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface BudgetProgressProps {
  spendingData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function BudgetProgress({
  spendingData,
  isLoading,
  error,
}: BudgetProgressProps) {
  const data = mockSpendingData;

  // Calculate trends
  const currentWeekSpending =
    data.datasets[0].data[data.datasets[0].data.length - 1];
  const previousWeekSpending =
    data.datasets[0].data[data.datasets[0].data.length - 2];
  const spendingChange =
    ((currentWeekSpending - previousWeekSpending) / previousWeekSpending) * 100;

  const currentWeekIncome =
    data.datasets[1].data[data.datasets[1].data.length - 1];
  const previousWeekIncome =
    data.datasets[1].data[data.datasets[1].data.length - 2];
  const incomeChange =
    ((currentWeekIncome - previousWeekIncome) / previousWeekIncome) * 100;

  if (isLoading) {
    return (
      <Card className='animate-pulse'>
        <CardHeader>
          <div className='h-6 bg-gray-200 rounded w-1/2'></div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='h-32 bg-gray-200 rounded'></div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='h-16 bg-gray-200 rounded'></div>
              <div className='h-16 bg-gray-200 rounded'></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <div className='text-center text-red-600'>
            <BarChart3 className='h-8 w-8 mx-auto mb-2' />
            <p>Failed to load progress data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Spending Progress</span>
          <Badge variant='outline' className='text-xs'>
            This Month
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Chart Placeholder */}
        <div className='h-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <BarChart3 className='h-8 w-8 mx-auto mb-2 text-blue-600' />
            <p className='text-sm text-muted-foreground'>Spending Chart</p>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>This Week</span>
              <Badge
                variant='secondary'
                className={cn(
                  "text-xs",
                  spendingChange > 0
                    ? "text-red-600 bg-red-50"
                    : "text-green-600 bg-green-50"
                )}
              >
                {spendingChange > 0 ? (
                  <TrendingUp className='h-3 w-3' />
                ) : (
                  <TrendingDown className='h-3 w-3' />
                )}
                {Math.abs(spendingChange).toFixed(1)}%
              </Badge>
            </div>
            <p className='text-2xl font-bold text-red-600'>
              ${currentWeekSpending.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>Spent</p>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>Income</span>
              <Badge
                variant='secondary'
                className={cn(
                  "text-xs",
                  incomeChange > 0
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                )}
              >
                {incomeChange > 0 ? (
                  <TrendingUp className='h-3 w-3' />
                ) : (
                  <TrendingDown className='h-3 w-3' />
                )}
                {Math.abs(incomeChange).toFixed(1)}%
              </Badge>
            </div>
            <p className='text-2xl font-bold text-green-600'>
              ${currentWeekIncome.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>Earned</p>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className='pt-4 border-t'>
          <div className='flex justify-between items-center'>
            <span className='text-sm font-medium'>Monthly Summary</span>
            <span className='text-sm text-muted-foreground'>Jan 2024</span>
          </div>
          <div className='mt-2 grid grid-cols-3 gap-4 text-center'>
            <div>
              <p className='text-lg font-bold text-gray-900 dark:text-white'>
                $
                {data.datasets[0].data
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </p>
              <p className='text-xs text-muted-foreground'>Total Spent</p>
            </div>
            <div>
              <p className='text-lg font-bold text-gray-900 dark:text-white'>
                $
                {data.datasets[1].data
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </p>
              <p className='text-xs text-muted-foreground'>Total Income</p>
            </div>
            <div>
              <p className='text-lg font-bold text-blue-600'>
                $
                {(
                  data.datasets[1].data.reduce((a, b) => a + b, 0) -
                  data.datasets[0].data.reduce((a, b) => a + b, 0)
                ).toLocaleString()}
              </p>
              <p className='text-xs text-muted-foreground'>Net</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
