import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { User, Mail, Phone, Building, Loader2, CheckCircle, AlertCircle, MapPin, Clock, Globe, Share2 } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { submitContact } from '@/utils/api'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    content: 'C-46, Sector 10, Noida\nUttar Pradesh, India - 201301',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+91 120 491 7144\n+91 98765 43210',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@qamsglobal.com\nsupport@qamsglobal.com',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    content: 'Monday - Saturday\n9:00 AM - 6:00 PM IST',
  },
]

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Audit',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Name is required (min 2 characters)'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required'
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits'
    }
    
    if (!formData.message.trim() || formData.message.length < 20) {
      newErrors.message = 'Message is required (min 20 characters)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) {
      setIsError(true)
      setTimeout(() => setIsError(false), 500)
      return
    }

    setIsSubmitting(true)
    
    try {
      await submitContact(formData)
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
      setTimeout(() => setIsError(false), 500)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = (fieldName) => `
    w-full pl-12 pr-4 py-3.5 rounded-lg border bg-white
    focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all
    ${errors[fieldName] 
      ? 'border-error focus:border-error' 
      : 'border-border-light focus:border-gold'
    }
  `

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <CheckCircle className="w-16 h-16 text-success mb-4" />
        </motion.div>
        <h4 className="text-navy mb-2">Thank you!</h4>
        <p className="text-text-secondary">
          We'll be in touch within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      animate={isError ? { x: [0, -8, 8, -8, 8, 0] } : {}}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
      >
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses('name')}
          />
        </div>
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-error text-sm mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses('email')}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-error text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses('phone')}
            />
          </div>
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-error text-sm mt-1"
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Company & Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              className={inputClasses('company')}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-lg border border-border-light bg-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          >
            <option value="Audit">Audit</option>
            <option value="Training">Training</option>
            <option value="Certification">Certification</option>
            <option value="Other">Other</option>
          </select>
        </motion.div>
      </div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <textarea
          name="message"
          rows={5}
          placeholder="Your Message (min 20 characters)"
          value={formData.message}
          onChange={handleChange}
          className={`${inputClasses('message')} resize-none`}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-error text-sm mt-1"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 bg-navy text-white font-heading font-semibold rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <span>&rarr;</span>
          </>
        )}
      </motion.button>
    </motion.form>
  )
}

export const ContactSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="bg-white py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeading
          label="Get in Touch"
          title="Contact Us"
          subtitle="Ready to start your certification journey? Reach out to our team for a free consultation."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>

          {/* Right Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h6 className="text-navy text-base mb-1">{info.title}</h6>
                      <p className="text-text-secondary text-sm whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-card mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.208449129092!2d77.3266213755105!3d28.61391598499998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5e318a28d3d%3A0x5b7b6b32a9f8c5f9!2sSector%2010%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="QAMS Global Office Location"
              />
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-offwhite flex items-center justify-center text-navy hover:bg-gold hover:text-navy transition-colors"
                title="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-offwhite flex items-center justify-center text-navy hover:bg-gold hover:text-navy transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
