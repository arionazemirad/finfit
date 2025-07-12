"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  AlertTriangle,
  BarChart3,
  Download,
  Settings,
  Target,
  TrendingUp,
  Calendar,
} from "lucide-react";

export function BudgetActions() {
  const actions = [
    {
      title: "Add Budget Category",
      description: "Create a new spending category",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600",
      badge: "Quick Add",
    },
    {
      title: "Set Budget Alerts",
      description: "Get notified when approaching limits",
      icon: AlertTriangle,
      color: "bg-orange-500 hover:bg-orange-600",
      badge: "Recommended",
    },
    {
      title: "View Reports",
      description: "Detailed spending analysis",
      icon: BarChart3,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Export Data",
      description: "Download budget reports",
      icon: Download,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Budget Goals",
      description: "Set and track financial goals",
      icon: Target,
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      title: "Spending Trends",
      description: "Analyze spending patterns",
      icon: TrendingUp,
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      title: "Monthly Planning",
      description: "Plan next month's budget",
      icon: Calendar,
      color: "bg-teal-500 hover:bg-teal-600",
    },
    {
      title: "Budget Settings",
      description: "Customize budget preferences",
      icon: Settings,
      color: "bg-gray-500 hover:bg-gray-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Budget Actions</span>
          <Badge variant='outline' className='text-xs'>
            {actions.length} Actions
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {actions.map((action) => (
            <Button
              key={action.title}
              variant='outline'
              className={`h-auto p-4 flex flex-col items-start space-y-2 text-left ${action.color} text-white border-0 hover:scale-105 transition-all duration-200`}
            >
              <div className='flex items-center justify-between w-full'>
                <action.icon className='h-5 w-5' />
                {action.badge && (
                  <Badge
                    variant='secondary'
                    className='text-xs bg-white/20 text-white'
                  >
                    {action.badge}
                  </Badge>
                )}
              </div>
              <div className='space-y-1'>
                <h3 className='font-semibold text-sm'>{action.title}</h3>
                <p className='text-xs opacity-90'>{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
