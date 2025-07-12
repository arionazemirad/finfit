"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  CreditCard,
  PiggyBank,
  Target,
  Bot,
  Plus,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

interface DashboardSidebarProps {
  className?: string;
}

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  {
    name: "Transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  { name: "Budgets", href: "/budgets", icon: PiggyBank },
  { name: "Goals", href: "/goals", icon: Target },
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: Bot,
  },
];

const quickActions = [
  { name: "Add Account", href: "/add-account", icon: Plus },
];

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex h-screen flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className='flex h-14 items-center border-b px-4'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='md:hidden'
        >
          {isCollapsed ? (
            <Menu className='h-4 w-4' />
          ) : (
            <X className='h-4 w-4' />
          )}
        </Button>
        {!isCollapsed && (
          <div className='ml-2 flex items-center space-x-2'>
            <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold'>
              F
            </div>
            <span className='font-outfit font-semibold text-lg'>FinFit</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-2 p-4'>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                size='sm'
                className={cn(
                  "w-full justify-start transition-all duration-200",
                  isCollapsed ? "px-2" : "px-3",
                  isActive && "bg-primary text-primary-foreground shadow-sm"
                )}
              >
                <item.icon className='h-4 w-4' />
                {!isCollapsed && (
                  <>
                    <span className='ml-2'>{item.name}</span>
                    {item.badge && (
                      <span className='ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full'>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Button>
            </Link>
          );
        })}

        <Separator className='my-4' />

        {/* Quick Actions */}
        <div className='space-y-2'>
          {!isCollapsed && (
            <p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
              Quick Actions
            </p>
          )}
          {quickActions.map((action) => (
            <Button
              key={action.name}
              variant='ghost'
              size='sm'
              className={cn(
                "w-full justify-start transition-all duration-200",
                isCollapsed ? "px-2" : "px-3"
              )}
            >
              <action.icon className='h-4 w-4' />
              {!isCollapsed && <span className='ml-2'>{action.name}</span>}
            </Button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className='border-t p-4 space-y-2'>
        <Button
          variant='ghost'
          size='sm'
          onClick={toggleTheme}
          className={cn(
            "w-full justify-start transition-all duration-200",
            isCollapsed ? "px-2" : "px-3"
          )}
        >
          {theme === "dark" ? (
            <Sun className='h-4 w-4' />
          ) : (
            <Moon className='h-4 w-4' />
          )}
          {!isCollapsed && (
            <span className='ml-2'>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </Button>

        <Button
          variant='ghost'
          size='sm'
          className={cn(
            "w-full justify-start transition-all duration-200",
            isCollapsed ? "px-2" : "px-3"
          )}
        >
          <Settings className='h-4 w-4' />
          {!isCollapsed && <span className='ml-2'>Settings</span>}
        </Button>

        <SignOutButton>
          <Button
            variant='ghost'
            size='sm'
            className={cn(
              "w-full justify-start transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50",
              isCollapsed ? "px-2" : "px-3"
            )}
          >
            <LogOut className='h-4 w-4' />
            {!isCollapsed && <span className='ml-2'>Sign Out</span>}
          </Button>
        </SignOutButton>

        {!isCollapsed && user && (
          <div className='pt-2 flex items-center space-x-2 text-sm text-muted-foreground'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium'>
              {user.firstName?.charAt(0) || "U"}
            </div>
            <div className='truncate'>
              <p className='font-medium text-foreground truncate'>
                {user.firstName} {user.lastName}
              </p>
              <p className='text-xs truncate'>
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
