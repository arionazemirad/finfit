"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Calculator,
  TrendingUp,
  AlertTriangle,
  Target,
  DollarSign,
  Brain,
  Sparkles,
} from "lucide-react";

export function AIQuickActions() {
  const actions = [
    {
      title: "AI Budget Analysis",
      description: "Get personalized budget recommendations",
      icon: Brain,
      color: "bg-purple-500 hover:bg-purple-600",
      badge: "AI Powered",
    },
    {
      title: "Savings Calculator",
      description: "Calculate optimal savings strategy",
      icon: Calculator,
      color: "bg-blue-500 hover:bg-blue-600",
      badge: "Smart",
    },
    {
      title: "Spending Predictions",
      description: "AI-powered spending forecasts",
      icon: TrendingUp,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Anomaly Detection",
      description: "Detect unusual spending patterns",
      icon: AlertTriangle,
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: "Goal Optimization",
      description: "Optimize your financial goals",
      icon: Target,
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      title: "Investment Advice",
      description: "Get AI investment recommendations",
      icon: DollarSign,
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      title: "Debt Analysis",
      description: "Analyze and optimize debt",
      icon: TrendingUp,
      color: "bg-teal-500 hover:bg-teal-600",
    },
    {
      title: "Financial Health Score",
      description: "Get your financial health rating",
      icon: Sparkles,
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span className='flex items-center gap-2'>
            <Bot className='h-5 w-5 text-blue-600' />
            AI Financial Tools
          </span>
          <Badge variant='outline' className='text-xs'>
            {actions.length} Tools
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
