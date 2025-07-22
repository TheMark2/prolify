import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, variant = "default", size = "md", orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          {
            // Orientation
            "flex-row": orientation === "horizontal",
            "flex-col": orientation === "vertical",
            // Horizontal spacing
            "[&>*:not(:first-child)]:border-l-0 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none": orientation === "horizontal",
            // Vertical spacing
            "[&>*:not(:first-child)]:border-t-0 [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none": orientation === "vertical",
          },
          className
        )}
        {...props}
      />
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
