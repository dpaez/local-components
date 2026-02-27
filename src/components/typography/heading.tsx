import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const headingVariants = cva(
  'font-bold tracking-tight',
  {
    variants: {
      size: {
        '3xl': 'text-4xl md:text-5xl lg:text-6xl',
        '2xl': 'text-3xl md:text-4xl lg:text-5xl',
        xl: 'text-2xl md:text-3xl lg:text-4xl',
        lg: 'text-xl md:text-2xl lg:text-3xl',
        md: 'text-lg md:text-xl',
        sm: 'text-base md:text-lg',
        xs: 'text-sm md:text-base',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      size: 'lg',
      weight: 'bold',
      align: 'left',
    },
  }
)

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const defaultSizeMap: Record<HeadingElement, VariantProps<typeof headingVariants>['size']> = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'sm',
}

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'align'>,
    VariantProps<typeof headingVariants> {
  as?: HeadingElement
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = 'h2', size, weight, align, children, ...props }, ref) => {
    const resolvedSize = size || defaultSizeMap[Component]

    return (
      <Component
        data-slot="heading"
        ref={ref}
        className={cn(headingVariants({ size: resolvedSize, weight, align, className }))}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Heading.displayName = 'Heading'

export { Heading }
