import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-lg bg-card text-card-foreground overflow-hidden", {
  variants: {
    variant: {
      default: "border shadow-sm",
      bordered: "border-2 border-primary",
      ghost: "border border-transparent",
      elevated: "shadow-lg hover:shadow-xl transition-shadow",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof cardVariants> {
  title?: string;
  description?: string;
  image?: {
    src: string;
    alt: string;
  };
  footer?: React.ReactNode;
  href?: string;
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      title,
      description,
      image,
      footer,
      href,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";
    const WrapperComp = href ? "a" : Comp;

    const cardContent = (
      <>
        {image && (
          <div className="aspect-video w-full overflow-hidden">
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="p-6">
          {title && (
            <h3 className="text-lg font-semibold leading-none tracking-tight mb-2">{title}</h3>
          )}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          {children}
        </div>
        {footer && <div className="flex items-center p-6 pt-0">{footer}</div>}
      </>
    );

    if (href) {
      return (
        <a
          data-slot="card"
          href={href}
          className={cn(
            cardVariants({ variant }),
            "block hover:bg-accent/50 transition-colors cursor-pointer",
            className,
          )}
          ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
          {...props}
        >
          {cardContent}
        </a>
      );
    }

    return (
      <Comp
        data-slot="card"
        className={cn(cardVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {cardContent}
      </Comp>
    );
  },
);
Card.displayName = "Card";

export { Card };
