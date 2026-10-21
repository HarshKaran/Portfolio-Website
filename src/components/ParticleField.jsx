import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 2600 }) {
  const pointsRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  // build a spherical cloud of particles
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const cyan = new THREE.Color('#22d3ee')
    const purple = new THREE.Color('#a855f7')

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const c = cyan.clone().lerp(purple, Math.random())
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  useFrame((state, delta) => {
    const g = pointsRef.current
    if (!g) return
    // slow continuous rotation
    g.rotation.y += delta * 0.045
    g.rotation.x += delta * 0.015
    // gentle parallax drift toward the pointer
    g.position.x += (mouse.current.x * 0.8 - g.position.x) * 0.04
    g.position.y += (-mouse.current.y * 0.8 - g.position.y) * 0.04
  })

  // track pointer (normalized -1..1)
  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleField() {
  // with reduced motion, render a single still frame instead of animating
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <Canvas
      className="particle-canvas"
      frameloop={reduced ? 'demand' : 'always'}
      camera={{ position: [0, 0, 14], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Particles />
    </Canvas>
  )
}
