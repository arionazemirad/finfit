"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { CategoriesBreakdown } from "@/components/dashboard/categories-breakdown";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { UpcomingBills } from "@/components/dashboard/upcoming-bills";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { AIAssistantCTA } from "@/components/dashboard/ai-assistant-cta";
import { useMockData } from "@/hooks/use-mock-data";

export default function DashboardPage() {
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
          {/* Top Section - Balance Card */}
          <section className='w-full'>
            <BalanceCard
              balanceData={balanceData}
              isLoading={isLoading}
              error={error}
            />
          </section>

          {/* Second Row - Charts */}
          <section className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            <SpendingChart
              spendingData={spendingChartData}
              isLoading={isLoading}
              error={error}
            />
            <CategoriesBreakdown
              categoriesData={categoriesData}
              isLoading={isLoading}
              error={error}
            />
          </section>

          {/* Third Row - Quick Actions */}
          <section className='w-full'>
            <QuickActions />
          </section>

          {/* Fourth Row - Upcoming Bills & Activity */}
          <section className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <UpcomingBills
              upcomingBillsData={upcomingBillsData}
              isLoading={isLoading}
              error={error}
            />
            <ActivityFeed
              activityData={activityData}
              isLoading={isLoading}
              error={error}
            />
          </section>

          {/* Fifth Row - AI Assistant CTA */}
          <section className='w-full'>
            <AIAssistantCTA />
          </section>

          {/* Footer spacing */}
          <div className='h-6' />
        </div>
      </main>
    </div>
  );
}
