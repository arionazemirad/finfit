export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  vendor: string;
  type: "income" | "expense";
}

export interface BudgetCategory {
  name: string;
  spent: number;
  budget: number;
  color: string;
}

export interface UpcomingBill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  icon: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  icon: string;
  color: string;
  status: "on-track" | "behind" | "ahead";
}

// Enhanced mock data with more variety and realistic transactions
export const mockTransactions: Transaction[] = [
  // Income transactions
  {
    id: "1",
    description: "Salary Deposit",
    amount: 4850.0,
    category: "Income",
    date: "2024-01-15",
    vendor: "TechCorp Inc.",
    type: "income",
  },
  {
    id: "2",
    description: "Freelance Project Payment",
    amount: 1200.0,
    category: "Income",
    date: "2024-01-14",
    vendor: "Design Studio LLC",
    type: "income",
  },
  {
    id: "3",
    description: "Investment Dividend",
    amount: 245.5,
    category: "Income",
    date: "2024-01-13",
    vendor: "Vanguard Investments",
    type: "income",
  },
  {
    id: "4",
    description: "Side Gig Payment",
    amount: 350.0,
    category: "Income",
    date: "2024-01-12",
    vendor: "Upwork",
    type: "income",
  },

  // Food & Dining
  {
    id: "5",
    description: "Grocery Shopping",
    amount: -127.45,
    category: "Food & Dining",
    date: "2024-01-15",
    vendor: "Whole Foods Market",
    type: "expense",
  },
  {
    id: "6",
    description: "Coffee & Breakfast",
    amount: -18.75,
    category: "Food & Dining",
    date: "2024-01-15",
    vendor: "Starbucks",
    type: "expense",
  },
  {
    id: "7",
    description: "Lunch Meeting",
    amount: -45.8,
    category: "Food & Dining",
    date: "2024-01-14",
    vendor: "Chipotle Mexican Grill",
    type: "expense",
  },
  {
    id: "8",
    description: "Dinner with Friends",
    amount: -89.5,
    category: "Food & Dining",
    date: "2024-01-13",
    vendor: "Olive Garden",
    type: "expense",
  },
  {
    id: "9",
    description: "Pizza Delivery",
    amount: -32.99,
    category: "Food & Dining",
    date: "2024-01-12",
    vendor: "Domino's Pizza",
    type: "expense",
  },

  // Transportation
  {
    id: "10",
    description: "Uber Ride",
    amount: -24.5,
    category: "Transportation",
    date: "2024-01-15",
    vendor: "Uber",
    type: "expense",
  },
  {
    id: "11",
    description: "Gas Station",
    amount: -52.75,
    category: "Transportation",
    date: "2024-01-14",
    vendor: "Shell",
    type: "expense",
  },
  {
    id: "12",
    description: "Parking Fee",
    amount: -12.0,
    category: "Transportation",
    date: "2024-01-13",
    vendor: "City Parking",
    type: "expense",
  },
  {
    id: "13",
    description: "Car Wash",
    amount: -18.99,
    category: "Transportation",
    date: "2024-01-12",
    vendor: "Quick Wash",
    type: "expense",
  },

  // Shopping
  {
    id: "14",
    description: "Amazon Purchase",
    amount: -67.89,
    category: "Shopping",
    date: "2024-01-15",
    vendor: "Amazon.com",
    type: "expense",
  },
  {
    id: "15",
    description: "Clothing Store",
    amount: -134.5,
    category: "Shopping",
    date: "2024-01-14",
    vendor: "H&M",
    type: "expense",
  },
  {
    id: "16",
    description: "Electronics Store",
    amount: -299.99,
    category: "Shopping",
    date: "2024-01-13",
    vendor: "Best Buy",
    type: "expense",
  },
  {
    id: "17",
    description: "Bookstore",
    amount: -24.99,
    category: "Shopping",
    date: "2024-01-12",
    vendor: "Barnes & Noble",
    type: "expense",
  },

  // Entertainment
  {
    id: "18",
    description: "Movie Tickets",
    amount: -32.0,
    category: "Entertainment",
    date: "2024-01-15",
    vendor: "AMC Theaters",
    type: "expense",
  },
  {
    id: "19",
    description: "Concert Tickets",
    amount: -89.5,
    category: "Entertainment",
    date: "2024-01-14",
    vendor: "Ticketmaster",
    type: "expense",
  },
  {
    id: "20",
    description: "Gaming Subscription",
    amount: -14.99,
    category: "Entertainment",
    date: "2024-01-13",
    vendor: "Xbox Game Pass",
    type: "expense",
  },

  // Subscriptions
  {
    id: "21",
    description: "Netflix Subscription",
    amount: -15.99,
    category: "Subscriptions",
    date: "2024-01-15",
    vendor: "Netflix",
    type: "expense",
  },
  {
    id: "22",
    description: "Spotify Premium",
    amount: -9.99,
    category: "Subscriptions",
    date: "2024-01-14",
    vendor: "Spotify",
    type: "expense",
  },
  {
    id: "23",
    description: "Adobe Creative Suite",
    amount: -52.99,
    category: "Subscriptions",
    date: "2024-01-13",
    vendor: "Adobe",
    type: "expense",
  },
  {
    id: "24",
    description: "Gym Membership",
    amount: -29.99,
    category: "Subscriptions",
    date: "2024-01-12",
    vendor: "Planet Fitness",
    type: "expense",
  },

  // Health & Fitness
  {
    id: "25",
    description: "Pharmacy",
    amount: -45.75,
    category: "Health & Fitness",
    date: "2024-01-15",
    vendor: "CVS Pharmacy",
    type: "expense",
  },
  {
    id: "26",
    description: "Doctor Visit",
    amount: -125.0,
    category: "Health & Fitness",
    date: "2024-01-14",
    vendor: "Medical Center",
    type: "expense",
  },
  {
    id: "27",
    description: "Vitamins & Supplements",
    amount: -34.99,
    category: "Health & Fitness",
    date: "2024-01-13",
    vendor: "GNC",
    type: "expense",
  },

  // Travel
  {
    id: "28",
    description: "Hotel Booking",
    amount: -245.0,
    category: "Travel",
    date: "2024-01-15",
    vendor: "Marriott Hotels",
    type: "expense",
  },
  {
    id: "29",
    description: "Airline Tickets",
    amount: -389.5,
    category: "Travel",
    date: "2024-01-14",
    vendor: "Delta Airlines",
    type: "expense",
  },
  {
    id: "30",
    description: "Rental Car",
    amount: -89.99,
    category: "Travel",
    date: "2024-01-13",
    vendor: "Hertz",
    type: "expense",
  },

  // Utilities & Bills
  {
    id: "31",
    description: "Electric Bill",
    amount: -89.45,
    category: "Utilities",
    date: "2024-01-15",
    vendor: "Power Company",
    type: "expense",
  },
  {
    id: "32",
    description: "Internet Bill",
    amount: -79.99,
    category: "Utilities",
    date: "2024-01-14",
    vendor: "Comcast",
    type: "expense",
  },
  {
    id: "33",
    description: "Phone Bill",
    amount: -65.0,
    category: "Utilities",
    date: "2024-01-13",
    vendor: "Verizon",
    type: "expense",
  },
];

