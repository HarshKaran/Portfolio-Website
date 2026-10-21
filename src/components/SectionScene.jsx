import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import TechTiles from './TechTiles'

const CYAN = '#22d3ee'
const PURPLE = '#a855f7'

// shared normalized pointer (-1..1); canvases are pointer-events:none so track on window
const pointer = { x: 0, y: 0 }
window.addEventListener(
  'pointermove',
  (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1
  },
  { passive: true }
)

// whole scene leans gently toward the cursor
function Parallax({ children, strength = 0.18 }) {
  const ref = useRef()
  useFrame(() => {
    const g = ref.current
    g.rotation.y += (pointer.x * strength - g.rotation.y) * 0.05
    g.rotation.x += (pointer.y * strength - g.rotation.x) * 0.05
  })
  return <group ref={ref}>{children}</group>
}

// continuous spin + vertical bob
function Spin({ children, position, speed = [0.15, 0.2], float = 0.3, phase = 0, scale = 1 }) {
  const ref = useRef()
  useFrame(({ clock }, delta) => {
    const m = ref.current
    m.rotation.x += delta * speed[0]
    m.rotation.y += delta * speed[1]
    m.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6 + phase) * float
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      {children}
    </group>
  )
}

function Wire({ color, opacity = 0.22 }) {
  return <meshBasicMaterial color={color} wireframe transparent opacity={opacity} depthWrite={false} />
}

// scale shapes down on narrow (mobile) viewports
function useFit() {
  const { width, height } = useThree((s) => s.viewport)
  return { w: width, h: height, k: Math.min(1, width / 12) }
}

/* ---------------- About: floating wireframe solids ---------------- */
function AboutScene() {
  const { w, h, k } = useFit()
  return (
    <Parallax>
      <Spin position={[w * 0.36, h * 0.12, -1]} speed={[0.08, 0.14]} scale={k}>
        <mesh><icosahedronGeometry args={[2.3, 1]} /><Wire color={CYAN} /></mesh>
      </Spin>
      <Spin position={[-w * 0.4, -h * 0.28, -2]} speed={[0.2, 0.1]} phase={2} scale={k}>
        <mesh><torusGeometry args={[1.1, 0.38, 14, 42]} /><Wire color={PURPLE} opacity={0.2} /></mesh>
      </Spin>
      <Spin position={[-w * 0.3, h * 0.32, -3]} speed={[0.25, 0.3]} phase={4} scale={k}>
        <mesh><octahedronGeometry args={[0.8]} /><Wire color={CYAN} opacity={0.28} /></mesh>
      </Spin>
    </Parallax>
  )
}

/* ---------------- Skills: orbiting gyroscope rings ---------------- */
function Ring({ radius, tilt, speed, color }) {
  const ref = useRef()
  useFrame((_, d) => { ref.current.rotation.z += d * speed })
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.012, 6, 140]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} depthWrite={false} />
        </mesh>
        {/* satellite riding the ring */}
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  )
}

function SkillsScene() {
  const { w, k } = useFit()
  const core = useRef()
  useFrame((_, d) => { core.current.rotation.y += d * 0.15 })
  return (
    <Parallax>
      <group ref={core} position={[-w * 0.36, 0, -2]} scale={k}>
        <Ring radius={2.6} tilt={[1.2, 0, 0]} speed={0.4} color={CYAN} />
        <Ring radius={2.2} tilt={[0.3, 0.9, 0]} speed={-0.55} color={PURPLE} />
        <Ring radius={1.8} tilt={[-0.6, -0.5, 0.4]} speed={0.7} color={CYAN} />
        <mesh><icosahedronGeometry args={[0.55, 0]} /><Wire color={PURPLE} opacity={0.45} /></mesh>
      </group>
    </Parallax>
  )
}

