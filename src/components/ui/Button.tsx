import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "default" | "icon";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    iconPosition = "left",
    className = "",
    disabled,
    ...props
  }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]";

    const variants = {
      primary: "bg-[#222222] text-white font-medium hover:bg-[#1a1a1a] focus:ring-[#A3A3A3]",
      secondary: "bg-[#F5F5F5] text-[#222222] font-medium hover:bg-[#EBEBEB] focus:ring-[#A3A3A3] border border-[#EBEBEB]",
      outline: "border border-[#D6D6D6] bg-transparent text-[#404040] font-medium hover:bg-[#FAFAFA] hover:border-[#A3A3A3] focus:ring-[#A3A3A3]",
      ghost: "bg-transparent text-[#404040] font-medium hover:bg-[#F5F5F5] focus:ring-[#A3A3A3]",
      destructive: "bg-red-600 text-white font-medium hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
      md: "px-4 py-2.5 text-sm rounded-lg gap-2",
      lg: "px-6 py-3 text-base rounded-lg gap-2",
      default: "px-4 py-2.5 text-sm rounded-lg gap-2", // Same as md
      icon: "p-2 rounded-lg", // Square button for icons
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon && iconPosition === "left" && icon}
        {children}
        {!loading && icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Export buttonVariants function for use in other components
export const buttonVariants = ({
  variant = "primary",
  size = "md"
}: {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg" | "default" | "icon";
} = {}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary: "bg-[#222222] text-white font-medium hover:bg-[#1a1a1a] focus:ring-[#A3A3A3]",
    secondary: "bg-[#F5F5F5] text-[#222222] font-medium hover:bg-[#EBEBEB] focus:ring-[#A3A3A3] border border-[#EBEBEB]",
    outline: "border border-[#D6D6D6] bg-transparent text-[#404040] font-medium hover:bg-[#FAFAFA] hover:border-[#A3A3A3] focus:ring-[#A3A3A3]",
    ghost: "bg-transparent text-[#404040] font-medium hover:bg-[#F5F5F5] focus:ring-[#A3A3A3]",
    destructive: "bg-red-600 text-white font-medium hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
    md: "px-4 py-2.5 text-sm rounded-lg gap-2",
    lg: "px-6 py-3 text-base rounded-lg gap-2",
    default: "px-4 py-2.5 text-sm rounded-lg gap-2",
    icon: "p-2 rounded-lg",
  };

  return `${baseStyles} ${variants[variant]} ${sizes[size]}`;
};

export { Button };
export type { ButtonProps };
