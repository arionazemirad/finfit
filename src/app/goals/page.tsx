"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import {
  GoalsOverview,
  ActiveGoals,
  GoalProgress,
  GoalInsights,
  GoalActions,
} from "@/components/goals";
import { useMockData } from "@/hooks/use-mock-data";

export default function GoalsPage() {
  const {
    balanceData,
    spendingChartData,
    categoriesData,
    upcomingBillsData,
    activityData,
    isLoading,
    error,
  } = useMockData();

  return (
    <div className='flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className='flex-1 overflow-auto'>
        <div className='p-6 space-y-6'>
          {/* Header */}
          <section className='w-full'>
            <div className='flex items-center justify-between'>
              <div>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                  Financial Goals
                </h1>
                <p className='text-gray-600 dark:text-gray-400 mt-1'>
                  Track your progress and achieve your financial dreams
                </p>
              </div>
            </div>
          </section>

          {/* Goals Overview */}
          <section className='w-full'>
            <GoalsOverview
              balanceData={balanceData}
              isLoading={isLoading}
              error={error}
            />
          </section>

          {/* Active Goals and Progress */}
          <section className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            <ActiveGoals
              categoriesData={categoriesData}
              isLoading={isLoading}
              error={error}
            />
            <GoalProgress
              spendingData={spendingChartData}
              isLoading={isLoading}
              error={error}
            />
          </section>

          {/* Goal Actions */}
          <section className='w-full'>
            <GoalActions />
          </section>

          {/* Goal Insights */}
          <section className='w-full'>
            <GoalInsights
              activityData={activityData}
              upcomingBillsData={upcomingBillsData}
              isLoading={isLoading}
              error={error}
            />
          </section>

          {/* Footer spacing */}
          <div className='h-6' />
        </div>
      </main>
    </div>
  );
}
