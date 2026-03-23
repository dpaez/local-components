import { cva, type VariantProps } from 'class-variance-authority'
import {
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  useState,
  useLayoutEffect,
  useRef,
  forwardRef,
} from 'react'

import CardMeta from '@/components/card/card-meta'
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
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
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
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
  badge?: ReactNode
  footer?: ReactNode
  href?: string
  asChild?: boolean
  size?: 'sm' | 'default'
  descriptionClassName?: string
}

const useTruncatedElement = (ref: RefObject<HTMLDivElement>) => {
  const [isTruncated, setIsTruncated] = useState(false)
  const [isReadingMore, setIsReadingMore] = useState(false)

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {}

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true)
    } else {
      setIsTruncated(false)
    }
  }, [ref])

  return {
    isTruncated,
    isReadingMore,
    setIsReadingMore,
  }
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      title,
      meta,
      badge,
      description,
      image,
      footer,
      href,
      children,
      descriptionClassName,
      size = 'default',
      ...props
    },
    ref,
  ) => {
    const isLink = !!href
    const internalDescriptionClassname = cn('line-clamp-4 col-span-2 ', descriptionClassName)
    const descriptionRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)
    const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement(descriptionRef)

    const cardContent = (
      <ShadcnCard
        ref={ref}
        className={cn(
          'flex flex-col justify-between',
          cardVariants({ variant }),
          'group relative w-full rounded-2xl py-4 corner-bl-square corner-br-bevel corner-tl-bevel corner-tr-square',
          isLink && 'cursor-pointer transition-opacity hover:opacity-90',
          image && 'pt-0 ',
          meta && 'min-h-36 basis-sm flex-row gap-0 py-0 md:basis-2xl',
          className,
        )}
        size={size}
        style={{
          textBox: 'cap alphabetic',
        }}
        {...props}
      >
        {meta && <CardMeta meta={meta} />}
        <div
          className={cn(
            'flex w-full flex-col gap-4 justify-between',
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
                variant === 'ghost' && 'corner-bl-square corner-tr-square',
                'relative z-20 aspect-video w-full object-cover brightness-60 transition-shadow group-hover:brightness-100 ',
              )}
            />
          )}

          {(title || description) && (
            <CardHeader>
              {badge && <CardAction>{badge}</CardAction>}
              {title && <CardTitle>{title}</CardTitle>}
              {description && (
                <>
                  <CardDescription
                    ref={descriptionRef}
                    className={cn(internalDescriptionClassname, isReadingMore && 'line-clamp-none')}
                  >
                    {description}
                  </CardDescription>
                  <div className='flex justify-start items-start'>
                    {isTruncated && !isReadingMore && (
                      <button
                        className='text-xs hover:text-secondary'
                        onClick={() => setIsReadingMore(true)}
                      >
                        Read more
                      </button>
                    )}
                    {isTruncated && isReadingMore && (
                      <button
                        className='text-xs hover:text-secondary'
                        onClick={() => setIsReadingMore(false)}
                      >
                        Read less
                      </button>
                    )}
                  </div>
                </>
              )}
            </CardHeader>
          )}
          {children && <CardContent>{children}</CardContent>}
          {footer && (
            <CardFooter className='flex justify-between border-t bg-accent/20 text-accent-foreground dark:border-t-foreground/50 '>
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
