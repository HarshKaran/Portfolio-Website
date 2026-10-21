import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import {
  siReact, siTypescript, siJavascript, siPython, siNodedotjs, siMongodb, siTailwindcss,
  siRedux, siFastapi, siDocker, siGit, siGithub, siSupabase, siSocketdotio, siWebrtc,
  siRedis, siMysql, siGooglegemini, siVite, siLinux, siNpm, siChartdotjs, siGooglesheets,
  siPostman, siLeetcode,
} from 'simple-icons'

// Floating 3D tiles carrying tech logos (simple-icons) or code glyphs.
// Positions are fractions of the half-viewport: [x, y, z] → x * w/2, y * h/2.
const TILES = {
  about: [
    { icon: siGit, at: [0.82, 0.62, -1] },
    { icon: siGithub, at: [-0.86, 0.05, -2] },
    { text: '</>', at: [0.9, -0.55, -2] },
    { icon: siLinux, at: [-0.7, -0.75, -3] },
    { icon: siVite, at: [0.55, -0.15, -5] },
  ],
  skills: [
    { icon: siReact, at: [0.82, 0.6, -1] },
    { icon: siTypescript, at: [0.62, 0.1, -3] },
    { icon: siPython, at: [0.9, -0.35, -1.5] },
    { icon: siNodedotjs, at: [-0.85, 0.72, -2] },
    { icon: siTailwindcss, at: [0.7, -0.78, -2.5] },
    { icon: siMongodb, at: [-0.88, -0.7, -1.5] },
    { icon: siJavascript, at: [-0.2, 0.85, -4] },
  ],
  experience: [
    { icon: siFastapi, at: [-0.85, 0.55, -1.5] },
    { icon: siDocker, at: [-0.72, -0.1, -3] },
    { icon: siMysql, at: [-0.88, -0.65, -1.5] },
    { icon: siRedux, at: [0.88, 0.75, -2] },
    { icon: siChartdotjs, at: [0.9, -0.75, -2] },
    { text: '{ }', at: [-0.35, 0.85, -4] },
  ],
  projects: [
    { icon: siSocketdotio, at: [-0.86, 0.65, -1.5] },
    { icon: siWebrtc, at: [0.86, 0.62, -1.5] },
    { icon: siRedis, at: [-0.9, -0.3, -2] },
    { icon: siSupabase, at: [0.9, -0.2, -2] },
    { icon: siGooglegemini, at: [-0.6, -0.8, -3] },
    { icon: siGooglesheets, at: [0.65, -0.82, -3] },
  ],
  contact: [
    { icon: siPostman, at: [-0.85, 0.6, -1.5] },
    { icon: siNpm, at: [0.86, 0.55, -1.5] },
    { text: '=>', at: [-0.8, -0.35, -2.5] },
    { icon: siLeetcode, at: [0.82, -0.3, -2.5] },
  ],
}

const SIZE = 1.2
const TEX = 256

// rounded, bevelled tile geometry shared by every tile
let tileGeometry
function getGeometry() {
  if (tileGeometry) return tileGeometry
  const h = SIZE / 2
  const r = 0.22
  const s = new THREE.Shape()
  s.moveTo(-h + r, -h)
  s.lineTo(h - r, -h)
  s.quadraticCurveTo(h, -h, h, -h + r)
  s.lineTo(h, h - r)
  s.quadraticCurveTo(h, h, h - r, h)
  s.lineTo(-h + r, h)
  s.quadraticCurveTo(-h, h, -h, h - r)
  s.lineTo(-h, -h + r)
  s.quadraticCurveTo(-h, -h, -h + r, -h)
  tileGeometry = new THREE.ExtrudeGeometry(s, {
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 3,
    curveSegments: 8,
  })
  tileGeometry.center()
  return tileGeometry
}

// near-black brand colors (GitHub, Socket.io, ...) would vanish on the dark tile
function readable(hex) {
  const c = new THREE.Color(`#${hex}`)
  const lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b
  return lum < 0.2 ? '#e7e9f0' : `#${hex}`
}

