import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  start?: React.ReactNode;
  end?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, start, end, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="absolute left-0 p-2 h-full flex items-center ">
          {start}
        </div>
        <div className="absolute p-2 h-full flex items-center right-0">
          {end}
        </div>
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-muted px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            start && "pl-12",
            end && "pr-12",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
