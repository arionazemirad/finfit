"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Target,
  Trophy,
  Calendar,
  TrendingUp,
  DollarSign,
  Lightbulb,
  Share2,
} from "lucide-react";

export function GoalActions() {
  const actions = [
    {
      title: "Add New Goal",
      description: "Create a new financial goal",
      icon: Plus,
      color: "bg-purple-500 hover:bg-purple-600",
      badge: "Quick Add",
    },
    {
      title: "Set Milestones",
      description: "Break down goals into milestones",
      icon: Target,
      color: "bg-blue-500 hover:bg-blue-600",
      badge: "Recommended",
    },
    {
      title: "View Achievements",
      description: "See your completed goals",
      icon: Trophy,
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      title: "Savings Calculator",
      description: "Calculate savings timeline",
      icon: DollarSign,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Goal Templates",
      description: "Use pre-made goal templates",
      icon: Lightbulb,
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: "Progress Tracking",
      description: "Detailed progress analytics",
      icon: TrendingUp,
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      title: "Goal Reminders",
      description: "Set up goal notifications",
      icon: Calendar,
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      title: "Share Goals",
      description: "Share with family & friends",
      icon: Share2,
      color: "bg-teal-500 hover:bg-teal-600",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <span>Goal Actions</span>
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
