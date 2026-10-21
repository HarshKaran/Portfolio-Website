import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowDown } from 'react-icons/hi'
import { FiMapPin } from 'react-icons/fi'
import Socials from './Socials'
import { profile } from '../data/content'
import './Hero.css'

// three.js is the bulk of the bundle — load it after the page text renders
const ParticleField = lazy(() => import('./ParticleField'))

// typewriter cycling through roles
function useTypewriter(words, speed = 90, pause = 1400) {
  const [text, setText] = useState('')
  const i = useRef(0)
  const del = useRef(false)

  useEffect(() => {
    let timeout
    const tick = () => {
      const full = words[i.current % words.length]
      const next = del.current
        ? full.slice(0, text.length - 1)
        : full.slice(0, text.length + 1)
      setText(next)

      if (!del.current && next === full) {
        timeout = setTimeout(() => { del.current = true; tick() }, pause)
        return
      }
      if (del.current && next === '') {
        del.current = false
        i.current += 1
      }
      timeout = setTimeout(tick, del.current ? speed / 1.8 : speed)
    }
    timeout = setTimeout(tick, speed)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return text
}

export default function Hero() {
  const role = useTypewriter(profile.roles)

  return (
    <section id="home" className="hero">
      <div className="hero-canvas-wrap">
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
        <div className="hero-canvas-fade" />
      </div>

      <div className="container hero-inner">
        <motion.p
          className="hero-greeting"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="grad-text">{profile.name}</span>
        </motion.h1>

        <motion.h2
          className="hero-role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {role}
          <span className="cursor">|</span>
        </motion.h2>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="hero-location"><FiMapPin /> {profile.location}</span>
        </motion.div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href={profile.resumeUrl} download className="btn btn-ghost">Download Résumé</a>
          <a href="#contact" className="btn btn-ghost">Get in Touch</a>
        </motion.div>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Socials size="md" />
        </motion.div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to about">
        <HiArrowDown />
      </a>
    </section>
  )
}
