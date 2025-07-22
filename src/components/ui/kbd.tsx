import * as React from "react";
import { cn } from "@/lib/utils";

export interface KBDProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const KBD = React.forwardRef<HTMLElement, KBDProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <kbd
        className={cn(
          "inline-flex items-center justify-center font-mono text-xs font-medium tracking-wide",
          {
            // Variants
            "border border-neutral-200 bg-neutral-50 text-neutral-900": variant === "default",
            "border border-neutral-300 bg-white text-neutral-900": variant === "outline",
            // Sizes
            "h-5 min-w-[1.25rem] px-1": size === "sm",
            "h-6 min-w-[1.5rem] px-1.5": size === "md",
            "h-7 min-w-[1.75rem] px-2": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
KBD.displayName = "KBD";

export { KBD };
