import { motion } from 'framer-motion'
import { useLenis } from '@/context/LenisContext'

export const GoldButton = ({ children, href, onClick, className = '' }) => {
  const { scrollTo } = useLenis()

  const handleClick = (e) => {
    if (href?.startsWith('#')) {
      e.preventDefault()
      scrollTo(href)
    } else if (onClick) {
      onClick(e)
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-6 py-3 
        bg-gold text-navy font-heading font-semibold
        rounded-md transition-colors
        hover:bg-gold-light
        ${className}
      `}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
