"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SpendingChartProps {
  spendingData: any;
  isLoading: boolean;
  error: string | null;
}

export function SpendingChart({
  spendingData,
  isLoading,
  error,
}: SpendingChartProps) {
  const [activeTab, setActiveTab] = useState<"spending" | "income">("spending");

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            family: "Outfit",
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
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
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Outfit",
            size: 11,
          },
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            family: "Outfit",
            size: 11,
          },
          callback: function (value: any) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        tension: 0.4,
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  const getFilteredData = () => {
    if (activeTab === "spending") {
      return {
        ...spendingData,
        datasets: [spendingData.datasets[0]],
      };
    } else {
      return {
        ...spendingData,
        datasets: [spendingData.datasets[1]],
      };
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20 shadow-lg'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <Skeleton className='h-6 w-32' />
            <div className='flex space-x-2'>
              <Skeleton className='h-8 w-20' />
              <Skeleton className='h-8 w-20' />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className='h-64 w-full' />
            <div className='mt-6 grid grid-cols-2 gap-4'>
              <div className='bg-white/10 dark:bg-gray-800/10 rounded-lg p-3'>
                <Skeleton className='h-4 w-20 mb-2' />
                <Skeleton className='h-6 w-16 mb-1' />
                <Skeleton className='h-3 w-24' />
              </div>
              <div className='bg-white/10 dark:bg-gray-800/10 rounded-lg p-3'>
                <Skeleton className='h-4 w-20 mb-2' />
                <Skeleton className='h-6 w-16 mb-1' />
                <Skeleton className='h-3 w-24' />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20 shadow-lg'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-lg font-outfit font-medium'>
            Financial Overview
          </CardTitle>
          <div className='flex space-x-2'>
            <Button
              variant={activeTab === "spending" ? "default" : "outline"}
              size='sm'
              onClick={() => setActiveTab("spending")}
              className='text-xs'
            >
              Spending
            </Button>
            <Button
              variant={activeTab === "income" ? "default" : "outline"}
              size='sm'
              onClick={() => setActiveTab("income")}
              className='text-xs'
            >
              Income
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className='h-64 w-full'>
            <Line data={getFilteredData()} options={chartOptions} />
          </div>

          {/* Summary stats */}
          <div className='mt-6 grid grid-cols-2 gap-4'>
            <div className='bg-white/10 dark:bg-gray-800/10 rounded-lg p-3'>
              <p className='text-sm text-muted-foreground'>This Month</p>
              <p className='text-xl font-bold text-foreground'>
                ${activeTab === "spending" ? "1,640" : "5,500"}
              </p>
              <p className='text-xs text-green-500'>+12.5% from last month</p>
            </div>
            <div className='bg-white/10 dark:bg-gray-800/10 rounded-lg p-3'>
              <p className='text-sm text-muted-foreground'>Average Daily</p>
              <p className='text-xl font-bold text-foreground'>
                ${activeTab === "spending" ? "53" : "177"}
              </p>
              <p className='text-xs text-blue-500'>On track with goal</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
