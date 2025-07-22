import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/80",
        secondary: "border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80",
        destructive: "border-transparent bg-red-500 text-neutral-50 hover:bg-red-500/80",
        outline: "border-neutral-200 text-neutral-950 hover:bg-neutral-100",
      },
      size: {
        default: "px-3 py-1",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
      shape: {
        default: "rounded-md",
        square: "rounded-none",
        pill: "rounded-full",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, shape, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, shape }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
