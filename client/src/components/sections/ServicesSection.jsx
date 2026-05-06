import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ClipboardCheck, GraduationCap, Award, ArrowDown } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLenis } from '@/context/LenisContext'

const services = [
  {
    icon: ClipboardCheck,
    title: 'Audit',
    description: 'Independent third-party audits for compliance and performance improvement across all major ISO standards.',
    link: '#process',
  },
  {
    icon: GraduationCap,
    title: 'Training',
    description: 'Certified training programs for employees and internal auditors. Online and on-site options available.',
    link: '#contact',
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Globally recognised ISO certification issued by our accredited body. Fast turnaround, thorough process.',
    link: '#certifications',
  },
]

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const { scrollTo } = useLenis()
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-xl p-8 shadow-card border border-transparent hover:border-gold/30 transition-all"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/0 via-gold/0 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
          <Icon className="w-7 h-7 text-gold" />
        </div>

        <h4 className="text-navy mb-3">{service.title}</h4>
        <p className="text-text-secondary mb-6">{service.description}</p>

        <button
          onClick={() => scrollTo(service.link)}
          className="flex items-center gap-2 text-gold font-medium text-sm hover:gap-3 transition-all"
        >
          Learn More
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export const ServicesSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const isInView = useInView(headingRef, { once: false, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="bg-offwhite py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div ref={headingRef}>
          <SectionHeading
            label="What We Offer"
            title="Our Services"
            subtitle="Comprehensive certification, audit, and training solutions tailored to your industry needs."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
