import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const SectionScene = lazy(() => import('./SectionScene'))

// Decorative 3D layer behind a section. The scene is created the first time the
// section nears the viewport, and only animates while it's on screen.
export default function SectionBackground({ variant }) {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting)
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin: '200px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="section-bg" aria-hidden>
      {mounted && (
        <Suspense fallback={null}>
          <SectionScene variant={variant} active={active} />
        </Suspense>
      )}
    </div>
  )
}
