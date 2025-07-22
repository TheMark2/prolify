import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ClipboardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onCopy?: (value: string) => void;
  timeout?: number;
  variant?: "default" | "inline";
}

const Clipboard = React.forwardRef<HTMLDivElement, ClipboardProps>(
  ({ className, value, onCopy, timeout = 2000, variant = "default", children, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy?.(value);
        
        setTimeout(() => {
          setCopied(false);
        }, timeout);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    if (variant === "inline") {
      return (
        <div ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props}>
          {children}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 w-6 p-0"
          >
            {copied ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2",
          className
        )}
        {...props}
      >
        <code className="text-sm font-mono text-neutral-900 truncate flex-1">
          {children || value}
        </code>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="ml-2 h-6 w-6 p-0 flex-shrink-0"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    );
  }
);
Clipboard.displayName = "Clipboard";

export { Clipboard };
