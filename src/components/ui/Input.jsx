export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[rgba(0,0,0,0.95)]"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={[
          'w-full px-3 py-2 rounded bg-white text-[rgba(0,0,0,0.9)]',
          'border border-[#dddddd] placeholder-[#a39e98]',
          'text-base font-normal leading-relaxed',
          'outline-none focus:ring-2 focus:ring-[#097fe8] focus:border-transparent',
          'transition-shadow duration-150',
          className,
        ].join(' ')}
      />
    </div>
  )
}
