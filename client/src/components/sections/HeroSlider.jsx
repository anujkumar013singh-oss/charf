import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@/context/LenisContext'

import 'swiper/css'
import 'swiper/css/effect-fade'

// 9 slides with centered text content + 2-line motto
const slides = [
  {
    bgImage: 'https://m.media-amazon.com/images/I/71rf-yB92VL._AC_UF1000,1000_QL80_.jpg',
    line1: 'EXCELLENCE CERTIFIED',
    line2: 'Your Journey to Quality Begins Here',
    line3: 'Internationally Recognized Standards for Global Success',
    motto1: 'QUALITY FIRST.',
    motto2: 'ALWAYS.',
  },
  {
    bgImage: 'https://www.isixsigma.com/wp-content/uploads/2018/11/shutterstock_1687550977-scaled.jpg',
    line1: 'PRECISION & QUALITY',
    line2: 'Building Trust Through Certification',
    line3: 'Empowering Businesses with ISO Standards Since 2014',
    motto1: 'TRUST BUILT.',
    motto2: 'STANDARDS MET.',
  },
  {
    bgImage: 'https://www.some.education/uploads/blogs/16879435297703.png',
    line1: 'KNOWLEDGE EMPOWERS',
    line2: 'Learn. Certify. Excel.',
    line3: 'Professional Training Programs for Industry Leaders',
    motto1: 'LEARN TODAY.',
    motto2: 'LEAD TOMORROW.',
  },
  {
    bgImage: 'https://images.squarespace-cdn.com/content/v1/5951cc071b10e3977f15d46a/ee37d124-498b-4814-b7b0-06fcc88188b1/how-customer-satisfaction-drives-long-term-success.jpg',
    line1: 'CUSTOMER FIRST',
    line2: 'Satisfaction Through Quality Standards',
    line3: 'Transforming Customer Experience with ISO 9001',
    motto1: 'HAPPY CUSTOMERS.',
    motto2: 'BETTER BUSINESS.',
  },
  {
    bgImage: 'https://www.themsrgroup.com/wp-content/uploads/2019/08/customer-experience-vs-customer-satisfaction.jpg',
    line1: 'EXPERIENCE MATTERS',
    line2: 'From Compliance to Excellence',
    line3: '500+ Companies Trust Our Certification Process',
    motto1: 'EXCELLENCE DRIVEN.',
    motto2: 'RESULTS PROVEN.',
  },
  {
    bgImage: 'https://ik.imagekit.io/vxqem8zrj/Screenshot_from_2026-05-06_16-18-08-removebg-preview%20(1).png?updatedAt=1778064700322',
    line1: 'QAMS GLOBAL',
    line2: 'Your Partner in Quality Assurance',
    line3: 'Comprehensive ISO Certification Services in India',
    motto1: 'GLOBAL STANDARDS.',
    motto2: 'LOCAL EXPERTISE.',
  },
  {
    bgImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920',
    line1: 'INDUSTRY LEADERSHIP',
    line2: '15+ Industries Served',
    line3: 'From Manufacturing to Healthcare, We Cover It All',
    motto1: 'INDUSTRY EXPERTS.',
    motto2: 'SECTOR SPECIALISTS.',
  },
  {
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920',
    line1: 'GLOBAL RECOGNITION',
    line2: 'Certificates Accepted Worldwide',
    line3: 'UKAS Accredited & ASCB Associated for International Credibility',
    motto1: 'WORLD-CLASS.',
    motto2: 'GLOBALLY TRUSTED.',
  },
  {
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920',
    line1: 'EXPERT TEAM',
    line2: '50+ Certified Auditors',
    line3: 'Highly Qualified Professionals with Decades of Experience',
    motto1: 'EXPERTS ON BOARD.',
    motto2: 'YOUR SUCCESS ASSURED.',
  },
]

const SplitTextWord = ({ text, className = '' }) => {
  return (
    <span className={className}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="word-wrapper inline-block overflow-hidden">
          <span className="word-inner inline-block">
            {word.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className="char inline-block"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
            {wordIndex < text.split(' ').length - 1 && '\u00A0'}
          </span>
        </span>
      ))}
    </span>
  )
}

