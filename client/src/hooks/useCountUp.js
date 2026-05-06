import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function useCountUp(end, duration = 2.5, suffix = '') {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const startTime = Date.now()
      const endTime = startTime + duration * 1000

      const tick = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (duration * 1000), 1)
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentCount = Math.floor(easeOut * end)
        
        setCount(currentCount)

        if (now < endTime) {
          requestAnimationFrame(tick)
        } else {
          setCount(end)
        }
      }

      requestAnimationFrame(tick)
    }
  }, [isInView, end, duration])

  return { count, ref, suffix }
}
