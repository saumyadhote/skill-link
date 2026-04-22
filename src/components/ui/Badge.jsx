const VARIANTS = {
  blue: 'bg-[#f2f9ff] text-[#097fe8]',
  green: 'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-700',
  gray: 'bg-[#f6f5f4] text-[#615d59]',
}

export default function Badge({ children, variant = 'blue', className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold leading-tight',
        'tracking-wide whitespace-nowrap',
        VARIANTS[variant] ?? VARIANTS.blue,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
