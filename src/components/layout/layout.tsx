import * as React from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider, type Theme } from "@/lib/theme-context";

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  centered?: boolean;
  defaultTheme?: Theme;
  storageKey?: string;
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

const paddingClasses = {
  none: "",
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
};

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      className,
      children,
      maxWidth = "lg",
      padding = "md",
      centered = false,
      defaultTheme = "light",
      storageKey = "local-components-theme",
      ...props
    },
    ref,
  ) => {
    return (
      <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
        <div
          data-slot="layout"
          ref={ref}
          className={cn(
            "min-h-screen w-full",
            maxWidthClasses[maxWidth],
            paddingClasses[padding],
            centered && "mx-auto",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </ThemeProvider>
    );
  },
);
Layout.displayName = "Layout";

export { Layout };
