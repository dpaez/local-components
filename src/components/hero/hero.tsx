import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Button } from '@/components/button/button'
import { Heading } from '@/components/typography/heading'
import { Text } from '@/components/typography/text'
import { cn } from '@/lib/utils'

const heroVariants = cva('relative w-full flex overflow-hidden', {
  variants: {
    variant: {
      default: 'min-h-screen',
      minimal: 'min-h-[50vh]',
      split: 'min-h-screen',
      'full-bleed': 'min-h-screen',
    },
    alignment: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    },
  },
  defaultVariants: {
    variant: 'default',
    alignment: 'center',
  },
})

export interface HeroProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof heroVariants> {
  title: string
  subtitle?: string
  cta?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  background?: {
    type: 'image' | 'color' | 'gradient'
    value: string
  }
  asChild?: boolean
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      className,
      variant,
      alignment,
      title,
      subtitle,
      cta,
      background,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'section'

    const getBackgroundStyles = () => {
      if (!background) return {}

      switch (background.type) {
        case 'image':
          return {
            backgroundImage: `url(${background.value})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        case 'color':
          return { backgroundColor: background.value }
        case 'gradient':
          return { background: background.value }
        default:
          return {}
      }
    }

    const content = (
      <div
        className={cn(
          'container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center',
          'py-16 md:py-24',
        )}
      >
        <div
          className={cn(
            'max-w-3xl w-full',
            alignment === 'center' && 'mx-auto text-center',
            alignment === 'left' && 'mr-auto text-left',
            alignment === 'right' && 'ml-auto text-right',
          )}
        >
          <Heading
            as='h1'
            size='3xl'
            className={cn(
              'mb-4',
              background?.type === 'image' && 'text-white drop-shadow-lg',
              background?.type === 'color' && 'text-foreground',
            )}
          >
            {title}
          </Heading>

          {subtitle && (
            <Text
              size='lg'
              className={cn(
                'mb-8 max-w-2xl',
                alignment === 'center' && 'mx-auto',
                alignment === 'left' && 'mr-auto',
                alignment === 'right' && 'ml-auto',
                background?.type === 'image' && 'text-white/90 drop-shadow-md',
                background?.type === 'color' && 'text-foreground/80',
              )}
            >
              {subtitle}
            </Text>
          )}

          {cta && (
            <div
              className={cn(
                'flex gap-4',
                alignment === 'center' && 'justify-center',
                alignment === 'left' && 'justify-start',
                alignment === 'right' && 'justify-end',
              )}
            >
              <Button variant={cta.variant === 'secondary' ? 'outline' : 'primary'}>
                <a href={cta.href}>{cta.label}</a>
              </Button>
            </div>
          )}

          {children}
        </div>
      </div>
    )

    if (variant === 'split') {
      return (
        <Comp
          data-slot='hero'
          data-variant='split'
          ref={ref}
          className={cn(
            heroVariants({ variant, alignment }),
            'grid lg:grid-cols-2',
            className,
          )}
          {...props}
        >
          <div className='flex items-center justify-center p-8'>{content}</div>
          {background?.type === 'image' && (
            <div
              className='hidden lg:block relative h-full'
              style={{
                backgroundImage: `url(${background.value})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}
          {!background?.type && (
            <div className='hidden lg:block relative h-full bg-gradient-to-br from-primary/20 to-accent/20'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <Text size='sm' color='muted'>Split layout - add background image for visual content</Text>
              </div>
            </div>
          )}
        </Comp>
      )
    }

    return (
      <Comp
        data-slot='hero'
        data-variant={variant}
        ref={ref}
        className={cn(
          heroVariants({ variant, alignment }),
          'items-center justify-center',
          className,
        )}
        style={getBackgroundStyles()}
        {...props}
      >
        {background?.type === 'image' && <div className='absolute inset-0 bg-black/40' />}
        {content}
      </Comp>
    )
  },
)
Hero.displayName = 'Hero'

export { Hero }
