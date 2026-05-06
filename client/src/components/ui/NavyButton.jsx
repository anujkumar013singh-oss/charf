import { motion } from 'framer-motion'
import { useLenis } from '@/context/LenisContext'

export const NavyButton = ({ children, href, onClick, className = '', outline = false }) => {
  const { scrollTo } = useLenis()

  const handleClick = (e) => {
    if (href?.startsWith('#')) {
      e.preventDefault()
      scrollTo(href)
    } else if (onClick) {
      onClick(e)
    }
  }

  const baseClasses = outline
    ? 'border-2 border-white text-white hover:bg-white hover:text-navy'
    : 'bg-navy text-white hover:bg-navy-light'

  return (
    <motion.button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-6 py-3 
        font-heading font-semibold rounded-md
        transition-colors
        ${baseClasses}
        ${className}
      `}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
