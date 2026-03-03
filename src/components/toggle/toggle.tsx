import { cva, type VariantProps } from "class-variance-authority";
import { Sun, Moon } from "lucide-react";
import * as React from "react";

import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        icon: "h-9 w-9 p-0",
        button: "h-9 px-4 py-2 gap-2",
        switch: "h-6 w-11 rounded-full p-0 relative",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  },
);

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof toggleVariants> {
  showLabel?: boolean;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant = "icon", showLabel = false, ...props }, ref) => {
    const { resolvedTheme, toggleTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const handleClick = () => {
      toggleTheme();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleTheme();
      }
    };

    if (variant === "switch") {
      return (
        <button
          data-slot="toggle"
          data-variant="switch"
          role="switch"
          aria-checked={isDark}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className={cn(toggleVariants({ variant }), className)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          ref={ref}
          {...props}
        >
          <span
            className={cn(
              "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
              isDark ? "translate-x-5" : "translate-x-1",
            )}
          />
        </button>
      );
    }

    return (
      <button
        data-slot="toggle"
        data-variant={variant}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(toggleVariants({ variant }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={ref}
        {...props}
      >
        {isDark ? (
          <Moon className="h-4 w-4 transition-all" />
        ) : (
          <Sun className="h-4 w-4 transition-all" />
        )}
        {showLabel && <span>{isDark ? "Dark" : "Light"}</span>}
      </button>
    );
  },
);
Toggle.displayName = "Toggle";

export { Toggle };
