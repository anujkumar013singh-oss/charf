import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

const stats = [
  { value: 500, label: 'Clients Certified', suffix: '+', description: 'Trusted by businesses across industries' },
  { value: 10, label: 'Years of Excellence', suffix: '+', description: 'A decade of certification expertise' },
  { value: 15, label: 'Industries Served', suffix: '+', description: 'From manufacturing to IT services' },
  { value: 20, label: 'ISO Standards Offered', suffix: '+', description: 'Comprehensive certification portfolio' },
]

const StatCard = ({ stat, index }) => {
  const { count, ref, suffix } = useCountUp(stat.value, 2.5, stat.suffix)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative bg-white/[0.04] border border-gold/20 rounded-xl p-8 text-center"
    >
      {/* Gold top border */}
      <div className="absolute top-0 left-4 right-4 h-[3px] bg-gold" />
      
      <div className="text-5xl lg:text-6xl font-heading font-bold text-gold mb-2">
        {count}{suffix}
      </div>
      <div className="text-white font-heading font-semibold text-lg mb-2">
        {stat.label}
      </div>
      <p className="text-gray-400 text-sm">
        {stat.description}
      </p>
    </motion.div>
  )
}

export const StatsSection = () => {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    if (lineRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          scaleX: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
      }, sectionRef)
      return () => ctx.revert()
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="stats" 
      className="relative bg-footer py-20 lg:py-28 overflow-hidden"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeading
          label="Our Impact"
          title="Our Impact in Numbers"
          light
          centered
        />

        {/* Animated gold line */}
        <div 
          ref={lineRef}
          className="h-[2px] w-32 bg-gold mx-auto mb-12"
          style={{ transformOrigin: 'left' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
