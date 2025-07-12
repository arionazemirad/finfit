"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetOverviewProps {
  balanceData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function BudgetOverview({
  balanceData,
  isLoading,
  error,
}: BudgetOverviewProps) {
  // Mock budget data for now
  const totalBudget = 2500;
  const totalSpent = 1169;
  const remainingBudget = totalBudget - totalSpent;
  const budgetUsage = (totalSpent / totalBudget) * 100;

  const getBudgetStatus = () => {
    if (budgetUsage >= 90)
      return {
        status: "critical",
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: AlertTriangle,
      };
    if (budgetUsage >= 75)
      return {
        status: "warning",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        icon: TrendingUp,
      };
    return {
      status: "good",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: CheckCircle,
    };
  };

  const status = getBudgetStatus();

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
            <p>Failed to load budget data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Budget Overview</span>
          <Badge
            variant='secondary'
            className={cn(
              "flex items-center gap-1",
              status.color,
              status.bgColor
            )}
          >
            <status.icon className='h-3 w-3' />
            {status.status === "critical" && "Critical"}
            {status.status === "warning" && "Warning"}
            {status.status === "good" && "On Track"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Budget Progress */}
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Budget Usage</span>
            <span className='font-medium'>{budgetUsage.toFixed(1)}%</span>
          </div>
          <Progress value={budgetUsage} className='h-3' />
        </div>

        {/* Budget Stats */}
        <div className='grid grid-cols-3 gap-4'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-green-600'>
              ${totalBudget.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>Total Budget</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-red-600'>
              ${totalSpent.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>Spent</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-blue-600'>
              ${remainingBudget.toLocaleString()}
            </p>
            <p className='text-xs text-muted-foreground'>Remaining</p>
          </div>
        </div>

        {/* Budget Status Message */}
        <div
          className={cn(
            "p-3 rounded-lg flex items-center gap-2",
            status.bgColor
          )}
        >
          <status.icon className={cn("h-4 w-4", status.color)} />
          <span className={cn("text-sm font-medium", status.color)}>
            {status.status === "critical" &&
              "You've used 90% of your budget. Consider reducing spending."}
            {status.status === "warning" &&
              "You're approaching your budget limit. Monitor your spending."}
            {status.status === "good" &&
              "Great job! You're well within your budget limits."}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
