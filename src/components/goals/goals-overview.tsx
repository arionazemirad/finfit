"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockGoals } from "@/lib/mock-data";

interface GoalsOverviewProps {
  balanceData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function GoalsOverview({
  balanceData,
  isLoading,
  error,
}: GoalsOverviewProps) {
  const goals = mockGoals;

  // Calculate overall progress
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = (totalCurrent / totalTarget) * 100;

  // Calculate goal status counts
  const onTrackCount = goals.filter(
    (goal) => goal.status === "on-track"
  ).length;
  const behindCount = goals.filter((goal) => goal.status === "behind").length;
  const aheadCount = goals.filter((goal) => goal.status === "ahead").length;

  if (isLoading) {
    return (
      <Card className='animate-pulse'>
        <CardHeader>
          <div className='h-6 bg-gray-200 rounded w-1/3'></div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='h-8 bg-gray-200 rounded'></div>
            <div className='h-4 bg-gray-200 rounded'></div>
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
            <AlertTriangle className='h-8 w-8 mx-auto mb-2' />
            <p>Failed to load goals data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='flex items-center gap-2'>
            <Target className='h-5 w-5 text-purple-600' />
            Goals Overview
          </span>
          <Badge
            variant='secondary'
            className='bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
          >
            {goals.length} Goals
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Overall Progress */}
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Overall Progress</span>
            <span className='font-medium'>{overallProgress.toFixed(1)}%</span>
          </div>
          <Progress value={overallProgress} className='h-3' />
        </div>

        {/* Goal Stats */}
        <div className='grid grid-cols-3 gap-4'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-green-600'>
              ${totalCurrent.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>Saved</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-purple-600'>
              ${totalTarget.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>Target</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-blue-600'>
              ${(totalTarget - totalCurrent).toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>Remaining</p>
          </div>
        </div>

        {/* Goal Status Summary */}
        <div className='grid grid-cols-3 gap-2'>
          <div className='text-center p-2 rounded-lg bg-green-50 dark:bg-green-950/20'>
            <p className='text-lg font-bold text-green-600'>{onTrackCount}</p>
            <p className='text-xs text-green-600'>On Track</p>
          </div>
          <div className='text-center p-2 rounded-lg bg-orange-50 dark:bg-orange-950/20'>
            <p className='text-lg font-bold text-orange-600'>{behindCount}</p>
            <p className='text-xs text-orange-600'>Behind</p>
          </div>
          <div className='text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20'>
            <p className='text-lg font-bold text-blue-600'>{aheadCount}</p>
            <p className='text-xs text-blue-600'>Ahead</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
