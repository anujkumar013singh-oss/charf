import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLenis } from '@/context/LenisContext'

const LOGO_URL = 'https://ik.imagekit.io/vxqem8zrj/Screenshot_from_2026-05-06_16-18-08-removebg-preview%20(1).png?updatedAt=1778064700322'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Certifications', href: '#certifications' },
]

const companyLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Mission', href: '#mission' },
  { label: 'Policy', href: '#policy' },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { scrollTo, stop, start } = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      stop()
    } else {
      start()
    }
  }, [mobileMenuOpen, stop, start])

  const handleNavClick = (href) => {
    scrollTo(href)
    setMobileMenuOpen(false)
    setCompanyDropdownOpen(false)
  }

  const isActive = (href) => {
    const sectionId = href.replace('#', '')
    return activeSection === sectionId
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[9999] px-6 lg:px-12 py-4"
        initial={{ background: 'transparent' }}
        animate={{
          background: scrolled ? 'rgba(12, 35, 64, 0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}
            className="flex items-center gap-3 text-white"
            whileHover={{ scale: 1.02 }}
          >
            <img src={LOGO_URL} alt="QAMS Global" className="w-20 h-20 object-contain" />
            <span className="font-logo text-4xl md:text-5xl text-white tracking-wider">
              QAMS <span className="text-gold">GLOBAL</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className={`relative text-white font-medium text-sm hover:text-gold transition-colors ${
                  isActive(link.href) ? 'text-gold' : ''
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold"
                  />
                )}
              </a>
            ))}

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyDropdownOpen(true)}
              onMouseLeave={() => setCompanyDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-white font-medium text-sm hover:text-gold transition-colors">
                Company
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {companyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-heavy py-2 min-w-[180px] overflow-hidden"
                  >
                    {companyLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                        className="block px-4 py-2 text-navy hover:bg-offwhite hover:border-l-2 hover:border-gold transition-all text-sm"
                      >
                        {link.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
              className={`relative text-white font-medium text-sm hover:text-gold transition-colors ${
                isActive('#contact') ? 'text-gold' : ''
              }`}
            >
              Contact Us
              {isActive('#contact') && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold"
                />
              )}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-gold p-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[9998] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-navy z-[9999] lg:hidden p-6"
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gold p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className={`text-white font-heading text-xl ${
                      isActive(link.href) ? 'text-gold' : 'hover:text-gold'
                    } transition-colors`}
                  >
                    {link.label}
                  </a>
                ))}

                {/* Company Section in Mobile */}
                <div className="border-t border-white/20 pt-4">
                  <span className="text-white/60 text-sm uppercase tracking-wider mb-3 block">
                    Company
                  </span>
                  {companyLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                      className="block text-white text-lg py-2 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                  className={`text-white font-heading text-xl ${
                    isActive('#contact') ? 'text-gold' : 'hover:text-gold'
                  } transition-colors`}
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
