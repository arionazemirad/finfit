"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Target,
  DollarSign,
  Calendar,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockTransactions, mockUpcomingBills } from "@/lib/mock-data";

interface AISuggestionsProps {
  activityData?: any;
  upcomingBillsData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function AISuggestions({
  activityData,
  upcomingBillsData,
  isLoading,
  error,
}: AISuggestionsProps) {
  const transactions = mockTransactions;
  const upcomingBills = mockUpcomingBills;

  const suggestions = [
    {
      type: "savings",
      title: "Emergency Fund Boost",
      description:
        "You have $2,500 in upcoming bills. Consider setting aside $500 this month for emergencies.",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      priority: "high",
    },
    {
      type: "spending",
      title: "Reduce Food Spending",
      description:
        "You spent $485 on food this month. Try meal planning to save $200/month.",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      priority: "medium",
    },
    {
      type: "investment",
      title: "Investment Opportunity",
      description:
        "With $3,000 in savings, consider investing $500 in a diversified portfolio.",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      priority: "low",
    },
  ];

  const tips = [
    {
      title: "50/30/20 Rule",
      description: "50% needs, 30% wants, 20% savings",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Automate Savings",
      description: "Set up automatic transfers on payday",
      icon: Sparkles,
      color: "text-blue-600",
    },
    {
      title: "Track Every Dollar",
      description: "Use the app to monitor all spending",
      icon: TrendingUp,
      color: "text-purple-600",
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
            <Lightbulb className='h-8 w-8 mx-auto mb-2' />
            <p>Failed to load suggestions</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Lightbulb className='h-5 w-5 text-yellow-600' />
            AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={cn("p-3 rounded-lg border", suggestion.bgColor)}
            >
              <div className='flex items-start gap-3'>
                <suggestion.icon
                  className={cn("h-4 w-4 mt-0.5", suggestion.color)}
                />
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h4 className='font-medium text-sm'>{suggestion.title}</h4>
                    <Badge
                      variant='secondary'
                      className={cn(
                        "text-xs",
                        suggestion.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : suggestion.priority === "medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                      )}
                    >
                      {suggestion.priority === "high"
                        ? "High Priority"
                        : suggestion.priority === "medium"
                          ? "Medium Priority"
                          : "Low Priority"}
                    </Badge>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {suggestion.description}
                  </p>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-xs mt-2 p-0 h-auto'
                  >
                    Learn More →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Financial Tips & Upcoming Bills */}
      <div className='space-y-6'>
        {/* Financial Tips */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span className='flex items-center gap-2'>
                <Sparkles className='h-5 w-5 text-purple-600' />
                Financial Tips
              </span>
              <Button variant='ghost' size='sm' className='text-xs'>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {tips.map((tip, index) => (
              <div
                key={index}
                className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
              >
                <div className='p-2 rounded-full bg-gray-100 dark:bg-gray-800'>
                  <tip.icon className={cn("h-4 w-4", tip.color)} />
                </div>
                <div className='flex-1'>
                  <p className='font-medium text-sm'>{tip.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Bills Alert */}
        <Card className='bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <AlertTriangle className='h-5 w-5 text-orange-600' />
              Upcoming Bills Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                You have {upcomingBills.length} bills due this month totaling $
                {upcomingBills
                  .reduce((sum, bill) => sum + bill.amount, 0)
                  .toFixed(2)}
                .
              </p>
              <div className='space-y-2'>
                {upcomingBills.slice(0, 3).map((bill) => (
                  <div
                    key={bill.id}
                    className='flex items-center justify-between p-2 rounded-lg bg-white/50 dark:bg-gray-800/50'
                  >
                    <div className='flex items-center gap-2'>
                      <span className='text-lg'>{bill.icon}</span>
                      <div>
                        <p className='text-sm font-medium'>{bill.name}</p>
                        <p className='text-xs text-muted-foreground'>
                          Due {bill.dueDate}
                        </p>
                      </div>
                    </div>
                    <p className='text-sm font-medium text-red-600'>
                      ${bill.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <Button variant='outline' size='sm' className='w-full'>
                View All Bills
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