export const HeroSlider = () => {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const contentRefs = useRef([])

  useEffect(() => {
    const activeContent = contentRefs.current[activeIndex]
    if (!activeContent) return

    const line1 = activeContent.querySelector('.reveal-line-1')
    const line2 = activeContent.querySelector('.reveal-line-2')
    const line3 = activeContent.querySelector('.reveal-line-3')
    const motto1 = activeContent.querySelector('.reveal-motto-1')
    const motto2 = activeContent.querySelector('.reveal-motto-2')
    const chars = activeContent.querySelectorAll('.char')
    const wordWrappers = activeContent.querySelectorAll('.word-wrapper')
    
    gsap.killTweensOf([line1, line2, line3, motto1, motto2, chars, wordWrappers])
    
    gsap.set(line1, { 
      opacity: 0, 
      y: 100, 
      rotateX: -45,
      filter: 'blur(20px)'
    })
    gsap.set(line2, { opacity: 0 })
    gsap.set(wordWrappers, { y: '100%' })
    gsap.set(line3, { 
      opacity: 0, 
      x: -80, 
      clipPath: 'inset(0 100% 0 0)'
    })
    gsap.set([motto1, motto2], {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotate: -5
    })

    const tl = gsap.timeline({ delay: 0.1 })

    tl.to(line1, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out',
    })

    tl.to(wordWrappers, {
      y: '0%',
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
    }, '-=0.6')

    tl.to(line3, {
      opacity: 1,
      x: 0,
      clipPath: 'inset(0 0% 0 0)',
      duration: 1,
      ease: 'power2.out',
    }, '-=0.4')

    tl.to(motto1, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.8,
      ease: 'back.out(1.4)',
    }, '-=0.3')

    tl.to(motto2, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.8,
      ease: 'back.out(1.4)',
    }, '-=0.5')

    return () => {
      tl.kill()
      gsap.killTweensOf([line1, line2, line3, motto1, motto2, chars, wordWrappers])
    }
  }, [activeIndex])

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        speed={1500}
        className="h-full w-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <div 
                className="absolute inset-0 bg-cover bg-center transform scale-110"
                style={{ 
                  backgroundImage: `url(${slide.bgImage})`,
                  filter: 'brightness(0.65)',
                }}
              />
              
              <div 
                className="absolute inset-0"
                style={{ 
                  background: 'linear-gradient(to bottom, rgba(12,35,64,0.75) 0%, rgba(12,35,64,0.5) 40%, rgba(12,35,64,0.85) 100%)'
                }}
              />

              <div 
                ref={(el) => contentRefs.current[index] = el}
                className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 text-center pt-16 md:pt-20"
              >
                <div className="overflow-hidden mb-6 sm:mb-8 md:mb-10 lg:mb-12 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[65%] mx-auto">
                  <p className="reveal-line-1 text-gold font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-[0.4em] sm:tracking-[0.5em] md:tracking-[0.6em] lg:tracking-[0.7em] uppercase font-extrabold will-change-transform">
                    {slide.line1}
                  </p>
                </div>

                <div className="overflow-hidden mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <h1 className="reveal-line-2 text-white font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black leading-[0.9] sm:leading-[0.95] will-change-transform">
                    <SplitTextWord text={slide.line2} />
                  </h1>
                </div>

                <div className="overflow-hidden max-w-[90%] sm:max-w-[85%] md:max-w-4xl lg:max-w-5xl mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                  <p className="reveal-line-3 text-white/90 font-body text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-relaxed will-change-transform">
                    {slide.line3}
                  </p>
                </div>

                <div className="overflow-hidden flex flex-col items-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-4">
                  <p className="reveal-motto-1 text-white/95 font-logo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] will-change-transform">
                    {slide.motto1}
                  </p>
                  <p className="reveal-motto-2 text-gold font-logo text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.3em] sm:tracking-[0.35em] md:tracking-[0.4em] will-change-transform">
                    {slide.motto2}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
