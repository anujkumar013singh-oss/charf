import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { useLenis } from '@/context/LenisContext'

const certifications = [
  { id: 'ISO 9001', year: '2015', name: 'QMS', description: 'Quality Management System for consistent product/service quality.', industries: ['Manufacturing', 'Services'] },
  { id: 'ISO 14001', year: '2015', name: 'EMS', description: 'Environmental Management System for sustainable operations.', industries: ['All Industries'] },
  { id: 'ISO 45001', year: '2018', name: 'OH&S', description: 'Occupational Health & Safety Management System.', industries: ['Construction', 'Manufacturing'] },
  { id: 'ISO 22000', year: '2005', name: 'Food Safety', description: 'Food Safety Management System for the food chain.', industries: ['Food & Beverage'] },
  { id: 'ISO 27001', year: '2013', name: 'InfoSec', description: 'Information Security Management System.', industries: ['IT', 'Finance'] },
  { id: 'ISO 13485', year: '2016', name: 'Medical', description: 'Medical Devices Quality Management System.', industries: ['Healthcare'] },
  { id: 'ISO 50001', year: '2011', name: 'Energy', description: 'Energy Management System for efficiency.', industries: ['Manufacturing', 'Energy'] },
  { id: 'ISO 29990', year: '2010', name: 'Learning', description: 'Learning Services Management System.', industries: ['Education'] },
  { id: 'CE Marking', year: '', name: 'CE', description: 'Conformity marking for products sold in EEA.', industries: ['Manufacturing', 'Medical'] },
  { id: 'HACCP', year: '', name: 'HACCP', description: 'Hazard Analysis Critical Control Points for food safety.', industries: ['Food & Beverage'] },
  { id: 'GMP', year: '', name: 'GMP', description: 'Good Manufacturing Practice certification.', industries: ['Pharmaceuticals', 'Food'] },
  { id: 'GDP', year: '', name: 'GDP', description: 'Good Distribution Practice for pharmaceuticals.', industries: ['Pharmaceuticals'] },
  { id: 'ROHS', year: '', name: 'ROHS', description: 'Restriction of Hazardous Substances directive.', industries: ['Electronics', 'Manufacturing'] },
  { id: 'Organic', year: '', name: 'Organic', description: 'Organic product certification.', industries: ['Agriculture', 'Food'] },
  { id: 'HALAL', year: '', name: 'HALAL', description: 'Halal certification for food and products.', industries: ['Food & Beverage'] },
]

const otherServices = [
  'Logo Registration',
  'Trademark',
  'IEC Certificate',
  'MSME Registration',
  'GST Registration',
  'Private Limited Company',
  'NSIC',
  'Software Development',
]

const CertificationCard = ({ cert, isExpanded, onToggle }) => {
  const { scrollTo } = useLenis()

  return (
    <motion.div
      layout
      className="bg-white rounded-xl border border-border-light overflow-hidden"
      whileHover={{ y: -6, boxShadow: 'var(--shadow-glow)' }}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <h5 className="text-navy">{cert.id}</h5>
            {cert.year && <span className="text-gold mono text-sm">:{cert.year}</span>}
          </div>
          <button className="text-gold">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-text-secondary text-sm mb-3">{cert.description}</p>
        <div className="flex flex-wrap gap-2">
          {cert.industries.map((industry) => (
            <Badge key={industry} variant="blue" size="sm">{industry}</Badge>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border-light bg-offwhite/50"
          >
            <div className="p-6">
              <p className="text-text-secondary text-sm mb-4">
                <strong className="text-navy">Full Description:</strong> {cert.description}
                This certification helps organizations demonstrate their ability to consistently provide products 
                and services that meet customer and regulatory requirements.
              </p>
              <p className="text-text-secondary text-sm mb-4">
                <strong className="text-navy">Scope:</strong> Applicable to all organizations regardless of type, 
                size, or industry. The standard provides a framework for effective quality management.
              </p>
              <button
                onClick={() => scrollTo('#contact')}
                className="text-gold font-medium text-sm hover:underline"
              >
                Apply for this Certification &rarr;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const CertificationsSection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  const filteredCerts = certifications.filter(cert => 
    cert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section 
      ref={sectionRef}
      id="certifications" 
      className="bg-offwhite py-20 lg:py-28 stripe-pattern"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeading
          label="Our Standards"
          title="Certifications We Offer"
          subtitle="Comprehensive ISO and industry-specific certifications to meet your compliance needs."
        />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="relative max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Filter certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border-light bg-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16"
        >
          <AnimatePresence>
            {filteredCerts.map((cert) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                isExpanded={expandedId === cert.id}
                onToggle={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCerts.length === 0 && (
          <p className="text-center text-text-muted mb-16">No certifications found matching your search.</p>
        )}

        {/* Other Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <h4 className="text-navy text-center mb-6">Other Services</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {otherServices.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <Badge variant="gold" size="md">{service}</Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
