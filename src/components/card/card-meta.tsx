import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface CardMetaProps {
  meta: {
    label: string
    value: string
  }
  children?: React.ReactNode
  className?: string
}

export default function CardMeta({ meta, children, className }: CardMetaProps) {
  return (
    <div
      data-slot='card-meta'
      className={cn('inset-0 rotate-180 bg-primary-700 p-2 [writing-mode:vertical-lr]', className)}
    >
      {children}
      {!children && (
        <div className='flex items-center justify-between gap-2 pb-2'>
          <CardMetaLabel>{meta.label}</CardMetaLabel>
          <Separator orientation='vertical' className=' w-px flex-1 bg-secondary-700/80' />
          <CardMetaValue>{meta.value}</CardMetaValue>
        </div>
      )}
    </div>
  )
}

export function CardMetaLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn('text-xs font-semibold text-secondary uppercase', className)}>
      {children}
    </span>
  )
}

export function CardMetaValue({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={cn('text-xs font-semibold text-secondary uppercase', className)}>
      {children}
    </span>
  )
}
