import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const leadVariants = cva("text-xl text-muted-foreground leading-8", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export interface LeadProps
  extends
    Omit<React.HTMLAttributes<HTMLParagraphElement>, "align">,
    VariantProps<typeof leadVariants> {}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, align, children, ...props }, ref) => {
    return (
      <p data-slot="lead" ref={ref} className={cn(leadVariants({ align, className }))} {...props}>
        {children}
      </p>
    );
  },
);
Lead.displayName = "Lead";

export { Lead };
