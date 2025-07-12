"use client";

import { useState, useEffect, useCallback } from "react";
import {
  mockTransactions,
  mockBudgetCategories,
  mockUpcomingBills,
  mockAccounts,
  mockSpendingData,
  getTotalBalance,
  getAccountCount,
} from "@/lib/mock-data";

export interface UseMockDataReturn {
  // Raw data
  accounts: any[];
  transactions: any[];

  // Transformed data
  balanceData: {
    totalBalance: number;
    accountCount: number;
    income: number;
    expenses: number;
    savings: number;
  };
  activityData: Array<{
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    vendor: string;
    type: "income" | "expense";
  }>;
  spendingChartData: any;
  categoriesData: Array<{
    name: string;
    spent: number;
    budget: number;
    color: string;
  }>;
  upcomingBillsData: Array<{
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    category: string;
    icon: string;
  }>;

  // State
  isLoading: boolean;
  error: string | null;

  // Actions
  refetch: () => Promise<void>;
}

export function useMockData(): UseMockDataReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // No actual API calls needed for mock data
    } catch (err) {
      console.error("Error loading mock data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate income and expenses from transactions
  const income = mockTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = Math.abs(
    mockTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)
  );

  // Transform data to match the expected interface
  const balanceData = {
    totalBalance: getTotalBalance(),
    accountCount: getAccountCount(),
    income,
    expenses,
    savings: mockAccounts.find((a) => a.type === "savings")?.balance || 0,
  };

  const activityData = mockTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10); // Show last 10 transactions

  const spendingChartData = mockSpendingData;

  const categoriesData = mockBudgetCategories;

  const upcomingBillsData = mockUpcomingBills;

  return {
    // Raw data
    accounts: mockAccounts,
    transactions: mockTransactions,

    // Transformed data
    balanceData,
    activityData,
    spendingChartData,
    categoriesData,
    upcomingBillsData,

    // State
    isLoading,
    error,

    // Actions
    refetch: fetchData,
  };
}
