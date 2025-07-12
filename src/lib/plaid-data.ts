import { PlaidAccount, PlaidTransaction } from "./plaid-types";

// API Functions to fetch data from Plaid
export async function fetchPlaidAccounts(): Promise<PlaidAccount[]> {
  try {
    const response = await fetch("/api/plaid/accounts");
    if (!response.ok) {
      throw new Error("Failed to fetch accounts");
    }
    const data = await response.json();
    return data.accounts || [];
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
}

export async function fetchPlaidTransactions(): Promise<PlaidTransaction[]> {
  try {
    const response = await fetch("/api/plaid/transactions");
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const data = await response.json();
    return data.transactions || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

// Data transformation functions
export function transformPlaidAccountsToBalance(accounts: PlaidAccount[]): {
  totalBalance: number;
  accountCount: number;
  income: number;
  expenses: number;
  savings: number;
} {
  const totalBalance = accounts.reduce((sum, account) => {
    return sum + (account.balances.current || 0);
  }, 0);

  const accountCount = accounts.length;

  // Calculate rough estimates based on account types
  const checkingAccounts = accounts.filter((acc) => acc.subtype === "checking");
  const savingsAccounts = accounts.filter((acc) => acc.subtype === "savings");
  const creditAccounts = accounts.filter((acc) => acc.type === "credit");

  const savings = savingsAccounts.reduce(
    (sum, acc) => sum + (acc.balances.current || 0),
    0
  );
  const expenses = Math.abs(
    creditAccounts.reduce((sum, acc) => sum + (acc.balances.current || 0), 0)
  );
  const income =
    checkingAccounts.reduce(
      (sum, acc) => sum + (acc.balances.current || 0),
      0
    ) + savings;

  return {
    totalBalance,
    accountCount,
    income,
    expenses,
    savings,
  };
}

export function transformPlaidTransactionsToActivity(
  transactions: PlaidTransaction[]
) {
  return transactions.map((transaction) => ({
    id: transaction.transaction_id,
    description: transaction.name,
    amount: transaction.amount,
    category: transaction.category?.[0] || "Other",
    date: transaction.date,
    vendor: transaction.name,
    type: transaction.amount < 0 ? ("income" as const) : ("expense" as const),
  }));
}

export function transformPlaidTransactionsToSpendingData(
  transactions: PlaidTransaction[]
) {
  // Group transactions by week
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const now = new Date();
  const weeklySpending = weeks.map(() => 0);
  const weeklyIncome = weeks.map(() => 0);

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    const daysDiff = Math.floor(
      (now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weekIndex = Math.floor(daysDiff / 7);

    if (weekIndex < 4) {
      if (transaction.amount > 0) {
        weeklySpending[3 - weekIndex] += transaction.amount;
      } else {
        weeklyIncome[3 - weekIndex] += Math.abs(transaction.amount);
      }
    }
  });

  return {
    labels: weeks,
    datasets: [
      {
        label: "Spending",
        data: weeklySpending,
        borderColor: "#FF6B6B",
        backgroundColor: "rgba(255, 107, 107, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Income",
        data: weeklyIncome,
        borderColor: "#4ECDC4",
        backgroundColor: "rgba(78, 205, 196, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
}

export function transformPlaidTransactionsToCategories(
  transactions: PlaidTransaction[]
) {
  const categoryMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      // Only expenses
      const category = mapPlaidCategoryToDisplayCategory(
        transaction.category?.[0] || "Other"
      );
      categoryMap.set(
        category,
        (categoryMap.get(category) || 0) + transaction.amount
      );
    }
  });

  const categories = Array.from(categoryMap.entries()).map(([name, spent]) => ({
    name,
    spent: Math.round(spent),
    budget: Math.round(spent * 1.2), // 20% buffer for demo
    color: getCategoryColor(name),
  }));

  return categories;
}

export function transformPlaidTransactionsToUpcomingBills(
  transactions: PlaidTransaction[]
) {
  // Filter for recurring transactions that might be bills
  const recurringTransactions = transactions.filter((t) =>
    t.category?.some(
      (cat) =>
        cat.toLowerCase().includes("subscription") ||
        cat.toLowerCase().includes("utilities") ||
        cat.toLowerCase().includes("rent") ||
        cat.toLowerCase().includes("insurance")
    )
  );

  return recurringTransactions.slice(0, 4).map((transaction, index) => ({
    id: transaction.transaction_id,
    name: transaction.name,
    amount: transaction.amount,
    dueDate: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    category: transaction.category?.[0] || "Other",
    icon: getBillIcon(transaction.category?.[0] || "Other"),
  }));
}

// Helper functions
function mapPlaidCategoryToDisplayCategory(plaidCategory: string): string {
  const categoryMap: { [key: string]: string } = {
    "Food and Drink": "Food",
    Shops: "Shopping",
    Transportation: "Transportation",
    Entertainment: "Entertainment",
    Travel: "Travel",
    Service: "Subscriptions",
    Healthcare: "Healthcare",
    Bills: "Bills",
    Transfer: "Transfer",
    Deposit: "Income",
  };

  for (const [plaidCat, displayCat] of Object.entries(categoryMap)) {
    if (plaidCategory.includes(plaidCat)) {
      return displayCat;
    }
  }

  return "Other";
}

function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    Food: "#FF6B6B",
    Shopping: "#4ECDC4",
    Transportation: "#45B7D1",
    Subscriptions: "#96CEB4",
    Travel: "#FFEAA7",
    Entertainment: "#DDA0DD",
    Healthcare: "#FFB6C1",
    Bills: "#FFA07A",
    Other: "#D3D3D3",
  };
  return colors[category] || colors["Other"];
}

function getBillIcon(category: string): string {
  const icons: { [key: string]: string } = {
    Entertainment: "🎬",
    Service: "🎵",
    Bills: "🏠",
    Transportation: "🚗",
    Healthcare: "🏥",
    Other: "📱",
  };
  return icons[category] || icons["Other"];
}
