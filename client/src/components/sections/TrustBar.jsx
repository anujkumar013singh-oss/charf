import { motion } from 'framer-motion'

const trustItems = [
  'UKA Forum Limited Accredited',
  'ASCB Member',
  'ISO 9001:2015',
  'ISO 14001:2015',
  'ISO 45001:2018',
  'Trusted Since 2014',
  '500+ Clients Certified',
  '15+ Countries',
]

export const TrustBar = () => {
  // Duplicate items for seamless loop
  const allItems = [...trustItems, ...trustItems, ...trustItems]

  return (
    <section id="trust" className="bg-navy py-[18px] overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ 
          duration: 25, 
          ease: 'linear', 
          repeat: Infinity 
        }}
      >
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-white text-sm font-medium tracking-wider mx-4"
              style={{ textShadow: '0 0 20px rgba(212, 160, 23, 0.3)' }}
            >
              {item}
            </span>
            <span className="text-gold mx-2">&#9670;</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
