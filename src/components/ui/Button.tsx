import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>  & { as: 'a' }

type Props = ButtonProps | AnchorProps

const variantStyles: Record<Variant, string> = {
  primary:   'bg-[var(--red)] text-white hover:bg-[var(--red-dark)] shadow-sm',
  secondary: 'bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-muted)] shadow-sm font-semibold',
  outline:   'border-2 border-[var(--red)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white',
  ghost:     'text-[var(--navy)] hover:bg-[var(--light)]',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({ variant = 'primary', size = 'md', className, ...rest }: Props) {
  const base = clsx(
    'inline-flex items-center justify-center gap-2 rounded-md font-heading font-medium tracking-wide',
    'transition-all duration-150 cursor-pointer select-none whitespace-nowrap',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if ((rest as AnchorProps).as === 'a') {
    const { as: _as, ...anchorRest } = rest as AnchorProps
    return <a className={base} {...anchorRest} />
  }

  const { as: _as, ...btnRest } = rest as ButtonProps
  return <button className={base} {...btnRest} />
}
