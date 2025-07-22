import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, value = "", onChange, length = 6, disabled = false, autoFocus = false, ...props }, ref) => {
    const [otp, setOtp] = React.useState<string[]>(Array(length).fill(""));
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    React.useEffect(() => {
      if (value) {
        const otpArray = value.split("").slice(0, length);
        const paddedOtp = [...otpArray, ...Array(length - otpArray.length).fill("")];
        setOtp(paddedOtp);
      }
    }, [value, length]);

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    const handleChange = (index: number, digit: string) => {
      if (disabled) return;

      const newOtp = [...otp];
      newOtp[index] = digit.slice(-1); // Only take the last character
      setOtp(newOtp);
      onChange?.(newOtp.join(""));

      // Auto-focus next input
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      
      if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      if (disabled) return;

      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").slice(0, length);
      const otpArray = pastedData.split("");
      const newOtp = [...otpArray, ...Array(length - otpArray.length).fill("")];
      setOtp(newOtp);
      onChange?.(newOtp.join(""));

      // Focus the next empty input or the last input
      const nextIndex = Math.min(otpArray.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "h-12 w-12 text-center text-lg font-medium border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
          />
        ))}
      </div>
    );
  }
);
InputOTP.displayName = "InputOTP";

export { InputOTP };
