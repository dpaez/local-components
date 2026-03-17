import * as React from 'react'

import { cn } from '@/lib/utils'

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className='rounded-lg bg-linear-to-b from-primary-600 to-primary-200 pl-[4px] ring-1 ring-primary-200 corner-bevel dark:from-secondary-600 dark:to-secondary-200 dark:ring-secondary-300'>
        <blockquote
          data-slot='blockquote'
          ref={ref}
          className={cn(
            'rounded-lg bg-muted p-6 pl-6 font-mono text-muted-foreground italic backdrop-blur-sm corner-bevel',
            className,
          )}
          style={{ textBox: 'cap alphabetic' }}
          {...props}
        >
          {children}
        </blockquote>
      </div>
    )
  },
)
Blockquote.displayName = 'Blockquote'

export { Blockquote }
