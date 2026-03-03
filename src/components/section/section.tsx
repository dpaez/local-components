import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    background: {
      default: "bg-background",
      alternate: "bg-muted",
      primary: "bg-primary text-primary-foreground",
      accent: "bg-accent text-accent-foreground",
    },
    spacing: {
      compact: "py-8",
      default: "py-16",
      spaced: "py-24",
    },
  },
  defaultVariants: {
    background: "default",
    spacing: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  title?: string;
  subtitle?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, background, spacing, title, subtitle, children, ...props }, ref) => {
    return (
      <section
        data-slot="section"
        ref={ref}
        className={cn(sectionVariants({ background, spacing }), className)}
        {...props}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {(title || subtitle) && (
            <div className="mb-8">
              {title && (
                <Heading
                  as="h2"
                  className={cn(
                    "mb-2",
                    background === "primary" && "text-primary-foreground",
                    background === "accent" && "text-accent-foreground",
                  )}
                >
                  {title}
                </Heading>
              )}
              {subtitle && (
                <Text
                  size="lg"
                  color="muted"
                  className={cn(
                    background === "primary" && "text-primary-foreground/80",
                    background === "accent" && "text-accent-foreground/80",
                  )}
                >
                  {subtitle}
                </Text>
              )}
            </div>
          )}
          {children}
        </div>
      </section>
    );
  },
);
Section.displayName = "Section";

export { Section };