export const mockBudgetCategories: BudgetCategory[] = [
  { name: "Food & Dining", spent: 312.49, budget: 500, color: "#FF6B6B" },
  { name: "Shopping", spent: 527.37, budget: 600, color: "#4ECDC4" },
  { name: "Transportation", spent: 108.24, budget: 200, color: "#45B7D1" },
  { name: "Subscriptions", spent: 108.96, budget: 150, color: "#96CEB4" },
  { name: "Entertainment", spent: 136.49, budget: 200, color: "#FFEAA7" },
  { name: "Health & Fitness", spent: 205.74, budget: 300, color: "#DDA0DD" },
  { name: "Travel", spent: 724.49, budget: 800, color: "#FF8A80" },
  { name: "Utilities", spent: 234.44, budget: 300, color: "#A8E6CF" },
];

export const mockUpcomingBills: UpcomingBill[] = [
  {
    id: "1",
    name: "Rent Payment",
    amount: 1850.0,
    dueDate: "2024-01-28",
    category: "Housing",
    icon: "🏠",
  },
  {
    id: "2",
    name: "Netflix",
    amount: 15.99,
    dueDate: "2024-01-20",
    category: "Subscriptions",
    icon: "🎬",
  },
  {
    id: "3",
    name: "Spotify Premium",
    amount: 9.99,
    dueDate: "2024-01-22",
    category: "Subscriptions",
    icon: "🎵",
  },
  {
    id: "4",
    name: "Phone Bill",
    amount: 65.0,
    dueDate: "2024-01-25",
    category: "Utilities",
    icon: "📱",
  },
  {
    id: "5",
    name: "Car Insurance",
    amount: 145.5,
    dueDate: "2024-01-30",
    category: "Insurance",
    icon: "🚗",
  },
  {
    id: "6",
    name: "Internet Bill",
    amount: 79.99,
    dueDate: "2024-01-26",
    category: "Utilities",
    icon: "🌐",
  },
];

export const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Chase Checking",
    type: "checking",
    balance: 3247.85,
  },
  {
    id: "2",
    name: "Savings Account",
    type: "savings",
    balance: 12450.75,
  },
  {
    id: "3",
    name: "Credit Card",
    type: "credit",
    balance: -1247.3,
  },
  {
    id: "4",
    name: "Investment Account",
    type: "investment",
    balance: 45680.25,
  },
];

export const mockSpendingData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Spending",
      data: [1250, 980, 1450, 890],
      borderColor: "#FF6B6B",
      backgroundColor: "rgba(255, 107, 107, 0.1)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "Income",
      data: [4850, 0, 1200, 595.5],
      borderColor: "#4ECDC4",
      backgroundColor: "rgba(78, 205, 196, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

export const getTotalBalance = (): number => {
  return mockAccounts.reduce((total, account) => total + account.balance, 0);
};

export const getAccountCount = (): number => {
  return mockAccounts.length;
};

export const mockGoals: FinancialGoal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 15000,
    currentAmount: 12450,
    deadline: "2024-06-30",
    category: "Savings",
    icon: "🛡️",
    color: "#4ECDC4",
    status: "on-track",
  },
  {
    id: "2",
    name: "Vacation Fund",
    targetAmount: 8000,
    currentAmount: 5200,
    deadline: "2024-08-15",
    category: "Travel",
    icon: "✈️",
    color: "#FF6B6B",
    status: "on-track",
  },
  {
    id: "3",
    name: "New Car",
    targetAmount: 35000,
    currentAmount: 18500,
    deadline: "2025-03-01",
    category: "Transportation",
    icon: "🚗",
    color: "#45B7D1",
    status: "behind",
  },
  {
    id: "4",
    name: "Home Down Payment",
    targetAmount: 75000,
    currentAmount: 45680,
    deadline: "2026-01-01",
    category: "Housing",
    icon: "🏠",
    color: "#96CEB4",
    status: "ahead",
  },
  {
    id: "5",
    name: "Wedding Fund",
    targetAmount: 25000,
    currentAmount: 8500,
    deadline: "2025-09-01",
    category: "Special Events",
    icon: "💒",
    color: "#FF8A80",
    status: "behind",
  },
];
