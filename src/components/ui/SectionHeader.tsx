import clsx from 'clsx'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeader({ eyebrow, title, subtitle, centered = false, light = false, className }: Props) {
  return (
    <div className={clsx(centered && 'text-center', className)}>
      {eyebrow && (
        <p className={clsx(
          'font-heading text-xs tracking-[0.25em] uppercase mb-2',
          light ? 'text-[var(--gold)]' : 'text-[var(--red)]',
        )}>
          {eyebrow}
        </p>
      )}
      <h2 className={clsx(
        'font-heading font-bold text-3xl sm:text-4xl leading-tight',
        light ? 'text-white' : 'text-[var(--navy)]',
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx(
          'mt-3 text-base max-w-xl leading-relaxed',
          centered && 'mx-auto',
          light ? 'text-white/70' : 'text-[var(--muted)]',
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
