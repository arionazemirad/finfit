"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockBudgetCategories } from "@/lib/mock-data";

interface BudgetCategoriesProps {
  categoriesData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function BudgetCategories({
  categoriesData,
  isLoading,
  error,
}: BudgetCategoriesProps) {
  const categories = mockBudgetCategories;

  const getCategoryStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90)
      return {
        status: "critical",
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: AlertTriangle,
      };
    if (percentage >= 75)
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
            <p>Failed to load budget categories</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Budget Categories</span>
          <Badge variant='outline' className='text-xs'>
            {categories.length} Categories
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {categories.map((category) => {
          const percentage = (category.spent / category.budget) * 100;
          const status = getCategoryStatus(category.spent, category.budget);
          const remaining = category.budget - category.spent;

          return (
            <div key={category.name} className='space-y-2'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div
                    className='w-3 h-3 rounded-full'
                    style={{ backgroundColor: category.color }}
                  />
                  <span className='font-medium text-sm'>{category.name}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-muted-foreground'>
                    ${category.spent.toLocaleString()} / $
                    {category.budget.toLocaleString()}
                  </span>
                  <Badge
                    variant='secondary'
                    className={cn("text-xs", status.color, status.bgColor)}
                  >
                    <status.icon className='h-3 w-3' />
                  </Badge>
                </div>
              </div>

              <Progress
                value={percentage}
                className='h-2'
                style={
                  {
                    "--progress-color": category.color,
                  } as React.CSSProperties
                }
              />

              <div className='flex justify-between text-xs text-muted-foreground'>
                <span>{percentage.toFixed(1)}% used</span>
                <span>${remaining.toLocaleString()} remaining</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
