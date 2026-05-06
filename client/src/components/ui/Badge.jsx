export const Badge = ({ children, variant = 'gold', size = 'md' }) => {
  const variants = {
    gold: 'bg-gold-pale text-navy border-gold',
    blue: 'bg-blue-pale text-blue-mid border-blue-light',
    green: 'bg-green-100 text-green-800 border-green-400',
    red: 'bg-red-100 text-red-800 border-red-400',
    amber: 'bg-amber-100 text-amber-800 border-amber-400',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return (
    <span className={`
      inline-block rounded-full border font-medium
      ${variants[variant]}
      ${sizes[size]}
    `}>
      {children}
    </span>
  )
}
