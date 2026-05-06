import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'

// QAMS Global testimonials - ISO Certification specific
const testimonials = [
  {
    text: "QAMS Global guided us through the entire ISO 9001:2015 certification process. Professional, thorough, and incredibly supportive. Our clients now trust us even more.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    name: "Rajesh Kumar",
    role: "Quality Manager",
  },
  {
    text: "We achieved ISO 45001 certification in under 3 months. The QAMS audit team was detailed, fair, and genuinely helpful. Highly recommended for any manufacturing firm.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    name: "Priya Sharma",
    role: "HSE Head",
  },
  {
    text: "The ISO 27001 training provided by QAMS was world-class. Our IT team is now fully equipped to maintain our information security management system.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    name: "Amit Verma",
    role: "CTO",
  },
  {
    text: "QAMS helped us achieve ISO 14001 certification seamlessly. Their auditors understood our environmental challenges and provided practical solutions.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    name: "Neha Gupta",
    role: "Sustainability Director",
  },
  {
    text: "The certification process was smooth and transparent. QAMS Global's expertise in ISO 22000 helped us meet food safety standards effortlessly.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    name: "Vikram Singh",
    role: "Operations Head",
  },
  {
    text: "Outstanding service! QAMS Global made our ISO 13485 certification journey straightforward. Their medical device expertise is truly commendable.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    name: "Dr. Ananya Patel",
    role: "Regulatory Affairs Manager",
  },
  {
    text: "From documentation to final audit, QAMS provided exceptional support. Our ISO 50001 certification has significantly improved our energy management.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    name: "Rohan Mehta",
    role: "Plant Manager",
  },
  {
    text: "QAMS Global's training programs are excellent. Our internal auditors are now confident and competent, thanks to their comprehensive ISO courses.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    name: "Sneha Reddy",
    role: "HR Director",
  },
  {
    text: "The team at QAMS Global truly understands quality management. They helped us implement ISO 9001 with minimal disruption to our operations.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
    name: "Karthik Iyer",
    role: "Managing Director",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="bg-offwhite py-20 lg:py-28 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-gold/50 bg-gold/10 py-1 px-4 rounded-lg text-gold text-sm font-heading uppercase tracking-wider">
              Testimonials
            </div>
          </div>

          <h2 className="text-navy font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mt-5 text-center">
            What Our Clients Say
          </h2>
          <p className="text-center mt-5 text-text-secondary opacity-75">
            See how we've helped businesses achieve ISO certification excellence.
          </p>
        </motion.div>

        {/* Animated Columns */}
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};
