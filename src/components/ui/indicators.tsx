import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const indicatorVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-neutral-500",
        primary: "bg-blue-500",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        destructive: "bg-red-500",
      },
      size: {
        sm: "h-2 w-2",
        md: "h-3 w-3",
        lg: "h-4 w-4",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "circle",
    },
  }
);

export interface IndicatorsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof indicatorVariants> {
  pulse?: boolean;
}

const Indicators = React.forwardRef<HTMLDivElement, IndicatorsProps>(
  ({ className, variant, size, shape, pulse = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          indicatorVariants({ variant, size, shape }),
          pulse && "animate-pulse",
          className
        )}
        {...props}
      />
    );
  }
);
Indicators.displayName = "Indicators";

// Dot indicator for status
const StatusIndicator = React.forwardRef<
  HTMLDivElement,
  IndicatorsProps & { status?: "online" | "offline" | "away" | "busy" }
>(({ status = "offline", className, ...props }, ref) => {
  const statusVariant = {
    online: "success",
    offline: "default",
    away: "warning",
    busy: "destructive",
  }[status] as VariantProps<typeof indicatorVariants>["variant"];

  return (
    <Indicators
      ref={ref}
      variant={statusVariant}
      className={cn("relative", className)}
      {...props}
    />
  );
});
StatusIndicator.displayName = "StatusIndicator";

// Badge indicator with count
const BadgeIndicator = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    count?: number;
    max?: number;
    showZero?: boolean;
  }
>(({ className, count = 0, max = 99, showZero = false, ...props }, ref) => {
  const displayCount = count > max ? `${max}+` : count.toString();
  const shouldShow = count > 0 || showZero;

  if (!shouldShow) return null;

  return (
    <span
      ref={ref}
      className={cn(
        "absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white",
        count > 99 && "w-6",
        className
      )}
      {...props}
    >
      {displayCount}
    </span>
  );
});
BadgeIndicator.displayName = "BadgeIndicator";

export { Indicators, StatusIndicator, BadgeIndicator, indicatorVariants };
