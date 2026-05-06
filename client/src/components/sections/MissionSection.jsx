import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Scale, Lightbulb, Eye, Heart, Globe } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const coreValues = [
  { icon: Award, title: 'Quality', description: 'Excellence in every certification' },
  { icon: Scale, title: 'Integrity', description: 'Unwavering ethical standards' },
  { icon: Lightbulb, title: 'Innovation', description: 'Continuous improvement' },
  { icon: Eye, title: 'Transparency', description: 'Open and honest processes' },
  { icon: Heart, title: 'Customer Focus', description: 'Your success is our priority' },
  { icon: Globe, title: 'Global Standards', description: 'World-class certification' },
]

const TextGenerateEffect = ({ text, isInView }) => {
  const words = text.split(' ')
  
  return (
    <span>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ 
            duration: 0.4, 
            delay: index * 0.08,
            ease: 'easeOut'
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export const MissionSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      id="mission" 
      className="bg-footer py-20 lg:py-28"
    >
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        <SectionHeading
          label="Our Purpose"
          title="Mission & Vision"
          light
          centered
        />

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="border-l-4 border-gold pl-6 lg:pl-8 mb-16"
        >
          <span className="label-text block mb-3">Our Mission</span>
          <blockquote className="text-white text-xl lg:text-2xl font-heading leading-relaxed">
            <TextGenerateEffect 
              isInView={isInView}
              text="To provide world-class certification services that empower businesses to achieve internationally recognised quality, safety, and environmental standards — with integrity, independence, and excellence."
            />
          </blockquote>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="border-l-4 border-blue-mid pl-6 lg:pl-8 mb-16"
        >
          <span className="label-text block mb-3" style={{ color: '#3B82C4' }}>Our Vision</span>
          <blockquote className="text-white text-xl lg:text-2xl font-heading leading-relaxed">
            <TextGenerateEffect 
              isInView={isInView}
              text="To be India's most trusted and globally recognised certification body, known for our commitment to quality, our independence, and our impact on industries across the world."
            />
          </blockquote>
        </motion.div>

        {/* Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-white/5 rounded-lg p-6 text-center"
              >
                <Icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <h5 className="text-white mb-1">{value.title}</h5>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
