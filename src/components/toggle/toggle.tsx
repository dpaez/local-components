import { cva, type VariantProps } from 'class-variance-authority'
import { Sun, Moon } from 'lucide-react'
import * as React from 'react'

import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/lib/theme-context'
import { cn } from '@/lib/utils'

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        icon: 'h-9 w-9 p-0',
        button: 'h-9 px-4 py-2 gap-2',
        switch: 'relative',
      },
    },
    defaultVariants: {
      variant: 'icon',
    },
  },
)

export interface ToggleProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  showLabel?: boolean
  icon?: boolean
  darkIcon?: React.ReactNode
  lightIcon?: React.ReactNode
}

const defaultDarkIcon = <Moon className='h-4 w-4 transition-all' />
const defaultLightIcon = <Sun className='h-4 w-4 transition-all' />

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant = 'icon',
      showLabel = false,
      icon = true,
      darkIcon = defaultDarkIcon,
      lightIcon = defaultLightIcon,
      ...props
    },
    ref,
  ) => {
    const { resolvedTheme, toggleTheme } = useTheme()
    const isDark = resolvedTheme === 'dark'

    const handleToggle = () => {
      toggleTheme()
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        toggleTheme()
      }
    }

    // Switch variant uses shadcn Switch component
    if (variant === 'switch') {
      return (
        <div className='inline-flex items-center gap-2'>
          {showLabel && (
            <span className='text-sm text-muted-foreground'>{isDark ? 'Dark' : 'Light'}</span>
          )}
          <Switch
            data-slot='toggle'
            data-variant='switch'
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            checked={isDark}
            onCheckedChange={handleToggle}
            className={cn(
              className,
              'rounded-sm corner-bevel corner-bl-square corner-tr-square *:rounded-sm *:corner-bevel *:corner-bl-square *:corner-tr-square',
            )}
            ref={ref as React.Ref<HTMLButtonElement>}
            {...props}
          />
        </div>
      )
    }

    return (
      <button
        data-slot='toggle'
        data-variant={variant}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={cn(toggleVariants({ variant }), className)}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        ref={ref}
        {...props}
      >
        {icon && <>{isDark ? darkIcon : lightIcon}</>}
        {showLabel && <span>{isDark ? 'Dark' : 'Light'}</span>}
      </button>
    )
  },
)
Toggle.displayName = 'Toggle'

export { Toggle }
