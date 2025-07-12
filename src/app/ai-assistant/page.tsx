"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import {
  AIAssistantChat,
  AIInsights,
  AIQuickActions,
  AISuggestions,
} from "@/components/ai-assistant";
import { usePlaidData } from "@/hooks/use-plaid-data";

export default function AIAssistantPage() {
  const {
    balanceData,
    spendingChartData,
    categoriesData,
    upcomingBillsData,
    activityData,
    isLoading,
    error,
  } = usePlaidData();

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
                  AI Financial Assistant
                </h1>
                <p className='text-gray-600 dark:text-gray-400 mt-1'>
                  Get personalized financial advice and insights
                </p>
              </div>
            </div>
          </section>

          {/* AI Chat and Insights */}
          <section className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            <AIAssistantChat
              balanceData={balanceData}
              isLoading={isLoading}
              error={error}
            />
            <AIInsights
              categoriesData={categoriesData}
              spendingData={spendingChartData}
              isLoading={isLoading}
              error={error}
            />
          </section>

          {/* AI Quick Actions */}
          <section className='w-full'>
            <AIQuickActions />
          </section>

          {/* AI Suggestions */}
          <section className='w-full'>
            <AISuggestions
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
