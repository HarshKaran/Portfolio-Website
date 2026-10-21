import { Stagger, StaggerItem } from './Reveal'
import SectionHead from './SectionHead'
import SectionBackground from './SectionBackground'
import TiltCard from './TiltCard'
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi'
import { projects } from '../data/content'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionBackground variant="projects" />
      <div className="container">
        <SectionHead eyebrow="04 — Work" title="Featured Projects" />

        <Stagger className="projects-grid" gap={0.14}>
          {projects.map((p) => (
            <StaggerItem key={p.title} variant="zoom">
              <TiltCard className={`project-card card ${p.featured ? 'featured' : ''}`}>
                {p.featured && (
                  <span className="project-badge"><FiStar /> Featured</span>
                )}
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <ul className="project-tags">
                  {p.tags.map((t) => (
                    <li key={t} className="chip">{t}</li>
                  ))}
                </ul>
                <div className="project-links">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FiExternalLink /> Live
                    </a>
                  )}
                  {p.source && (
                    <a href={p.source} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FiGithub /> Code
                    </a>
                  )}
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
