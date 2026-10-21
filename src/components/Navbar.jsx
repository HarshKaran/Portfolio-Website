import { useEffect, useState } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { profile } from '../data/content'
import './Navbar.css'

const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="container nav-inner">
        <a href="#home" className="nav-logo" onClick={() => setOpen(false)}>
          <span className="nav-logo-mark">{initials || '<>'}</span>
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {sections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <HiX /> : <HiMenuAlt4 />}
        </button>
      </nav>
    </header>
  )
}
