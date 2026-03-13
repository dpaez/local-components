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
      default: 'min-h-[100dvh]',
      minimal: 'min-h-[50vh]',
      split: 'min-h-[100dvh]',
      'full-bleed': 'min-h-[100dvh]',
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
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>, VariantProps<typeof heroVariants> {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  cta?: {
    label: string
    href: string
  }
  background?: {
    type: 'image' | 'color' | 'gradient' | 'mesh'
    value: string
  }
  asChild?: boolean
  splitContent?: React.ReactNode | string
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
      splitContent,
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
          return {
            backgroundColor: background.value,
          }
        case 'gradient':
          return {
            background: background.value,
          }
        default:
          return {}
      }
    }

    const content = (
      <div
        className={cn(
          'container w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center',
          'py-16 md:py-24',
        )}
      >
        <div
          className={cn(
            ' w-full flex flex-col items-center justify-center',
            alignment === 'center' && 'mx-auto text-center',
            alignment === 'left' && 'items-start',
            alignment === 'right' && 'items-end',
          )}
        >
          <Heading
            as='h1'
            size='3xl'
            className={cn(
              'mb-4',
              background?.type === 'image' && variant !== 'split' && 'text-white drop-shadow-lg',
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
                background?.type === 'image' &&
                  variant !== 'split' &&
                  'text-white/90 drop-shadow-md',
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
              <Button variant='cta'>
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
            'grid grid-cols-1 md:grid-cols-2 flex-col',
            className,
          )}
          {...props}
        >
          <div className='flex items-center justify-center md:justify-start md:h-full p-2 md:p-8'>
            {content}
          </div>

          {background?.type === 'image' && (
            <div
              className='relative h-full'
              style={{
                backgroundImage: `url(${background.value})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}

          {!background?.type && (
            <div className='flex relative h-full radial-gradient-background'>
              <div className='md:absolute inset-0 flex items-center justify-center p-4 md:p-2'>
                {splitContent}
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
          'items-center justify-center relative',
          className,
        )}
        style={getBackgroundStyles()}
        {...props}
      >
        {background?.type === 'image' && <div className='absolute inset-0 bg-foreground/40' />}
        {background?.type === 'mesh' && (
          <div
            className='absolute inset-0 z-0'
            style={{
              backgroundImage: `
                linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 0',
              maskImage: `
                repeating-linear-gradient(
                      to right,
                      black 0px,
                      black 3px,
                      transparent 3px,
                      transparent 8px
                    ),
                    repeating-linear-gradient(
                      to bottom,
                      black 0px,
                      black 3px,
                      transparent 3px,
                      transparent 8px
                    ),
                    radial-gradient(ellipse 100% 80% at 50% 100%, var(--foreground) 50%, transparent 90%)
              `,
              WebkitMaskImage: `
          repeating-linear-gradient(
                      to right,
                      black 0px,
                      black 3px,
                      transparent 3px,
                      transparent 8px
                    ),
                    repeating-linear-gradient(
                      to bottom,
                      black 0px,
                      black 3px,
                      transparent 3px,
                      transparent 8px
                    ),
                    radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
              `,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          />
        )}
        {content}
      </Comp>
    )
  },
)
Hero.displayName = 'Hero'

export { Hero }
