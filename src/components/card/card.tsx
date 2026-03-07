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
      bordered: 'border-2 border-primary ring-1 ring-primary/10',
      ghost: 'border-transparent bg-transparent shadow-none ring-transparent',
      elevated: 'shadow-lg hover:shadow-xl transition-shadow',
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
  size?: 'sm' | 'default'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, title, description, image, footer, href, asChild = false, children, size='default', ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'
    const isLink = !!href
    const Wrapper = isLink ? 'a' : Comp

    const cardContent = (
      <ShadcnCard
        className={
          cn(cardVariants({ variant }), 
          'relative w-full group', 
          isLink && 'cursor-pointer hover:opacity-90 transition-opacity', 
          image && 'pt-0',
          className)}
        size={size}
        {...props}
      >
        {image && (
          <img
            src={image.src}
            alt={image.alt}
            className="relative z-20 w-full object-cover aspect-video group-hover:brightness-100 transition-all brightness-60 dark:brightness-40"
          />
        )}
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        {children && <CardContent>{children}</CardContent>}
        {footer && <CardFooter className="flex justify-between bg-accent/20 text-accent-foreground">{footer}</CardFooter>}
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
