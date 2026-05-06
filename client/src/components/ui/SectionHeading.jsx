import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

export const SectionHeading = ({ label, title, subtitle, light = false, centered = false }) => {
  const ref = useRef(null)
  const lineRef = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  useEffect(() => {
    if (lineRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          scaleX: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
        })
      }, ref)
      return () => ctx.revert()
    }
  }, [])

  return (
    <div 
      ref={ref}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {label && (
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="label-text block mb-3"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`${light ? 'text-white' : 'text-navy'} mb-4`}
      >
        {title}
      </motion.h2>
      <motion.div
        ref={lineRef}
        className={`h-[3px] w-20 bg-gold mb-6 ${centered ? 'mx-auto' : ''}`}
        style={{ transformOrigin: 'left' }}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-300' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
