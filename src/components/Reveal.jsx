import { motion } from 'framer-motion'

// Scroll-reveal with selectable direction / effect.
// variants: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur' | 'clip'
const build = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1 } },
  blur: {
    hidden: { opacity: 0, filter: 'blur(14px)', y: 24 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  clip: {
    hidden: { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
    show: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
  },
}

export default function Reveal({
  children,
  delay = 0,
  variant = 'up',
  duration = 0.7,
  className,
  once = true,
}) {
  return (
    <motion.div
      className={className}
      variants={build[variant] || build.up}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-70px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Stagger wrapper — children animate in sequence as the group enters view.
export function Stagger({ children, className, gap = 0.1, once = true }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-70px' }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  )
}

// A single staggered child (use inside <Stagger>).
export function StaggerItem({ children, className, variant = 'up' }) {
  return (
    <motion.div
      className={className}
      variants={build[variant] || build.up}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