const textureCache = new Map()
function getTexture(item) {
  const key = item.icon ? item.icon.slug : item.text
  if (textureCache.has(key)) return textureCache.get(key)

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = TEX
  const ctx = canvas.getContext('2d')

  // face + gradient rim
  ctx.fillStyle = '#0f0f1d'
  ctx.fillRect(0, 0, TEX, TEX)
  const rim = ctx.createLinearGradient(0, 0, TEX, TEX)
  rim.addColorStop(0, 'rgba(34,211,238,0.9)')
  rim.addColorStop(1, 'rgba(168,85,247,0.9)')
  ctx.strokeStyle = rim
  ctx.lineWidth = 7
  ctx.beginPath()
  ctx.roundRect(10, 10, TEX - 20, TEX - 20, 40)
  ctx.stroke()

  if (item.icon) {
    const color = readable(item.icon.hex)
    const scale = 5.4 // 24-unit viewBox → ~130px
    const offset = (TEX - 24 * scale) / 2
    ctx.save()
    ctx.shadowColor = color
    ctx.shadowBlur = 22
    ctx.translate(offset, offset)
    ctx.scale(scale, scale)
    ctx.fillStyle = color
    ctx.fill(new Path2D(item.icon.path))
    ctx.restore()
  } else {
    const grad = ctx.createLinearGradient(40, 0, TEX - 40, 0)
    grad.addColorStop(0, '#22d3ee')
    grad.addColorStop(1, '#a855f7')
    ctx.fillStyle = grad
    ctx.shadowColor = 'rgba(34,211,238,0.6)'
    ctx.shadowBlur = 20
    ctx.font = `800 ${item.text.length > 2 ? 92 : 112}px "JetBrains Mono", ui-monospace, monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(item.text, TEX / 2, TEX / 2 + 6)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  // extrude cap UVs are shape coords (-SIZE/2..SIZE/2) → remap to 0..1
  tex.repeat.set(1 / SIZE, 1 / SIZE)
  tex.offset.set(0.5, 0.5)
  textureCache.set(key, tex)
  return tex
}

const sideMaterial = new THREE.MeshStandardMaterial({
  color: '#1c1c34',
  metalness: 0.5,
  roughness: 0.35,
  transparent: true,
  opacity: 0.9,
})

function Tile({ item, position, scale, phase }) {
  const ref = useRef()
  const materials = useMemo(
    () => [
      new THREE.MeshBasicMaterial({ map: getTexture(item), transparent: true, opacity: 0.88 }),
      sideMaterial,
    ],
    [item]
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const m = ref.current
    // sway rather than spin, so the logo stays readable
    m.rotation.y = Math.sin(t * 0.5 + phase) * 0.55
    m.rotation.x = Math.sin(t * 0.4 + phase * 1.3) * 0.22
    m.rotation.z = Math.sin(t * 0.3 + phase) * 0.08
    m.position.y = position[1] + Math.sin(t * 0.7 + phase) * 0.25
  })

  return (
    <mesh ref={ref} geometry={getGeometry()} material={materials} position={position} scale={scale} />
  )
}

export default function TechTiles({ variant }) {
  const { width: w, height: h } = useThree((s) => s.viewport)
  const items = TILES[variant] || []
  const narrow = w < 7
  // on phones keep only a few tiles so they don't crowd the content
  const shown = narrow ? items.slice(0, 3) : items
  const k = Math.min(1, w / 12) * (narrow ? 0.8 : 1)

  return (
    <group>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 8]} intensity={1.6} />
      <pointLight position={[-6, -4, 4]} intensity={8} color="#a855f7" />
      {shown.map((item, i) => (
        <Tile
          key={item.icon ? item.icon.slug : item.text}
          item={item}
          position={[(item.at[0] * w) / 2, (item.at[1] * h) / 2, item.at[2]]}
          scale={k}
          phase={i * 1.7}
        />
      ))}
    </group>
  )
}
