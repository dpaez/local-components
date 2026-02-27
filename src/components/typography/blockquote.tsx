import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <blockquote
        data-slot="blockquote"
        ref={ref}
        className={cn(
          'mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground',
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    )
  }
)
Blockquote.displayName = 'Blockquote'

export { Blockquote }
