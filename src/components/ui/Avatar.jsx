export default function Avatar({ src, name, size = 'md', className = '' }) {
  const SIZES = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-16 h-16 text-xl' }
  const sizeClass = SIZES[size] ?? SIZES.md
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={[
          sizeClass,
          'rounded-full object-cover border border-black/10 flex-shrink-0',
          className,
        ].join(' ')}
      />
    )
  }

  return (
    <div
      className={[
        sizeClass,
        'rounded-full bg-[#f6f5f4] border border-black/10 flex items-center justify-center',
        'font-semibold text-[#615d59] flex-shrink-0',
        className,
      ].join(' ')}
    >
      {initials}
    </div>
  )
}
