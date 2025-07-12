"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, TrendingUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockGoals } from "@/lib/mock-data";

interface ActiveGoalsProps {
  categoriesData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function ActiveGoals({
  categoriesData,
  isLoading,
  error,
}: ActiveGoalsProps) {
  const goals = mockGoals;

  const getGoalStatus = (goal: any) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const daysUntilDeadline = Math.ceil(
      (new Date(goal.deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (progress >= 100)
      return {
        status: "completed",
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: CheckCircle,
      };
    if (goal.status === "behind")
      return {
        status: "behind",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        icon: AlertTriangle,
      };
    if (goal.status === "ahead")
      return {
        status: "ahead",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        icon: TrendingUp,
      };
    return {
      status: "on-track",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: CheckCircle,
    };
  };

  const formatDeadline = (deadline: string) => {
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (days < 0) return "Overdue";
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    if (days < 30) return `${days} days left`;
    const months = Math.ceil(days / 30);
    return `${months} month${months > 1 ? "s" : ""} left`;
  };

  if (isLoading) {
    return (
      <Card className='animate-pulse'>
        <CardHeader>
          <div className='h-6 bg-gray-200 rounded w-1/2'></div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-2 bg-gray-200 rounded'></div>
              </div>
            ))}
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
            <p>Failed to load goals</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Active Goals</span>
          <Badge variant='outline' className='text-xs'>
            {goals.length} Goals
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const status = getGoalStatus(goal);
          const remaining = goal.targetAmount - goal.currentAmount;

          return (
            <div
              key={goal.id}
              className='space-y-3 p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='text-2xl'>{goal.icon}</div>
                  <div>
                    <h4 className='font-medium text-sm'>{goal.name}</h4>
                    <p className='text-xs text-muted-foreground'>
                      {goal.category}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant='secondary'
                    className={cn("text-xs", status.color, status.bgColor)}
                  >
                    <status.icon className='h-3 w-3' />
                  </Badge>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Progress</span>
                  <span className='font-medium'>{progress.toFixed(1)}%</span>
                </div>
                <Progress
                  value={progress}
                  className='h-2'
                  style={
                    {
                      "--progress-color": goal.color,
                    } as React.CSSProperties
                  }
                />
              </div>

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <p className='text-muted-foreground'>Current</p>
                  <p className='font-medium text-green-600'>
                    ${goal.currentAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className='text-muted-foreground'>Target</p>
                  <p className='font-medium'>
                    ${goal.targetAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className='flex justify-between items-center text-xs text-muted-foreground'>
                <span>${remaining.toLocaleString()} remaining</span>
                <span className='flex items-center gap-1'>
                  <Calendar className='h-3 w-3' />
                  {formatDeadline(goal.deadline)}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
