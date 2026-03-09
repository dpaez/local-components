import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground shadow hover:bg-secondary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        cta:
          'relative bg-primary text-primary-foreground text-base font-semibold tracking-wide shadow-md min-w-[10rem] hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 animate-border-gradient transition-[transform,color,box-shadow] duration-200 ease-out active:scale-[0.98] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-ring',
      },
      size: {
        sm: 'h-8 rounded-md px-3 text-xs',
        medium: 'h-9 px-4 py-2',
        lg: 'h-11 rounded-md px-8 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, icon, iconPosition = 'start', children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        data-slot='button'
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === 'start' && icon}
        <Slottable>{children}</Slottable>
        {icon && iconPosition === 'end' && icon}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
