"use client";

import { useState, useMemo, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMockData } from "@/hooks/use-mock-data";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  Download,
  ArrowUpDown,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  X,
} from "lucide-react";

// Transaction filters and sorting
type SortOption = "date" | "amount" | "name";
type SortDirection = "asc" | "desc";
type FilterCategory = "all" | "income" | "expense" | string;

export default function TransactionsPage() {
  const { transactions, isLoading, error } = useMockData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  }>({
    start: "",
    end: "",
  });

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const cats = new Set<string>();
    transactions.forEach((t) => {
      if (t.category) {
        cats.add(t.category);
      }
    });
    return Array.from(cats).sort();
  }, [transactions]);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter((transaction) => {
      // Search filter
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "income" && transaction.amount > 0) ||
        (selectedCategory === "expense" && transaction.amount < 0) ||
        transaction.category === selectedCategory;

      // Date range filter
      const matchesDate =
        (!dateRange.start || transaction.date >= dateRange.start) &&
        (!dateRange.end || transaction.date <= dateRange.end);

      return matchesSearch && matchesCategory && matchesDate;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "amount":
          aValue = Math.abs(a.amount);
          bValue = Math.abs(b.amount);
          break;
        case "name":
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [
    transactions,
    searchTerm,
    selectedCategory,
    sortBy,
    sortDirection,
    dateRange,
  ]);

  // Calculate transaction stats
  const transactionStats = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = filteredTransactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const netFlow = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netFlow,
      transactionCount: filteredTransactions.length,
    };
  }, [filteredTransactions]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      "Food & Dining":
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Shopping": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Transportation":
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Entertainment":
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Income":
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
      "Subscriptions": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      "Health & Fitness": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      "Travel": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Utilities": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  // Get vendor avatar
  const getVendorAvatar = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setDateRange({ start: "", end: "" });
  };

  return (
    <div className='flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className='flex-1 overflow-auto'>
        <div className='p-6 space-y-6'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'
          >
            <div>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Transactions
              </h1>
              <p className='text-gray-600 dark:text-gray-300 mt-1'>
                Track and manage all your financial transactions
              </p>
            </div>

            <div className='flex items-center space-x-3'>
              <Button variant='outline' size='sm'>
                <Download className='w-4 h-4 mr-2' />
                Export
              </Button>
              <Button variant='outline' size='sm'>
                <Calendar className='w-4 h-4 mr-2' />
                Date Range
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
          >
            <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      Total Income
                    </p>
                    <p className='text-2xl font-bold text-green-600 dark:text-green-400'>
                      {formatCurrency(transactionStats.totalIncome)}
                    </p>
                  </div>
                  <div className='p-2 bg-green-100 dark:bg-green-900 rounded-full'>
                    <TrendingUp className='w-5 h-5 text-green-600 dark:text-green-400' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      Total Expenses
                    </p>
                    <p className='text-2xl font-bold text-red-600 dark:text-red-400'>
                      {formatCurrency(transactionStats.totalExpenses)}
                    </p>
                  </div>
                  <div className='p-2 bg-red-100 dark:bg-red-900 rounded-full'>
                    <TrendingDown className='w-5 h-5 text-red-600 dark:text-red-400' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      Net Flow
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        transactionStats.netFlow >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatCurrency(transactionStats.netFlow)}
                    </p>
                  </div>
                  <div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-full'>
                    <CreditCard className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      Total Transactions
                    </p>
                    <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                      {transactionStats.transactionCount}
                    </p>
                  </div>
                  <div className='p-2 bg-gray-100 dark:bg-gray-800 rounded-full'>
                    <ArrowUpDown className='w-5 h-5 text-gray-600 dark:text-gray-400' />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20'>
              <CardContent className='p-4'>
                <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
                  {/* Search */}
                  <div className='flex-1 relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                    <Input
                      placeholder='Search transactions...'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='pl-10'
                    />
                  </div>

                  {/* Category Filter */}
                  <div className='flex items-center space-x-2'>
                    <Filter className='w-4 h-4 text-gray-400' />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm'
                    >
                      <option value='all'>All Categories</option>
                      <option value='income'>Income</option>
                      <option value='expense'>Expenses</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div className='flex items-center space-x-2'>
                    <ArrowUpDown className='w-4 h-4 text-gray-400' />
                    <select
                      value={`${sortBy}-${sortDirection}`}
                      onChange={(e) => {
                        const [sort, direction] = e.target.value.split("-");
                        setSortBy(sort as SortOption);
                        setSortDirection(direction as SortDirection);
                      }}
                      className='px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm'
                    >
                      <option value='date-desc'>Date (Newest)</option>
                      <option value='date-asc'>Date (Oldest)</option>
                      <option value='amount-desc'>Amount (Highest)</option>
                      <option value='amount-asc'>Amount (Lowest)</option>
                      <option value='name-asc'>Name (A-Z)</option>
                      <option value='name-desc'>Name (Z-A)</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {(searchTerm ||
                    selectedCategory !== "all" ||
                    dateRange.start ||
                    dateRange.end) && (
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={clearFilters}
                      className='shrink-0'
                    >
                      <X className='w-4 h-4 mr-2' />
                      Clear
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transactions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className='backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-800/5 border-white/20 dark:border-gray-700/20'>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  <span>Recent Transactions</span>
                  <Badge variant='secondary'>
                    {filteredTransactions.length} transactions
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                {isLoading ? (
                  <div className='p-8 text-center'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto'></div>
                    <p className='mt-4 text-gray-600 dark:text-gray-300'>
                      Loading transactions...
                    </p>
                  </div>
                ) : error ? (
                  <div className='p-8 text-center'>
                    <p className='text-red-600 dark:text-red-400'>
                      Error: {error}
                    </p>
                  </div>
                ) : filteredTransactions.length === 0 ? (
                  <div className='p-8 text-center'>
                    <p className='text-gray-600 dark:text-gray-300'>
                      No transactions found
                    </p>
                  </div>
                ) : (
                  <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                    {filteredTransactions.map((transaction, index) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        className='flex items-center justify-between p-4 hover:bg-white/5 dark:hover:bg-gray-800/5 transition-colors cursor-pointer'
                      >
                        <div className='flex items-center space-x-4'>
                          <Avatar className='h-10 w-10'>
                            <AvatarImage
                              src={`https://avatar.vercel.sh/${transaction.vendor}`}
                            />
                            <AvatarFallback className='text-sm'>
                              {getVendorAvatar(transaction.vendor)}
                            </AvatarFallback>
                          </Avatar>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center space-x-2'>
                              <p className='font-medium text-sm truncate'>
                                {transaction.description}
                              </p>
                              {transaction.category && (
                                <Badge
                                  variant='secondary'
                                  className={`text-xs px-2 py-1 ${getCategoryColor(transaction.category)}`}
                                >
                                  {transaction.category}
                                </Badge>
                              )}
                            </div>
                            <div className='flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400'>
                              <span>{formatDate(transaction.date)}</span>
                              <span>•</span>
                              <span>{transaction.vendor}</span>
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center space-x-2'>
                          <div className='text-right'>
                            <div className='flex items-center space-x-1'>
                              {transaction.amount > 0 ? (
                                <ArrowUpRight className='h-4 w-4 text-green-500' />
                              ) : (
                                <ArrowDownLeft className='h-4 w-4 text-red-500' />
                              )}
                              <span
                                className={`font-semibold ${
                                  transaction.amount > 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {transaction.amount > 0 ? "+" : "-"}
                                {formatCurrency(Math.abs(transaction.amount))}
                              </span>
                            </div>
                          </div>
                          <ChevronDown className='h-4 w-4 text-gray-400' />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer spacing */}
          <div className='h-6' />
        </div>
      </main>
    </div>
  );
}
