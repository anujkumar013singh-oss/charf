import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, Search, Building2, ShieldCheck } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Apply',
    description: 'Submit your application form online or contact our team directly.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Document Review',
    description: 'Our experts review your quality management documentation thoroughly.',
  },
  {
    number: '03',
    icon: Building2,
    title: 'On-site Audit',
    description: 'Certified auditors visit your premises and conduct a detailed stage-2 audit.',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Get Certified',
    description: 'Receive your internationally recognised ISO certificate. Valid 3 years.',
  },
]

export const HowItWorks = () => {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  useEffect(() => {
    if (lineRef.current && isInView) {
      const ctx = gsap.context(() => {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          scaleX: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        })
      }, sectionRef)
      return () => ctx.revert()
    }
  }, [isInView])

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="bg-white py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeading
          label="The Process"
          title="How It Works"
          subtitle="A streamlined certification process designed to get you compliant quickly and efficiently."
        />

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline line */}
          <div 
            ref={lineRef}
            className="absolute top-[60px] left-[12.5%] right-[12.5%] h-[2px] bg-gold"
            style={{ transformOrigin: 'left' }}
          />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  {/* Numbered Circle */}
                  <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold text-navy font-heading font-bold text-lg mb-6 z-10">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <Icon className="w-8 h-8 text-navy" />
                  </div>

                  <h5 className="text-navy mb-2">{step.title}</h5>
                  <p className="text-text-secondary text-sm">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gold" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative pl-16"
                >
                  {/* Numbered Circle */}
                  <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-gold text-navy font-heading font-bold text-sm">
                    {step.number}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-6 h-6 text-navy" />
                    <h5 className="text-navy">{step.title}</h5>
                  </div>
                  <p className="text-text-secondary text-sm">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
