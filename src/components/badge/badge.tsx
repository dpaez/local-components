import type { VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import * as React from 'react'

import { Badge as ShadcnBadge, badgeVariants } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface BadgeProps
  extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', icon, dismissible, onDismiss, children, ...props }, ref) => {
    return (
      <ShadcnBadge
        ref={ref}
        variant={variant}
        className={cn(
          'inline-flex items-center gap-1 rounded-sm corner-bevel corner-bl-square corner-tr-square',
          dismissible && 'pr-1',
          className,
        )}
        {...props}
      >
        {icon && <span className='flex items-center'>{icon}</span>}
        <span>{children}</span>
        {dismissible && (
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation()
              onDismiss?.()
            }}
            className='ml-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-white/10'
            aria-label='Remove badge'
          >
            <X className='h-3 w-3' />
          </button>
        )}
      </ShadcnBadge>
    )
  },
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
