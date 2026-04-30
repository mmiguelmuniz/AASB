import clsx from 'clsx'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
  label?: string
}

const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

export default function LoadingSpinner({ size = 'md', light = false, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={clsx(
          sizes[size],
          'rounded-full border-2 animate-spin',
          light
            ? 'border-white/20 border-t-white'
            : 'border-[var(--border)] border-t-[var(--navy)]',
        )}
      />
      {label && (
        <p className={clsx(
          'font-heading text-sm',
          light ? 'text-white/60' : 'text-[var(--muted)]',
        )}>
          {label}
        </p>
      )}
    </div>
  )
}