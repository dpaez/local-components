import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const variants = {
  variant: {
    primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground shadow hover:bg-secondary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-pg-primary hover:bg-accent/80 hover:text-accent-foreground ',
    cta: 'w-full bg-primary dark:bg-secondary animate-rotate-border rounded-xs transform-gpu will-change-transform transition-all duration-200 ease-out hover:scale-[1.03] hover:bg-conic/[from_var(--border-angle)] from-transparent via-secondary to-transparent dark:via-white from-0% via-10% to-20%',
  },
  size: {
    sm: 'h-8 rounded-xs px-3 text-xs',
    medium: 'h-9 px-4 py-2',
    lg: 'h-11 rounded-xs px-8 text-base',
    icon: 'size-11',
  },
}

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xs text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants,
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
    {
      className,
      variant,
      size = 'medium',
      asChild = false,
      icon,
      iconPosition = 'start',
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    const customClassName =
      variant === 'cta' ? `${className || ''} h-full px-0 py-0 p-[1.2px]` : className

    return (
      <Comp
        data-slot='button'
        className={cn(buttonVariants({ variant, size, className: customClassName }))}
        ref={ref}
        {...props}
        style={{
          textBox: 'cap alphabetic',
        }}
      >
        {icon && iconPosition === 'start' && icon}
        {variant === 'cta' && (
          <div
            className={cn(
              variants.size[(size as keyof typeof variants.size) || 'medium'],
              ' inline-flex w-full items-center justify-center rounded-[calc(var(--radius-xs)-var(--padding,1px))] border-primary-500 bg-primary-600 text-base font-semibold tracking-wide text-primary-foreground uppercase subpixel-antialiased dark:border-secondary-500 dark:bg-secondary-600 dark:text-secondary-foreground',
            )}
          >
            <Slottable>{children}</Slottable>
          </div>
        )}
        {variant !== 'cta' && <Slottable>{children}</Slottable>}
        {icon && iconPosition === 'end' && icon}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
