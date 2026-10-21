import { useRef } from 'react'
import { FiDownload, FiMapPin } from 'react-icons/fi'
import Reveal, { Stagger, StaggerItem } from './Reveal'
import SectionHead from './SectionHead'
import SectionBackground from './SectionBackground'
import useCountUp from '../hooks/useCountUp'
import { about, profile, education } from '../data/content'
import './About.css'

function Stat({ value, suffix, label }) {
  const decimals = Number.isInteger(value) ? 0 : 1
  const [display, ref] = useCountUp(value, { decimals })
  return (
    <div className="about-stat card" ref={ref}>
      <span className="about-stat-value grad-text">
        {display}
        {suffix}
      </span>
      <span className="about-stat-label">{label}</span>
    </div>
  )
}

export default function About() {
  const photoRef = useRef(null)

  // interactive 3D tilt on the photo frame
  const onMove = (e) => {
    const el = photoRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`
  }
  const onLeave = () => {
    const el = photoRef.current
    if (el) el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)'
  }

  const initials = profile.name.split(' ').map((w) => w[0]).join('')

  return (
    <section id="about" className="section">
      <SectionBackground variant="about" />
      <div className="container">
        <SectionHead eyebrow="01 — Intro" title={about.heading} />

        <div className="about-grid">
          {/* photo + resume */}
          <Reveal className="about-photo-col" variant="left">
            <div
              className="about-photo-frame"
              ref={photoRef}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <div className="about-photo-glow" />
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="about-photo" loading="lazy" decoding="async" width="280" height="340" />
              ) : (
                <div className="about-photo placeholder">
                  <span className="about-photo-initials">{initials}</span>
                  <span className="about-photo-hint">
                    Add your photo at <code>/public/assets/</code> and set
                    <code>profile.photo</code> in content.js
                  </span>
                </div>
              )}
            </div>

            <a href={profile.resumeUrl} download className="btn btn-primary about-resume">
              <FiDownload /> Download Résumé
            </a>
            <p className="about-loc"><FiMapPin /> {profile.location}</p>
          </Reveal>

          {/* text + stats */}
          <div className="about-content">
            <Reveal className="about-text" delay={0.1} variant="right">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <div className="about-edu card">
                <div className="about-edu-dot" />
                <div>
                  <p className="about-edu-degree">{education.degree}</p>
                  <p className="about-edu-school">{education.school}</p>
                  <p className="about-edu-meta">
                    {education.detail} · {education.period}
                  </p>
                </div>
              </div>
            </Reveal>

            <Stagger className="about-stats" gap={0.12}>
              {about.highlights.map((h) => (
                <StaggerItem key={h.label} variant="zoom">
                  <Stat value={h.value} suffix={h.suffix} label={h.label} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  )
}
