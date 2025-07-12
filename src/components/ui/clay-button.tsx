"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClayButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ClayButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  className,
}: ClayButtonProps) {
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg",
    secondary: cn(
      "bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100",
      "shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]",
      "dark:shadow-[4px_4px_8px_#0a0a0a,-4px_-4px_8px_#1a1a1a]",
      "hover:shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]",
      "dark:hover:shadow-[6px_6px_12px_#0a0a0a,-6px_-6px_12px_#1a1a1a]"
    ),
    ghost:
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(
        "font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
