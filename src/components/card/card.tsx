import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import CardMeta from '@/components/card/card-meta'
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

const cardVariants = cva('', {
  variants: {
    variant: {
      default: 'dark:ring-primary-200/80',
      bordered: 'border-2 border-primary ring-1 ring-primary/10',
      ghost: 'border-transparent bg-transparent shadow-none ring-transparent',
      elevated: 'shadow-lg hover:shadow-xl transition-shadow',
      square: 'rounded-none *:[img:first-child]:rounded-t-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  title?: string
  meta?: {
    label: string
    value: string
  }
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
    {
      className,
      variant,
      title,
      meta,
      description,
      image,
      footer,
      href,
      children,
      size = 'default',
      ...props
    },
    ref,
  ) => {
    const isLink = !!href

    const cardContent = (
      <ShadcnCard
        ref={ref}
        className={cn(
          cardVariants({ variant }),
          'relative w-full group py-4',
          isLink && 'cursor-pointer hover:opacity-90 transition-opacity',
          image && 'pt-0',
          meta && 'flex-row basis-sm md:basis-2xl gap-0 py-0 min-h-36',
          className,
        )}
        size={size}
        {...props}
      >
        {meta && <CardMeta meta={meta} />}
        <div
          className={cn(
            'flex flex-col w-full gap-4',
            image && meta && 'pt-0 pb-4',
            meta && !image && 'py-4',
            footer && meta && 'pb-0',
          )}
        >
          {image && (
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                variant === 'ghost' && 'rounded-b-xl',
                'relative z-20 w-full object-cover aspect-video group-hover:brightness-100 transition-shadow brightness-60 ',
              )}
            />
          )}

          {(title || description) && (
            <CardHeader>
              {title && <CardTitle>{title}</CardTitle>}
              {description && (
                <CardDescription className='line-clamp-4'>{description}</CardDescription>
              )}
            </CardHeader>
          )}
          {children && <CardContent>{children}</CardContent>}
          {footer && (
            <CardFooter className='flex justify-between bg-accent/20 text-accent-foreground'>
              {footer}
            </CardFooter>
          )}
        </div>
      </ShadcnCard>
    )

    if (isLink) {
      return (
        <a href={href} data-slot='card-link' className='block no-underline'>
          {cardContent}
        </a>
      )
    }

    return cardContent
  },
)
Card.displayName = 'Card'

export { Card, cardVariants }
