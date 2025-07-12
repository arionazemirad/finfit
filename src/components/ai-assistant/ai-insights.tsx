"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  Target,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockBudgetCategories, mockSpendingData } from "@/lib/mock-data";

interface AIInsightsProps {
  categoriesData?: any;
  spendingData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function AIInsights({
  categoriesData,
  spendingData,
  isLoading,
  error,
}: AIInsightsProps) {
  const categories = mockBudgetCategories;
  const spendingData_ = mockSpendingData;

  // Calculate insights
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const budgetUsage = (totalSpent / totalBudget) * 100;

  const topSpendingCategory = categories.reduce((max, cat) =>
    cat.spent > max.spent ? cat : max
  );

  const insights = [
    {
      type: "warning",
      title: "High Food Spending",
      description:
        "You're spending 25% more on food than recommended. Consider meal planning to save $200/month.",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: "View Food Budget",
    },
    {
      type: "opportunity",
      title: "Savings Opportunity",
      description:
        "You could save $150/month by reducing subscription costs. Review your recurring payments.",
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: "Review Subscriptions",
    },
    {
      type: "positive",
      title: "Good Transportation Habits",
      description:
        "Your transportation spending is 15% below budget. Great job using public transport!",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: "View Details",
    },
  ];

  if (isLoading) {
    return (
      <Card className='animate-pulse'>
        <CardHeader>
          <div className='h-6 bg-gray-200 rounded w-1/2'></div>
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
            <Brain className='h-8 w-8 mx-auto mb-2' />
            <p>Failed to load AI insights</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='h-[600px] flex flex-col'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Brain className='h-5 w-5 text-purple-600' />
          AI Insights
          <Badge
            variant='secondary'
            className='text-xs bg-purple-100 text-purple-700'
          >
            <Sparkles className='h-3 w-3' />
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex-1 space-y-6'>
        {/* Summary Stats */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20'>
            <p className='text-2xl font-bold text-blue-600'>
              {budgetUsage.toFixed(1)}%
            </p>
            <p className='text-xs text-muted-foreground'>Budget Used</p>
          </div>
          <div className='text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20'>
            <p className='text-2xl font-bold text-green-600'>
              ${(totalBudget - totalSpent).toFixed(0)}
            </p>
            <p className='text-xs text-muted-foreground'>Remaining</p>
          </div>
        </div>

        {/* AI Insights */}
        <div className='space-y-4'>
          <h3 className='text-sm font-medium text-muted-foreground'>
            Today's Insights
          </h3>
          {insights.map((insight, index) => (
            <div
              key={index}
              className={cn("p-3 rounded-lg border", insight.bgColor)}
            >
              <div className='flex items-start gap-3'>
                <insight.icon className={cn("h-4 w-4 mt-0.5", insight.color)} />
                <div className='flex-1'>
                  <h4 className='font-medium text-sm'>{insight.title}</h4>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {insight.description}
                  </p>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='text-xs mt-2 p-0 h-auto'
                  >
                    {insight.action} →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spending Analysis */}
        <div className='pt-4 border-t'>
          <h3 className='text-sm font-medium text-muted-foreground mb-3'>
            Spending Analysis
          </h3>
          <div className='space-y-3'>
            <div className='flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800'>
              <div className='flex items-center gap-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: topSpendingCategory.color }}
                ></div>
                <span className='text-sm font-medium'>
                  {topSpendingCategory.name}
                </span>
              </div>
              <div className='text-right'>
                <p className='text-sm font-medium'>
                  ${topSpendingCategory.spent}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {(
                    (topSpendingCategory.spent / topSpendingCategory.budget) *
                    100
                  ).toFixed(1)}
                  % of budget
                </p>
              </div>
            </div>

            <div className='text-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20'>
              <DollarSign className='h-5 w-5 mx-auto mb-2 text-purple-600' />
              <p className='text-sm font-medium'>AI Recommendation</p>
              <p className='text-xs text-muted-foreground'>
                Consider reducing {topSpendingCategory.name.toLowerCase()}{" "}
                spending by 10% to stay on track
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
