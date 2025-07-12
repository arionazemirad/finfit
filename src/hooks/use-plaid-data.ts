"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchPlaidAccounts,
  fetchPlaidTransactions,
  transformPlaidAccountsToBalance,
  transformPlaidTransactionsToActivity,
  transformPlaidTransactionsToSpendingData,
  transformPlaidTransactionsToCategories,
  transformPlaidTransactionsToUpcomingBills,
} from "@/lib/plaid-data";
import { PlaidAccount, PlaidTransaction } from "@/lib/plaid-types";

export interface UsePlaidDataReturn {
  // Raw data
  accounts: PlaidAccount[];
  transactions: PlaidTransaction[];

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

export function usePlaidData(): UsePlaidDataReturn {
  const [accounts, setAccounts] = useState<PlaidAccount[]>([]);
  const [transactions, setTransactions] = useState<PlaidTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch accounts and transactions in parallel
      const [accountsResponse, transactionsResponse] = await Promise.all([
        fetchPlaidAccounts(),
        fetchPlaidTransactions(),
      ]);

      setAccounts(accountsResponse);
      setTransactions(transactionsResponse);
    } catch (err) {
      console.error("Error fetching Plaid data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Transform data
  const balanceData = transformPlaidAccountsToBalance(accounts);
  const activityData = transformPlaidTransactionsToActivity(transactions);
  const spendingChartData =
    transformPlaidTransactionsToSpendingData(transactions);
  const categoriesData = transformPlaidTransactionsToCategories(transactions);
  const upcomingBillsData =
    transformPlaidTransactionsToUpcomingBills(transactions);

  return {
    // Raw data
    accounts,
    transactions,

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
