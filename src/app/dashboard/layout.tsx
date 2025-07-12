import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | FinFit - Your Financial Command Center",
  description:
    "Take control of your finances with FinFit's comprehensive dashboard. Track spending, manage budgets, and achieve your financial goals.",
  keywords: [
    "dashboard",
    "personal finance",
    "budgeting",
    "spending tracker",
    "financial planning",
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 