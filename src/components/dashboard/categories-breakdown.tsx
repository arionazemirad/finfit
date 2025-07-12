"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockBudgetCategories } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoriesBreakdownProps {
  categoriesData: Array<{
    name: string;
    spent: number;
    budget: number;
    color: string;
  }>;
  isLoading: boolean;
  error: string | null;
}

export function CategoriesBreakdown({
  categoriesData = [],
  isLoading = false,
  error = null,
}: CategoriesBreakdownProps) {
  const dataToUse =
    categoriesData.length > 0
      ? categoriesData
      : [
          { name: "Food", spent: 485, budget: 600, color: "#FF6B6B" },
          { name: "Shopping", spent: 320, budget: 500, color: "#4ECDC4" },
          { name: "Transportation", spent: 150, budget: 200, color: "#45B7D1" },
          { name: "Subscriptions", spent: 89, budget: 120, color: "#96CEB4" },
          { name: "Travel", spent: 0, budget: 300, color: "#FFEAA7" },
          { name: "Entertainment", spent: 125, budget: 200, color: "#DDA0DD" },
        ];

  const totalSpent = dataToUse.reduce((sum, cat) => sum + cat.spent, 0);

  const chartData = {
    labels: dataToUse.map((cat) => cat.name),
    datasets: [
      {
        data: dataToUse.map((cat) => cat.spent),
        backgroundColor: dataToUse.map((cat) => cat.color),
        borderColor: dataToUse.map((cat) => cat.color),
        borderWidth: 0,
        hoverBorderWidth: 2,
        hoverBorderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            const percentage = ((context.parsed / totalSpent) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20 shadow-lg'>
        <CardHeader>
          <CardTitle className='text-lg font-outfit font-medium'>
            Spending by Category
          </CardTitle>
          <p className='text-sm text-muted-foreground'>
            Total spent: ${totalSpent.toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Chart */}
            <div className='relative'>
              <div className='h-48 w-full'>
                <Doughnut data={chartData} options={chartOptions} />
              </div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center'>
                  <p className='text-2xl font-bold font-outfit'>
                    ${totalSpent.toLocaleString()}
                  </p>
                  <p className='text-xs text-muted-foreground'>Total Spent</p>
                </div>
              </div>
            </div>

            {/* Categories List */}
            <div className='space-y-3'>
              {dataToUse.map((category, index) => {
                const percentage = (category.spent / category.budget) * 100;
                const isOverBudget = percentage > 100;

                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    className='space-y-2'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <div
                          className='w-3 h-3 rounded-full'
                          style={{ backgroundColor: category.color }}
                        />
                        <span className='text-sm font-medium'>
                          {category.name}
                        </span>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm font-semibold'>
                          ${category.spent}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          of ${category.budget}
                        </p>
                      </div>
                    </div>
                    <Progress
                      value={Math.min(percentage, 100)}
                      className='h-2'
                      style={{
                        backgroundColor: isOverBudget ? "#fee2e2" : undefined,
                      }}
                    />
                    <div className='flex justify-between text-xs'>
                      <span
                        className={`font-medium ${
                          isOverBudget
                            ? "text-red-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {percentage.toFixed(1)}% used
                      </span>
                      <span className='text-muted-foreground'>
                        ${category.budget - category.spent} left
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
