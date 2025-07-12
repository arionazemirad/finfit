"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, CreditCard, Target, PiggyBank } from "lucide-react";

const quickActions = [
  {
    title: "Add Expense",
    description: "Record a new expense",
    icon: Plus,
    color: "from-red-500 to-pink-500",
    action: "add-expense",
  },
  {
    title: "Connect Account",
    description: "Link a new bank account",
    icon: CreditCard,
    color: "from-blue-500 to-cyan-500",
    action: "connect-account",
  },
  {
    title: "Start Savings Goal",
    description: "Set a new savings target",
    icon: Target,
    color: "from-green-500 to-emerald-500",
    action: "create-goal",
  },
  {
    title: "View Budget",
    description: "Check your monthly budget",
    icon: PiggyBank,
    color: "from-purple-500 to-violet-500",
    action: "view-budget",
  },
];

export function QuickActions() {
  const handleAction = (action: string) => {
    // TODO: Implement actual actions
    console.log(`Action: ${action}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20 shadow-lg'>
        <CardHeader>
          <CardTitle className='text-lg font-outfit font-medium'>
            Quick Actions
          </CardTitle>
          <p className='text-sm text-muted-foreground'>
            Common tasks at your fingertips
          </p>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
              >
                <Button
                  variant='ghost'
                  className='w-full h-auto p-4 flex flex-col items-center justify-center space-y-2 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-all duration-200 group'
                  onClick={() => handleAction(action.action)}
                >
                  <div
                    className={`p-3 rounded-full bg-gradient-to-br ${action.color} text-white group-hover:scale-105 transition-transform duration-200`}
                  >
                    <action.icon className='h-5 w-5' />
                  </div>
                  <div className='text-center'>
                    <p className='text-sm font-medium'>{action.title}</p>
                    <p className='text-xs text-muted-foreground'>
                      {action.description}
                    </p>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
