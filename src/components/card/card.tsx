import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

const cardVariants = cva('', {
  variants: {
    variant: {
      default: '',
      bordered: '[&>div]:border-2 [&>div]:border-primary',
      ghost: '[&>div]:border-transparent [&>div]:bg-transparent [&>div]:shadow-none',
      elevated: '[&>div]:shadow-lg [&>div]:hover:shadow-xl [&>div]:transition-shadow',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  title?: string
  description?: string
  image?: {
    src: string
    alt: string
  }
  footer?: React.ReactNode
  href?: string
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, title, description, image, footer, href, asChild = false, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'
    const isLink = !!href
    const Wrapper = isLink ? 'a' : Comp

    const cardContent = (
      <ShadcnCard
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(cardVariants({ variant }), isLink && 'cursor-pointer hover:opacity-90 transition-opacity', className)}
        {...props}
      >
        {image && (
          <div className="relative w-full overflow-hidden rounded-t-xl">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover"
            />
          </div>
        )}
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        {children && <CardContent>{children}</CardContent>}
        {footer && <CardFooter className="flex justify-between">{footer}</CardFooter>}
      </ShadcnCard>
    )

    if (isLink) {
      return (
        <a href={href} className="block no-underline">
          {cardContent}
        </a>
      )
    }

    return cardContent
  },
)
Card.displayName = 'Card'

export { Card, cardVariants }
