const VARIANTS = {
  primary: {
    base: 'bg-[#0075de] text-white border border-transparent hover:bg-[#005bab] active:scale-95',
    focus: 'focus-visible:outline-2 focus-visible:outline-[#097fe8]',
  },
  secondary: {
    base: 'bg-black/5 text-[rgba(0,0,0,0.95)] border border-transparent hover:scale-105 active:scale-95',
    focus: 'focus-visible:outline-2 focus-visible:outline-[#097fe8]',
  },
  ghost: {
    base: 'bg-transparent text-[rgba(0,0,0,0.95)] border border-transparent hover:underline active:scale-95',
    focus: 'focus-visible:outline-2 focus-visible:outline-[#097fe8]',
  },
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-[0.9375rem]',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
}) {
  const { base, focus } = VARIANTS[variant] ?? VARIANTS.primary
  const sizeClass = SIZES[size] ?? SIZES.md

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded font-semibold leading-snug',
        'transition-all duration-150 cursor-pointer outline-none select-none',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        base,
        focus,
        sizeClass,
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}
