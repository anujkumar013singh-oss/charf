import { MapPin, Phone, Mail, Clock, Globe, Share2, ExternalLink } from 'lucide-react'
import { useLenis } from '@/context/LenisContext'

const LOGO_URL = 'https://ik.imagekit.io/vxqem8zrj/Screenshot_from_2026-05-06_16-18-08-removebg-preview%20(1).png?updatedAt=1778064700322'

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'About Us', href: '#about' },
  { label: 'Mission', href: '#mission' },
  { label: 'Policy', href: '#policy' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  'Quality Management (ISO 9001)',
  'Environmental (ISO 14001)',
  'OH&S (ISO 45001)',
  'Food Safety (ISO 22000)',
  'Information Security (ISO 27001)',
  'View All',
]

export const Footer = () => {
  const { scrollTo } = useLenis()

  const handleNavClick = (href) => {
    scrollTo(href)
  }

  return (
    <footer className="bg-footer border-t-4 border-gold">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo & About */}
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <img src={LOGO_URL} alt="QAMS Global" className="w-12 h-12 object-contain" />
              <span className="font-logo text-2xl text-white tracking-wider">
                QAMS <span className="text-gold">GLOBAL</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              India's most trusted ISO certification, audit, and training partner.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Globally recognised certification body based in Noida, India.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors" title="LinkedIn">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors" title="Share">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors" title="External">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-white font-heading font-semibold text-lg mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="text-gray-400 text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h5 className="text-white font-heading font-semibold text-lg mb-4">
              Our Services
            </h5>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#services') }}
                    className="text-gray-400 text-sm hover:text-gold transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h5 className="text-white font-heading font-semibold text-lg mb-4">
              Contact Info
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  C-46, Sector 10, Noida<br />
                  Uttar Pradesh, India - 201301
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span className="text-gray-400 text-sm">
                  +91 120 491 7144
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span className="text-gray-400 text-sm">
                  info@qamsglobal.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                <span className="text-gray-400 text-sm">
                  Mon - Sat: 9:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2025 QAMS Global. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              Made in India <span className="text-lg">&#127470;&#127475;</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
