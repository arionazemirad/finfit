"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Trophy,
  TrendingUp,
  Target,
  Star,
  Calendar,
  DollarSign,
  Zap,
} from "lucide-react";
import { mockGoals } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface GoalInsightsProps {
  activityData?: any;
  upcomingBillsData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function GoalInsights({
  activityData,
  upcomingBillsData,
  isLoading,
  error,
}: GoalInsightsProps) {
  const goals = mockGoals;

  const insights = [
    {
      type: "achievement",
      title: "Emergency Fund Milestone",
      description: "You're 75% to your $10,000 emergency fund goal!",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      type: "tip",
      title: "Accelerate Your Goals",
      description:
        "Consider increasing your monthly savings by $200 to reach your car goal faster",
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      type: "motivation",
      title: "Great Progress!",
      description: "You're ahead on 2 out of 4 goals. Keep up the momentum!",
      icon: Star,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const achievements = [
    {
      id: "1",
      title: "Emergency Fund Started",
      description: "Saved your first $1,000",
      date: "2024-01-15",
      icon: "🛡️",
    },
    {
      id: "2",
      title: "Vacation Fund Milestone",
      description: "Reached 50% of vacation goal",
      date: "2024-01-10",
      icon: "✈️",
    },
    {
      id: "3",
      title: "Consistent Saver",
      description: "Saved for 30 consecutive days",
      date: "2024-01-05",
      icon: "💪",
    },
  ];

  if (isLoading) {
    return (
      <Card className='animate-pulse'>
        <CardHeader>
          <div className='h-6 bg-gray-200 rounded w-1/3'></div>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='h-20 bg-gray-200 rounded'></div>
            <div className='h-20 bg-gray-200 rounded'></div>
            <div className='h-20 bg-gray-200 rounded'></div>
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
            <p>Failed to load insights</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Goal Insights */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Lightbulb className='h-5 w-5 text-yellow-600' />
            Goal Insights
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {insights.map((insight, index) => (
            <div
              key={index}
              className={cn(
                "p-3 rounded-lg flex items-start gap-3",
                insight.bgColor
              )}
            >
              <insight.icon className={cn("h-4 w-4 mt-0.5", insight.color)} />
              <div className='flex-1'>
                <h4 className='font-medium text-sm'>{insight.title}</h4>
                <p className='text-xs text-muted-foreground mt-1'>
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <div className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span className='flex items-center gap-2'>
                <Trophy className='h-5 w-5 text-yellow-600' />
                Recent Achievements
              </span>
              <Button variant='ghost' size='sm' className='text-xs'>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <div className='text-2xl'>{achievement.icon}</div>
                  <div>
                    <p className='font-medium text-sm'>{achievement.title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-xs text-muted-foreground'>
                    {achievement.date}
                  </p>
                  <Badge
                    variant='secondary'
                    className='text-xs bg-yellow-100 text-yellow-700'
                  >
                    <Star className='h-3 w-3' />
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Motivation Card */}
        <Card className='bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Zap className='h-5 w-5 text-purple-600' />
              Daily Motivation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                "The best time to start saving was yesterday. The second best
                time is now."
              </p>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center'>
                    <Target className='h-4 w-4 text-purple-600' />
                  </div>
                  <div>
                    <p className='text-xs font-medium'>Today's Focus</p>
                    <p className='text-xs text-muted-foreground'>
                      Emergency Fund
                    </p>
                  </div>
                </div>
                <Badge
                  variant='secondary'
                  className='text-xs bg-purple-100 text-purple-700'
                >
                  $2,500 to go
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
