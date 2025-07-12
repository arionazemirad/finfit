"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  hoverable?: boolean;
}

export function ClayCard({
  children,
  className,
  onClick,
  selected = false,
  hoverable = false,
}: ClayCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-3xl p-6 cursor-pointer transition-all duration-300",
        // Light theme claymorphism
        "bg-white shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]",
        // Dark theme claymorphism
        "dark:bg-zinc-900 dark:shadow-[8px_8px_16px_#0a0a0a,-8px_-8px_16px_#1a1a1a]",
        // Selected state
        selected &&
          "ring-2 ring-indigo-500 shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)]",
        // Hover effects
        hoverable &&
          "hover:shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff] dark:hover:shadow-[12px_12px_24px_#0a0a0a,-12px_-12px_24px_#1a1a1a]",
        className
      )}
      onClick={onClick}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.div>
  );
}
