import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus, MessageCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLenis } from '@/context/LenisContext'

const faqs = [
  {
    question: 'What is ISO certification and why does my business need it?',
    answer: 'ISO certification proves your organisation meets internationally recognised standards for quality, safety, or environmental management. It builds customer trust, opens new market access, and improves internal efficiency. Certification demonstrates your commitment to excellence and can be a requirement for certain contracts and tenders.',
  },
  {
    question: 'How long does the QAMS certification process take?',
    answer: 'The timeline varies by standard and company size, but typically ranges from 4 to 12 weeks from application to certificate issuance. Our team works efficiently to minimise disruption to your operations. Simple certifications for small organisations may be completed faster, while complex multi-site certifications may take longer.',
  },
  {
    question: 'Which ISO standards does QAMS offer certification for?',
    answer: 'QAMS offers certification for ISO 9001 (Quality Management), ISO 14001 (Environmental Management), ISO 45001 (Occupational Health & Safety), ISO 22000 (Food Safety), ISO 27001 (Information Security), ISO 13485 (Medical Devices), ISO 50001 (Energy Management), ISO 29990 (Learning Services), CE Marking, HACCP, GMP, GDP, HALAL, and several more. Contact us for a complete list.',
  },
  {
    question: 'Is QAMS certification internationally recognised?',
    answer: 'Yes. QAMS Global is accredited by UKA Forum Limited and associated with ASCB, giving our certificates international recognition accepted by clients, regulators, and governments worldwide. Our certifications are valid for global trade and demonstrate compliance with international standards.',
  },
  {
    question: 'How can I verify if a certificate issued by QAMS is valid?',
    answer: 'Use the certificate verification tool on our website — simply enter the certificate number in the search box above to instantly view the full details, status, and validity of any QAMS-issued certificate. This helps employers, customers, and partners confirm the authenticity of certifications.',
  },
]

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
  const itemRef = useRef(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`border border-border-light rounded-lg overflow-hidden ${
        isOpen ? 'border-l-4 border-l-gold' : ''
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-offwhite transition-colors"
      >
        <span className="font-heading font-semibold text-navy pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-gold" />
          ) : (
            <Plus className="w-5 h-5 text-navy" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-offwhite/50"
          >
            <p className="p-5 text-text-secondary leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })
  const { scrollTo } = useLenis()

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section 
      ref={sectionRef}
      id="faq" 
      className="bg-white py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              label="FAQ"
              title="Frequently Asked Questions"
              subtitle="Find answers to common questions about our certification services and processes."
            />
            
            <div className="mt-8 p-6 bg-offwhite rounded-xl">
              <MessageCircle className="w-8 h-8 text-gold mb-3" />
              <h5 className="text-navy mb-2">Still have questions?</h5>
              <p className="text-text-secondary text-sm mb-4">
                Can't find the answer you're looking for? Please chat with our friendly team.
              </p>
              <button
                onClick={() => scrollTo('#contact')}
                className="text-gold font-medium hover:underline"
              >
                Contact Us &rarr;
              </button>
            </div>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
