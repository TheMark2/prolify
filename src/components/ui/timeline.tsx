import * as React from "react";
import { cn } from "@/lib/utils";

const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol ref={ref} className={cn("relative border-l border-neutral-200", className)} {...props} />
));
Timeline.displayName = "Timeline";

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement> & {
    icon?: React.ReactNode;
    iconClassName?: string;
  }
>(({ className, icon, iconClassName, children, ...props }, ref) => (
  <li ref={ref} className={cn("mb-10 ml-6", className)} {...props}>
    <span className={cn(
      "absolute flex items-center justify-center w-6 h-6 bg-neutral-100 rounded-full -left-3 ring-8 ring-white",
      iconClassName
    )}>
      {icon}
    </span>
    {children}
  </li>
));
TimelineItem.displayName = "TimelineItem";

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
TimelineContent.displayName = "TimelineContent";

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center mb-1", className)} {...props} />
));
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold text-neutral-900", className)} {...props} />
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("mb-4 text-base font-normal text-neutral-500", className)} {...props} />
));
TimelineDescription.displayName = "TimelineDescription";

const TimelineTime = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time ref={ref} className={cn("mb-1 text-sm font-normal leading-none text-neutral-400", className)} {...props} />
));
TimelineTime.displayName = "TimelineTime";

export {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineHeader,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
};
