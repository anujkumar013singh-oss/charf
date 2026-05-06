import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { GoldButton } from '@/components/ui/GoldButton'
import { NavyButton } from '@/components/ui/NavyButton'

export const CTABanner = () => {
  const sectionRef = useRef(null)
  const gradientRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  useEffect(() => {
    if (gradientRef.current && isInView) {
      gsap.to(gradientRef.current, {
        backgroundPosition: '200% 50%',
        duration: 8,
        repeat: -1,
        ease: 'linear',
      })
    }
  }, [isInView])

  return (
    <section 
      ref={sectionRef}
      id="cta" 
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0C2340 0%, #1A3D6E 100%)',
      }}
    >
      {/* Animated gradient overlay */}
      <div
        ref={gradientRef}
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(212,160,23,0.1) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white mb-4"
        >
          Ready to Achieve ISO Certification?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
        >
          Join 500+ businesses that trust QAMS Global for their certification needs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GoldButton href="#contact">
            Apply for Certification
          </GoldButton>
          <NavyButton href="tel:+911204917144" outline>
            Call Us Now
          </NavyButton>
        </motion.div>
      </div>
    </section>
  )
}
