import { motion } from 'framer-motion'
import { Stagger, StaggerItem } from './Reveal'
import SectionHead from './SectionHead'
import SectionBackground from './SectionBackground'
import { skills } from '../data/content'
import './Skills.css'

function SkillBar({ name, level, delay }) {
  return (
    <div className="skill-row">
      <div className="skill-row-top">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <SectionBackground variant="skills" />
      <div className="container">
        <SectionHead eyebrow="02 — Toolkit" title="Skills & Technologies" />

        <Stagger className="skills-grid" gap={0.12}>
          {skills.map((group) => (
            <StaggerItem key={group.category} variant="zoom">
              <div className="skill-card card">
                <h3 className="skill-cat">{group.category}</h3>
                <div className="skill-bars">
                  {group.items.map((item, j) => (
                    <SkillBar
                      key={item.name}
                      name={item.name}
                      level={item.level}
                      delay={j * 0.08}
                    />
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
