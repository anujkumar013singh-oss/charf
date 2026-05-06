import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGsapReveal(options = {}) {
  const ref = useRef(null)
  const { 
    y = 60, 
    duration = 0.9, 
    delay = 0, 
    ease = 'power3.out', 
    start = 'top 80%' 
  } = options

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none reverse',
        },
        y, 
        opacity: 0, 
        duration, 
        delay, 
        ease,
      })
    }, ref)
    
    return () => ctx.revert()
  }, [y, duration, delay, ease, start])

  return ref
}