/* ---------------- Experience: rotating DNA helix ---------------- */
function ExperienceScene() {
  const { w, h, k } = useFit()
  const ref = useRef()
  const N = 90
  const span = h * 0.9

  const { points, colors, rungs } = useMemo(() => {
    const points = new Float32Array(N * 2 * 3)
    const colors = new Float32Array(N * 2 * 3)
    const rungs = []
    const a = new THREE.Color(CYAN)
    const b = new THREE.Color(PURPLE)
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1)
      const y = (t - 0.5) * span
      const ang = t * Math.PI * 7
      const p1 = [Math.cos(ang) * 1.3, y, Math.sin(ang) * 1.3]
      const p2 = [Math.cos(ang + Math.PI) * 1.3, y, Math.sin(ang + Math.PI) * 1.3]
      points.set(p1, i * 6)
      points.set(p2, i * 6 + 3)
      colors.set([a.r, a.g, a.b], i * 6)
      colors.set([b.r, b.g, b.b], i * 6 + 3)
      if (i % 3 === 0) rungs.push(...p1, ...p2)
    }
    return { points, colors, rungs: new Float32Array(rungs) }
  }, [span])

  useFrame((_, d) => { ref.current.rotation.y += d * 0.3 })

  return (
    <Parallax strength={0.1}>
      <group ref={ref} position={[w * 0.38, 0, -1]} scale={k} rotation={[0, 0, 0.12]}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={N * 2} array={points} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={N * 2} array={colors} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.11} vertexColors transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={rungs.length / 3} array={rungs} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color={CYAN} transparent opacity={0.15} depthWrite={false} />
        </lineSegments>
      </group>
    </Parallax>
  )
}

/* ---------------- Projects: drifting field of small solids ---------------- */
const GEOS = [
  <boxGeometry args={[0.7, 0.7, 0.7]} />,
  <tetrahedronGeometry args={[0.6]} />,
  <octahedronGeometry args={[0.55]} />,
  <icosahedronGeometry args={[0.5, 0]} />,
]

function ProjectsScene() {
  const { w, h, k } = useFit()
  const items = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        geo: GEOS[i % GEOS.length],
        color: i % 2 ? CYAN : PURPLE,
        pos: [(Math.random() - 0.5) * w * 1.1, (Math.random() - 0.5) * h, -1 - Math.random() * 5],
        speed: [0.1 + Math.random() * 0.4, 0.1 + Math.random() * 0.4],
        phase: Math.random() * Math.PI * 2,
        scale: (0.6 + Math.random() * 0.9) * k,
      })),
    [w, h, k]
  )
  return (
    <Parallax strength={0.25}>
      {items.map((it, i) => (
        <Spin key={i} position={it.pos} speed={it.speed} phase={it.phase} float={0.45} scale={it.scale}>
          <mesh>{it.geo}<Wire color={it.color} opacity={0.24} /></mesh>
        </Spin>
      ))}
    </Parallax>
  )
}

/* ---------------- Contact: undulating particle wave ---------------- */
function ContactScene() {
  const ref = useRef()
  const COLS = 70
  const ROWS = 32
  const GAP = 0.38

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COLS * ROWS * 3)
    const colors = new Float32Array(COLS * ROWS * 3)
    const a = new THREE.Color(CYAN)
    const b = new THREE.Color(PURPLE)
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const idx = (i * ROWS + j) * 3
        positions[idx] = (i - COLS / 2) * GAP
        positions[idx + 2] = (j - ROWS / 2) * GAP
        const c = a.clone().lerp(b, i / COLS)
        colors.set([c.r, c.g, c.b], idx)
      }
    }
    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.8
    const attr = ref.current.geometry.attributes.position
    const arr = attr.array
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i]
      const z = arr[i + 2]
      arr[i + 1] = Math.sin(x * 0.45 + t) * 0.45 + Math.cos(z * 0.6 + t * 0.7) * 0.35
    }
    attr.needsUpdate = true
  })

  return (
    <Parallax strength={0.08}>
      <points ref={ref} position={[0, -2.6, -2]} rotation={[0.35, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COLS * ROWS} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={COLS * ROWS} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </Parallax>
  )
}

const SCENES = {
  about: AboutScene,
  skills: SkillsScene,
  experience: ExperienceScene,
  projects: ProjectsScene,
  contact: ContactScene,
}

export default function SectionScene({ variant, active }) {
  const Scene = SCENES[variant]
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 1.5]}
      // render only while the section is on screen; a single still frame for reduced motion
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Scene />
      <Parallax strength={0.12}>
        <TechTiles variant={variant} />
      </Parallax>
    </Canvas>
  )
}
