"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type InputSize = "sm" | "md" | "lg";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
}

export function Input({ className, size = "md", type, ...props }: InputProps) {
  const sizeClasses: Record<InputSize, string> = {
    sm: "h-9 px-3 py-1 text-sm",
    md: "h-10 px-4 py-2 text-base",
    lg: "h-11 px-5 py-3 text-lg",
  };

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus:outline-none focus:ring-0 focus:border-gray-400",
        "rounded-none shadow-none",
        "aria-invalid:border-red-500",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
