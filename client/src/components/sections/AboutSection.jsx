import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, Globe, Users, Star } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const values = [
  { icon: ShieldCheck, title: 'Independent & Impartial', description: 'Unbiased assessments ensuring credibility' },
  { icon: Globe, title: 'Globally Recognised', description: 'Certificates accepted worldwide' },
  { icon: Users, title: 'Customer Focused', description: 'Tailored solutions for your needs' },
  { icon: Star, title: 'Integrity in Everything', description: 'Ethical standards in all operations' },
]

export const AboutSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="bg-white py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="label-text block mb-3">Who We Are</span>
            <h2 className="text-navy mb-6">About QAMS Global</h2>
            
            <p className="text-text-secondary mb-4">
              Founded in 2014, QAMS Global has established itself as one of India's most trusted 
              certification bodies. We are an independent organization accredited by UKA Forum Limited 
              and associated with ASCB, providing globally recognised ISO certification services.
            </p>
            
            <p className="text-text-secondary mb-8">
              Our team of expert auditors and trainers work across 15+ industries, helping businesses 
              achieve compliance with international standards. With over 500 successful certifications 
              across India and 15+ countries, we bring experience, integrity, and excellence to 
              every engagement.
            </p>

            {/* Value Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                    <div className="flex items-start gap-2">
                      <Icon className="w-5 h-5 text-navy shrink-0" />
                      <div>
                        <h6 className="text-navy text-base font-semibold">{value.title}</h6>
                        <p className="text-text-muted text-xs">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 1.03 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden">
              <img
                src="https://www.cvent.com/sites/default/files/image/2025-05/Conference%20Planning%20Event%20-%20Cvent%20CONNECT%20Europe%202024.jpg"
                alt="QAMS Global Conference"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Gold accent box */}
            <div 
              className="absolute -bottom-5 -right-5 w-[60%] h-[60%] rounded-xl -z-10"
              style={{ background: '#D4A017', opacity: 0.12 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
