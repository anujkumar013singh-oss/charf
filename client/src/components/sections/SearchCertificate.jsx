import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Download, SearchX, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { searchCertificate } from '@/utils/api'

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-1/3" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
    <div className="h-4 bg-gray-200 rounded w-2/3" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
  </div>
)

const CertificateResult = ({ data }) => {
  const statusColors = {
    Active: 'green',
    Expired: 'red',
    Suspended: 'amber',
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const fields = [
    { label: 'Certificate Number', value: data.certNumber, isMono: true },
    { label: 'Organisation Name', value: data.orgName },
    { label: 'Standard', value: data.standard },
    { label: 'Address', value: data.address },
    { label: 'Scope', value: data.scope },
    { label: 'Issued On', value: formatDate(data.issuedOn) },
    { label: 'Expire On', value: formatDate(data.expireOn) },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="bg-white rounded-xl shadow-heavy border border-border-light overflow-hidden max-w-[680px] mx-auto"
    >
      {/* Header */}
      <div className="flex items-start gap-4 p-6 border-b border-border-light">
        <div className="w-1 bg-gold h-12 rounded-full" />
        <div className="flex-1">
          <div className="font-mono text-gold text-lg">{data.certNumber}</div>
          <Badge variant={statusColors[data.status] || 'blue'}>{data.status}</Badge>
        </div>
        <CheckCircle className="w-6 h-6 text-success" />
      </div>

      {/* Fields */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={field.label === 'Scope' || field.label === 'Address' ? 'sm:col-span-2' : ''}
            >
              <span className="text-text-muted text-xs uppercase tracking-wider block mb-1">
                {field.label}
              </span>
              <span className={`text-navy font-medium ${field.isMono ? 'font-mono text-gold' : ''}`}>
                {field.value || 'N/A'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-offwhite border-t border-border-light">
        <button className="flex items-center gap-2 text-navy hover:text-gold transition-colors">
          <Download className="w-5 h-5" />
          <span className="text-sm font-medium">Download/Print Certificate</span>
        </button>
      </div>
    </motion.div>
  )
}

const NotFoundState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="text-center py-12"
  >
    <SearchX className="w-16 h-16 text-text-muted mx-auto mb-4" />
    <h4 className="text-navy mb-2">No certificate found</h4>
    <p className="text-text-secondary text-sm max-w-md mx-auto">
      Please check the certificate number and try again, or contact us for assistance.
    </p>
  </motion.div>
)

export const SearchCertificate = () => {
  const [certNumber, setCertNumber] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const sectionRef = useRef(null)

  const handleSearch = async () => {
    if (!certNumber.trim()) return
    
    setIsLoading(true)
    setHasSearched(true)
    setResult(null)

    try {
      const data = await searchCertificate(certNumber.trim())
      setResult(data)
    } catch (error) {
      setResult({ found: false })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="search" 
      className="bg-offwhite py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-bg pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeading
          label="Verification"
          title="Verify a Certificate Instantly"
          subtitle="Enter any certificate number issued by QAMS Global to instantly verify its authenticity and current status."
          centered
        />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[680px] mx-auto mb-8"
        >
          <div 
            className={`
              relative flex items-center bg-white rounded-full h-16 shadow-card
              border-2 transition-colors duration-300 shimmer
              ${isFocused ? 'border-gold' : 'border-transparent'}
            `}
          >
            <Search className="w-6 h-6 text-text-muted ml-5" />
            <input
              type="text"
              placeholder="e.g. QAMS-ISO9001-2024-0001"
              value={certNumber}
              onChange={(e) => setCertNumber(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              className="flex-1 h-full px-4 bg-transparent border-none outline-none font-mono text-navy placeholder:text-text-muted"
            />
            <motion.button
              onClick={handleSearch}
              disabled={isLoading || !certNumber.trim()}
              whileHover={{ backgroundColor: '#D4A017', color: '#0C2340' }}
              className="h-12 px-6 mr-2 bg-navy text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Verify'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-[680px] mx-auto bg-white rounded-xl p-8 shadow-card"
            >
              <LoadingSkeleton />
            </motion.div>
          )}

          {!isLoading && hasSearched && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {result.found !== false ? (
                <CertificateResult data={result} />
              ) : (
                <NotFoundState />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
