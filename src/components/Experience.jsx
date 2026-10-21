import Reveal, { Stagger, StaggerItem } from './Reveal'
import SectionHead from './SectionHead'
import SectionBackground from './SectionBackground'
import { FiAward } from 'react-icons/fi'
import { experience, achievements } from '../data/content'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionBackground variant="experience" />
      <div className="container">
        <SectionHead eyebrow="03 — Journey" title="Experience" />

        <div className="timeline">
          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 0.1} variant="right">
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-card card">
                  <div className="timeline-top">
                    <h3 className="timeline-role">{job.role}</h3>
                    <span className="timeline-period">{job.period}</span>
                  </div>
                  <p className="timeline-company grad-text">{job.company}</p>
                  <ul className="timeline-points">
                    {job.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                  <ul className="timeline-tags">
                    {job.tags.map((t) => (
                      <li key={t} className="chip">{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* achievements strip */}
        <div className="achievements">
          <Reveal variant="blur">
            <h3 className="achievements-title"><FiAward /> Achievements & Certifications</h3>
          </Reveal>
          <Stagger className="achievements-grid" gap={0.12}>
            {achievements.map((a, i) => (
              <StaggerItem key={i} variant="up">
                <div className="achievement card">
                  <span className="achievement-num grad-text">0{i + 1}</span>
                  <p>{a}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
