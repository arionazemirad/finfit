"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Calendar,
  DollarSign,
  ShoppingBag,
  Coffee,
  Car,
} from "lucide-react";
import { mockTransactions, mockUpcomingBills } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface BudgetInsightsProps {
  activityData?: any;
  upcomingBillsData?: any;
  isLoading?: boolean;
  error?: string | null;
}

export function BudgetInsights({
  activityData,
  upcomingBillsData,
  isLoading,
  error,
}: BudgetInsightsProps) {
  const transactions = mockTransactions.slice(0, 5);
  const upcomingBills = mockUpcomingBills.slice(0, 3);

  const insights = [
    {
      type: "warning",
      title: "High Food Spending",
      description: "You've spent 80% of your food budget this month",
      icon: Coffee,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      type: "tip",
      title: "Savings Opportunity",
      description: "Consider reducing subscription costs by $25/month",
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      type: "positive",
      title: "Good Progress",
      description: "You're 15% under budget on transportation",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return Coffee;
      case "shopping":
        return ShoppingBag;
      case "transportation":
        return Car;
      default:
        return DollarSign;
    }
  };

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
            <AlertTriangle className='h-8 w-8 mx-auto mb-2' />
            <p>Failed to load insights</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Budget Insights */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Lightbulb className='h-5 w-5 text-yellow-600' />
            Budget Insights
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

      {/* Recent Activity & Upcoming Bills */}
      <div className='space-y-6'>
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center justify-between'>
              <span>Recent Transactions</span>
              <Button variant='ghost' size='sm' className='text-xs'>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {transactions.map((transaction) => {
              const CategoryIcon = getCategoryIcon(transaction.category);
              return (
                <div
                  key={transaction.id}
                  className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                >
                  <div className='flex items-center gap-3'>
                    <div className='p-2 rounded-full bg-gray-100 dark:bg-gray-800'>
                      <CategoryIcon className='h-4 w-4 text-gray-600' />
                    </div>
                    <div>
                      <p className='font-medium text-sm'>
                        {transaction.description}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {transaction.vendor}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p
                      className={cn(
                        "font-medium text-sm",
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      )}
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {transaction.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Upcoming Bills */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Calendar className='h-5 w-5 text-blue-600' />
              Upcoming Bills
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            {upcomingBills.map((bill) => (
              <div
                key={bill.id}
                className='flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
              >
                <div className='flex items-center gap-3'>
                  <div className='text-2xl'>{bill.icon}</div>
                  <div>
                    <p className='font-medium text-sm'>{bill.name}</p>
                    <p className='text-xs text-muted-foreground'>
                      Due {bill.dueDate}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium text-sm text-red-600'>
                    ${bill.amount.toFixed(2)}
                  </p>
                  <Badge variant='outline' className='text-xs'>
                    {bill.category}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
