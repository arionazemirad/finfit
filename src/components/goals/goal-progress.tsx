"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  DollarSign,
} from "lucide-react";
import { mockGoals } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface GoalProgressProps {
  spendingData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function GoalProgress({
  spendingData,
  isLoading,
  error,
}: GoalProgressProps) {
  const goals = mockGoals;

  // Calculate trends
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  // Calculate monthly savings needed
  const totalRemaining = totalTarget - totalSaved;
  const averageDaysToDeadline =
    goals.reduce((sum, goal) => {
      const days = Math.ceil(
        (new Date(goal.deadline).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return sum + Math.max(days, 0);
    }, 0) / goals.length;
  const monthlySavingsNeeded = totalRemaining / (averageDaysToDeadline / 30);

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
            <Target className='h-8 w-8 mx-auto mb-2' />
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
          <span>Goal Progress</span>
          <Badge variant='outline' className='text-xs'>
            {overallProgress.toFixed(1)}% Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Progress Chart Placeholder */}
        <div className='h-32 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg flex items-center justify-center'>
          <div className='text-center'>
            <Target className='h-8 w-8 mx-auto mb-2 text-purple-600' />
            <p className='text-sm text-muted-foreground'>Goal Progress Chart</p>
          </div>
        </div>

        {/* Savings Stats */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>Total Saved</span>
              <Badge
                variant='secondary'
                className='text-xs bg-green-100 text-green-700'
              >
                <TrendingUp className='h-3 w-3' />
              </Badge>
            </div>
            <p className='text-2xl font-bold text-green-600'>
              ${totalSaved.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>Across all goals</p>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium'>Monthly Target</span>
              <Badge
                variant='secondary'
                className='text-xs bg-blue-100 text-blue-700'
              >
                <DollarSign className='h-3 w-3' />
              </Badge>
            </div>
            <p className='text-2xl font-bold text-blue-600'>
              ${monthlySavingsNeeded.toFixed(0)}
            </p>
            <p className='text-xs text-muted-foreground'>To stay on track</p>
          </div>
        </div>

        {/* Goal Milestones */}
        <div className='pt-4 border-t'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-sm font-medium'>Recent Milestones</span>
            <span className='text-sm text-muted-foreground'>This Month</span>
          </div>
          <div className='space-y-3'>
            {goals.slice(0, 3).map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              return (
                <div
                  key={goal.id}
                  className='flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800'
                >
                  <div className='flex items-center gap-2'>
                    <div className='text-lg'>{goal.icon}</div>
                    <div>
                      <p className='text-sm font-medium'>{goal.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {progress.toFixed(1)}% complete
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-medium text-green-600'>
                      ${goal.currentAmount.toLocaleString()}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      of ${goal.targetAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Milestone */}
        <div className='pt-4 border-t'>
          <div className='flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20'>
            <div className='p-2 rounded-full bg-purple-100 dark:bg-purple-900'>
              <Target className='h-4 w-4 text-purple-600' />
            </div>
            <div className='flex-1'>
              <p className='text-sm font-medium'>Next Milestone</p>
              <p className='text-xs text-muted-foreground'>
                Emergency Fund - $2,500 more to reach $10,000
              </p>
            </div>
            <Badge
              variant='secondary'
              className='text-xs bg-purple-100 text-purple-700'
            >
              75%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
