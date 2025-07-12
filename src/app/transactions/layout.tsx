import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions | FinFit - Track Your Spending",
  description:
    "View and manage all your transactions in one place. Filter, search, and analyze your spending patterns with FinFit.",
  keywords: [
    "transactions",
    "spending tracker",
    "expenses",
    "income",
    "financial history",
    "budgeting",
  ],
};

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
