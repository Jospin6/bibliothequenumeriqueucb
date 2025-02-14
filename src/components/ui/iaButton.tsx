import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-white font-semibold rounded-lg transition-all",
        variant === "primary"
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-700 hover:bg-gray-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
