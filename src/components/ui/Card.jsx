export default function Card({ children, className = '', onClick }) {
  const isClickable = Boolean(onClick)

  return (
    <div
      onClick={onClick}
      style={{
        boxShadow:
          'rgba(0,0,0,0.04) 0px 4px 18px, rgba(0,0,0,0.027) 0px 2.025px 7.84688px, rgba(0,0,0,0.02) 0px 0.8px 2.925px, rgba(0,0,0,0.01) 0px 0.175px 1.04062px',
      }}
      className={[
        'bg-white rounded-xl border border-black/10',
        isClickable
          ? 'cursor-pointer transition-shadow duration-200 hover:shadow-lg'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
