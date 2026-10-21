import { motion } from 'framer-motion'
import './SectionHead.css'

// Animated section header: eyebrow fades, title clip-reveals word-free,
// and a gradient underline draws across as it enters view.
export default function SectionHead({ eyebrow, title, center = false }) {
  return (
    <div className={`section-head ${center ? 'center' : ''}`}>
      <motion.span
        className="section-eyebrow"
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow}
      </motion.span>

      <motion.h2
        className="section-title sh-title"
        initial={{ opacity: 0, y: 26, clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="sh-underline"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      />
    </div>
  )
}
