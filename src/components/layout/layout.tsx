import { ThemeProvider, type Theme } from 'local-components/theme-context'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  centered?: boolean
  defaultTheme?: Theme
  storageKey?: string
  noise?: boolean
  borders?: 'lr' | 'tb' | 'all' | 'none'
}

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

const paddingClasses = {
  none: '',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      className,
      children,
      maxWidth = 'lg',
      padding = 'md',
      centered = false,
      defaultTheme = 'light',
      storageKey = 'local-components-theme',
      noise = false,
      borders = 'none',
      ...props
    },
    ref,
  ) => {
    return (
      <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
        <div
          data-slot='layout'
          ref={ref}
          className={cn(
            'relative min-h-screen w-full',
            maxWidthClasses[maxWidth],
            paddingClasses[padding],
            centered && 'mx-auto',
            noise &&
              'noise-bg before:pointer-events-none  before:fixed before:top-0 before:left-0 before:z-50 before:h-full before:w-full before:opacity-20 before:content-[""]',
            borders === 'lr' &&
              'content-box px-[2px] before:absolute before:top-0 before:-left-[2%] before:-z-1 before:h-full before:w-[102%] before:bg-linear-0 before:from-primary-200 before:from-2% before:via-primary-800 before:via-50% before:to-primary-200 before:to-98% before:content-[""] dark:before:from-secondary-200 dark:before:via-secondary-300 dark:before:to-secondary-200',
            borders === 'lr' && 'triangle before:bg-origin-content',
            borders === 'tb' && 'border-t border-b border-secondary-700',
            borders === 'all' && 'border border-secondary-700',
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              noise && 'relative z-10',
              borders === 'lr' && 'min-h-screen bg-background',
            )}
          >
            {children}
          </div>
        </div>
      </ThemeProvider>
    )
  },
)
Layout.displayName = 'Layout'

export { Layout }
