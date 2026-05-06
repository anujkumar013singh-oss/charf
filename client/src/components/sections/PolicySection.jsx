import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const policies = [
  {
    id: 'quality',
    title: 'Quality Policy',
    content: {
      intro: 'QAMS Global is committed to providing certification services that consistently meet customer and applicable statutory and regulatory requirements. We strive to enhance customer satisfaction through the effective application of our management system.',
      commitments: [
        'Maintain impartiality and independence in all certification activities',
        'Provide competent personnel and adequate resources for effective service delivery',
        'Continuously improve our processes and services',
        'Ensure transparent and fair evaluation of all applicants',
        'Respond promptly and professionally to all customer inquiries',
      ],
    },
  },
  {
    id: 'environmental',
    title: 'Environmental Policy',
    content: {
      intro: 'QAMS Global recognises its responsibility to protect the environment and is committed to minimising the environmental impact of our operations. We promote sustainable practices in all aspects of our business.',
      commitments: [
        'Reduce paper consumption through digital documentation',
        'Minimise travel-related emissions through virtual audits where possible',
        'Promote environmental awareness among employees and stakeholders',
        'Comply with all applicable environmental regulations',
        'Set and review environmental objectives to drive continuous improvement',
      ],
    },
  },
  {
    id: 'ohs',
    title: 'OH&S Policy',
    content: {
      intro: 'QAMS Global is committed to providing a safe and healthy workplace for all employees, auditors, and visitors. We believe that all work-related injuries and illnesses are preventable.',
      commitments: [
        'Identify and assess workplace hazards to prevent accidents',
        'Provide appropriate training and resources for health and safety',
        'Encourage employee participation in health and safety matters',
        'Comply with all occupational health and safety legislation',
        'Continuously improve our OH&S performance through regular reviews',
      ],
    },
  },
  {
    id: 'impartiality',
    title: 'Impartiality Policy',
    content: {
      intro: 'QAMS Global operates with complete impartiality and independence. We understand that confidence in our certification system depends on the objectivity and integrity of our assessment processes.',
      commitments: [
        'Maintain independence from any organisation seeking or holding certification',
        'Ensure that commercial considerations never compromise impartiality',
        'Identify and manage any potential conflicts of interest',
        'Provide fair and equal treatment to all certification applicants',
        'Regularly review and report on impartiality to our governing board',
      ],
    },
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality Policy',
    content: {
      intro: 'QAMS Global respects the confidentiality of all information obtained during certification activities. We treat all client information as strictly confidential and protect it from unauthorized access.',
      commitments: [
        'Protect all client information from unauthorized disclosure',
        'Limit access to confidential information to authorized personnel only',
        'Obtain client consent before sharing information with third parties',
        'Maintain secure systems for storing and processing client data',
        'Ensure all personnel understand and comply with confidentiality requirements',
      ],
    },
  },
]

export const PolicySection = () => {
  const [activeTab, setActiveTab] = useState('quality')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  const activePolicy = policies.find(p => p.id === activeTab)

  return (
    <section 
      ref={sectionRef}
      id="policy" 
      className="bg-offwhite py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeading
          label="Commitments"
          title="Our Policies"
          centered
        />

        {/* Tab Navigation */}
        <div className="relative flex flex-wrap justify-center gap-2 mb-10">
          {policies.map((policy) => (
            <button
              key={policy.id}
              onClick={() => setActiveTab(policy.id)}
              className={`relative px-4 py-2 font-medium text-sm rounded-full transition-colors ${
                activeTab === policy.id
                  ? 'text-navy'
                  : 'text-text-secondary hover:text-navy'
              }`}
            >
              {activeTab === policy.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gold/20 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative">{policy.title}</span>
            </button>
          ))}
          
        </div>

        {/* Tab Content */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-8 lg:p-10 shadow-card"
            >
              <h3 className="text-navy mb-2">{activePolicy.title}</h3>
              <p className="text-text-muted text-sm mb-6">
                Last reviewed: January 2025
              </p>

              <p className="text-text-secondary leading-relaxed mb-6" style={{ maxWidth: '65ch', lineHeight: '1.85' }}>
                {activePolicy.content.intro}
              </p>

              <h5 className="text-navy mb-4">Our Commitments</h5>
              <ul className="space-y-3">
                {activePolicy.content.commitments.map((commitment, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{commitment}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
