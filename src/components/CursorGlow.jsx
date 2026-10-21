import { useEffect, useRef } from 'react'

// a soft glow that trails the cursor (desktop only)
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    // skip on touch / small screens, and for reduced-motion users
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const move = (e) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener('pointermove', move)

    let raf
    const loop = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      el.style.transform = `translate(${x}px, ${y}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '400px', height: '400px',
        marginLeft: '-200px', marginTop: '-200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.07), transparent 65%)',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen',
      }}
    />
  )
}
