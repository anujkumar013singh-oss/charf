import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Factory, 
  Utensils, 
  Monitor, 
  Pill, 
  HardHat, 
  Stethoscope, 
  Hotel, 
  ShoppingCart, 
  Zap, 
  FlaskConical, 
  Car, 
  GraduationCap 
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const industries = [
  { name: 'Manufacturing', icon: Factory },
  { name: 'Food & Beverage', icon: Utensils },
  { name: 'Information Technology', icon: Monitor },
  { name: 'Pharmaceuticals', icon: Pill },
  { name: 'Construction', icon: HardHat },
  { name: 'Healthcare', icon: Stethoscope },
  { name: 'Hospitality', icon: Hotel },
  { name: 'Retail', icon: ShoppingCart },
  { name: 'Energy & Power', icon: Zap },
  { name: 'Chemicals', icon: FlaskConical },
  { name: 'Automobiles', icon: Car },
  { name: 'Education', icon: GraduationCap },
]

export const IndustriesGrid = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      id="industries" 
      className="bg-navy py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeading
          label="Industries"
          title="Industries We Serve"
          subtitle="Providing certification services across diverse sectors and specialized domains."
          light
          centered
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ 
                  backgroundColor: 'rgba(212, 160, 23, 0.15)', 
                  borderColor: '#D4A017',
                  scale: 1.04 
                }}
                className="group bg-white/5 border border-white/10 rounded-lg p-6 text-center cursor-pointer transition-colors"
              >
                <Icon className="w-8 h-8 text-white mx-auto mb-3 group-hover:text-gold transition-colors" />
                <span className="text-white font-medium text-sm">{industry.name}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
