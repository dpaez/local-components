import * as React from 'react'

import { cn } from '@/lib/utils'

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const Code = React.forwardRef<HTMLElement, CodeProps>(({ className, children, ...props }, ref) => {
  return (
    <code
      data-slot='code'
      ref={ref}
      className={cn(
        'relative rounded bg-secondary-400 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold corner-square corner-tl-bevel dark:bg-muted',
        className,
      )}
      style={{
        textBox: 'cap alphabetic',
      }}
      {...props}
    >
      {children}
    </code>
  )
})
Code.displayName = 'Code'

export { Code }
