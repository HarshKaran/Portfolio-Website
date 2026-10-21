import { useEffect, useState } from 'react'

// thin gradient bar at the very top showing page scroll progress
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight)
      setPct(Math.min(scrolled * 100, 100))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        height: '3px',
        width: `${pct}%`,
        background: 'linear-gradient(90deg, #22d3ee, #a855f7)',
        boxShadow: '0 0 10px rgba(34,211,238,0.6)',
        zIndex: 200,
        transition: 'width 0.1s linear',
      }}
    />
  )
}
