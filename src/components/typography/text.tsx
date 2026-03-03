import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("leading-7", {
  variants: {
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      xs: "text-xs",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "default",
    weight: "normal",
    color: "default",
    align: "left",
  },
});

type TextElement = "p" | "span" | "div" | "label";

export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLParagraphElement>, "align">,
    VariantProps<typeof textVariants> {
  as?: TextElement;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as: Component = "p", size, weight, color, align, children, ...props }, ref) => {
    return (
      <Component
        data-slot="text"
        ref={ref}
        className={cn(textVariants({ size, weight, color, align, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Text.displayName = "Text";

export { Text };
