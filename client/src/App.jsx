import { LenisProvider } from '@/context/LenisContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSlider } from '@/components/sections/HeroSlider'
import { TrustBar } from '@/components/sections/TrustBar'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { CertificationsSection } from '@/components/sections/CertificationsSection'
import { IndustriesGrid } from '@/components/sections/IndustriesGrid'
import { AboutSection } from '@/components/sections/AboutSection'
import { MissionSection } from '@/components/sections/MissionSection'
import { SearchCertificate } from '@/components/sections/SearchCertificate'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQSection } from '@/components/sections/FAQSection'
import { PolicySection } from '@/components/sections/PolicySection'
import { CTABanner } from '@/components/sections/CTABanner'
import { ContactSection } from '@/components/sections/ContactSection'

function App() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-offwhite">
        <Navbar />
        
        <main>
          <HeroSlider />
          <TrustBar />
          <StatsSection />
          <ServicesSection />
          <HowItWorks />
          <CertificationsSection />
          <IndustriesGrid />
          <AboutSection />
          <MissionSection />
          <SearchCertificate />
          <Testimonials />
          <FAQSection />
          <PolicySection />
          <CTABanner />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </LenisProvider>
  )
}

export default App
