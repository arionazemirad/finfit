"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bot, Sparkles, MessageCircle, TrendingUp, Shield } from "lucide-react";

export function AIAssistantCTA() {
  const features = [
    {
      icon: TrendingUp,
      title: "Smart Insights",
      description: "Get personalized spending analysis",
    },
    {
      icon: Shield,
      title: "Budget Alerts",
      description: "AI-powered budget recommendations",
    },
    {
      icon: MessageCircle,
      title: "Chat Support",
      description: "Ask questions about your finances",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      <Card className='relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200/20 dark:border-purple-700/20 shadow-lg'>
        {/* Animated background elements */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5'>
          <div className='absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse' />
          <div className='absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-lg animate-pulse delay-1000' />
        </div>

        <CardHeader className='relative'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <div className='p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white'>
                <Bot className='h-5 w-5' />
              </div>
              <div>
                <CardTitle className='text-lg font-outfit font-medium'>
                  Meet FinBot 🧠
                </CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Your AI-powered financial assistant
                </p>
              </div>
            </div>
            <Badge
              variant='secondary'
              className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300 border-purple-200/20 dark:border-purple-700/20'
            >
              <Sparkles className='h-3 w-3 mr-1' />
              Coming Soon
            </Badge>
          </div>
        </CardHeader>

        <CardContent className='relative space-y-4'>
          <p className='text-sm text-muted-foreground leading-relaxed'>
            Ask FinBot anything about your finances! From spending patterns to
            savings goals, get personalized insights powered by AI.
          </p>

          {/* Features preview */}
          <div className='grid grid-cols-1 gap-3'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                className='flex items-center space-x-3 p-3 rounded-lg bg-white/10 dark:bg-gray-800/10'
              >
                <div className='p-2 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20'>
                  <feature.icon className='h-4 w-4 text-purple-600 dark:text-purple-400' />
                </div>
                <div>
                  <p className='font-medium text-sm'>{feature.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-2 pt-2'>
            <Button
              className='flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg'
              disabled
            >
              <Bot className='h-4 w-4 mr-2' />
              Get Early Access
            </Button>
            <Button
              variant='outline'
              className='flex-1 border-purple-200/20 dark:border-purple-700/20 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
            >
              Learn More
            </Button>
          </div>

          {/* Beta signup hint */}
          <div className='text-center pt-2'>
            <p className='text-xs text-muted-foreground'>
              🚀 Join the waitlist to be the first to try FinBot
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
