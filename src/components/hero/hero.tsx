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
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof heroVariants> {
  title: string
  subtitle?: string
  cta?: {
    label: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  background?: {
    type: 'image' | 'color' | 'gradient' | 'mesh'
    value: string
  }
  asChild?: boolean
  splitContent?: React.ReactNode | string
}

// const Noise = () => {
//   return 
//   'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22500%22%20height%3D%22500%22%3E%3Cfilter%20id%3D%22noise%22%20x%3D%220%22%20y%3D%220%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3CfeBlend%20mode%3D%22screen%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22500%22%20height%3D%22500%22%20filter%3D%22url(%23noise)%22%20opacity%3D%220.5%22%2F%3E%3C%2Fsvg%3E")';
// }

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
            backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDAwIDQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMi4zOSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==)',
            filter: 'contrast(100%) brightness(100%)',
             
          }
        case 'gradient':
          return { 
            background: background.value + ', url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNDAwIDQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMi4zOSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==)',
            filter: 'contrast(100%) brightness(100%)',
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
                background?.type === 'image' && variant !== 'split' && 'text-white/90 drop-shadow-md',
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
              <Button asChild variant={cta.variant === 'secondary' ? 'outline' : 'primary'}>
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
          <div className='flex items-center justify-center md:justify-start md:h-full p-2 md:p-8'>{content}</div>
          
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
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 0",
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
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
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
