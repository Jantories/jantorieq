'use client'

import { useEffect, useRef } from 'react'

const FIELDS = [
  { id: 'number', x: 346.7, y: 90.5, size: 44.4, fill: '#111111', stroke: 1.012, text: '1 3099 03735 85 1' },
  { id: 'thai-name', x: 258, y: 146, size: 53, fill: '#111111', stroke: 1.208, text: 'นาย ไอย์ณพงศ์ ริ้วศรีกุล' },
  { id: 'english-first', x: 339, y: 199.1, size: 38.4, fill: '#263a79', stroke: 0.876, text: 'Mr. Ainapong' },
  { id: 'english-last', x: 373.9, y: 226.2, size: 39.8, fill: '#263a79', stroke: 0.907, text: 'Riewsrikul' },
  { id: 'birth-th', x: 377.1, y: 272.8, size: 38, fill: '#111111', stroke: 0.866, text: '19 พ.ย. 2549' },
  { id: 'birth-en', x: 416.1, y: 302.2, size: 38, fill: '#263a79', stroke: 0.866, text: '19 Nov. 2006' },
  { id: 'address-1', x: 95, y: 351, size: 35.8, fill: '#111111', stroke: 0.816, text: 'ที่อยู่ 376 ซ.มิตราภาพ 15 ต.ในเมือง อ.เมืองนครราชสีมา' },
  { id: 'address-2', x: 93.6, y: 383.3, size: 35.8, fill: '#111111', stroke: 0.816, text: 'จ.นครราชสีมา' },
  { id: 'issue-th', x: 96, y: 415, size: 30, fill: '#111111', stroke: 0.684, text: '19 ธ.ค. 2567' },
  { id: 'issue-label-th', x: 96, y: 436, size: 27, fill: '#111111', stroke: 0.616, text: 'วันออกบัตร' },
  { id: 'issue-en', x: 96, y: 464, size: 30, fill: '#263a79', stroke: 0.684, text: '19 Dec. 2024' },
  { id: 'issue-label-en', x: 96, y: 482, size: 26.5, fill: '#263a79', stroke: 0.604, text: 'Date of Issue' },
  { id: 'expiry-th', x: 439.4, y: 412.9, size: 30, fill: '#111111', stroke: 0.684, text: '18 พ.ย. 2576' },
  { id: 'expiry-label-th', x: 438.9, y: 434.9, size: 27, fill: '#111111', stroke: 0.616, text: 'วันบัตรหมดอายุ' },
  { id: 'expiry-en', x: 439.6, y: 463.6, size: 30, fill: '#263a79', stroke: 0.684, text: '18 Nov. 2033' },
  { id: 'expiry-label-en', x: 439, y: 482.4, size: 26.5, fill: '#263a79', stroke: 0.604, text: 'Date of Expiry' },
  { id: 'photo-code', x: 628.7, y: 458.9, size: 31.7, fill: '#111111', stroke: 0.723, text: '3001-02-12191346' },
] as const

const HOLO_ITEMS = [
  { kind: 'seal', left: -1.43, top: 18.83, width: 12.61, rotate: 0 },
  { kind: 'seal', left: 22.1, top: 22.51, width: 14.71, rotate: 0 },
  { kind: 'seal', left: 44.96, top: 21.56, width: 13.87, rotate: 0 },
  { kind: 'seal', left: 74.2, top: 17.74, width: 14.71, rotate: 0 },
  { kind: 'seal', left: 63.7, top: 44.34, width: 15.13, rotate: 0 },
  { kind: 'seal', left: 42.27, top: 64.39, width: 13.87, rotate: 0 },
  { kind: 'seal', left: 14.54, top: 75.31, width: 13.03, rotate: 0 },
  { kind: 'seal', left: 69.16, top: 86.63, width: 13.03, rotate: 0 },
  { kind: 'txt', left: 30.67, top: 27.97, width: 10.5, rotate: 90 },
  { kind: 'txt', left: 83.45, top: 20.46, width: 10.92, rotate: 90 },
  { kind: 'txt', left: 54.03, top: 44.34, width: 14.71, rotate: 90 },
  { kind: 'txt', left: 32.86, top: 64.12, width: 13.87, rotate: 90 },
  { kind: 'txt', left: 14.54, top: 62.07, width: 12.86, rotate: 180 },
  { kind: 'txt', left: -1.26, top: 31.65, width: 11.76, rotate: 0 },
  { kind: 'txt', left: 69.16, top: 99.86, width: 12.61, rotate: 0 },
  { kind: 'txt', left: 45.63, top: 7.09, width: 13.45, rotate: 180 },
] as const

const SWEEP_SECONDS = 6
const HOLD_SECONDS = 3
const PERIOD = 70

const mod = (a: number, n: number) => ((a % n) + n) % n
const clamp = (v: number) => Math.max(-1, Math.min(1, v))

export function HoloIdCard({ className = '' }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-holo]'))
    const dirs = nodes.map(() => 1)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let target = 0
    let cur = 0
    let clock = 0
    let lastCycle = -1
    let last = performance.now()
    let raf = 0

    const setPos = (nx: number, ny: number) => {
      target = (nx + ny) * 35
    }
    const onPointer = (e: PointerEvent) => setPos((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1)
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      setPos(clamp(e.gamma / 40), clamp((e.beta - 45) / 40))
    }
    window.addEventListener('pointermove', onPointer)
    window.addEventListener('deviceorientation', onTilt)

    const frame = (t: number) => {
      const dt = Math.min(0.1, (t - last) / 1000)
      last = t
      let p = 0
      let e = 0
      if (!reduce) {
        clock += dt
        const cycle = Math.floor(clock / (SWEEP_SECONDS + HOLD_SECONDS))
        if (cycle !== lastCycle) {
          lastCycle = cycle
          for (let i = 0; i < dirs.length; i++) dirs[i] = Math.random() < 0.5 ? 1 : -1
        }
        const phase = clock - cycle * (SWEEP_SECONDS + HOLD_SECONDS)
        p = phase < SWEEP_SECONDS ? phase / SWEEP_SECONDS : 1
        e = p * p * p * (p * (p * 6 - 15) + 10)
      }
      cur += (target - cur) * Math.min(1, dt * 2.5)
      nodes.forEach((node, k) => {
        const d = dirs[k]
        node.style.setProperty('--o', mod(d * e * PERIOD + cur, PERIOD).toFixed(3) + '%')
        node.style.setProperty('--s', (-d * Math.sin(Math.PI * p) * PERIOD * 0.5 - cur * 0.5).toFixed(2) + '%')
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('deviceorientation', onTilt)
    }
  }, [])

  return (
    <div ref={rootRef} role="img" aria-label="บัตรประจำตัวประชาชน" className={`holo-card ${className}`}>
      <svg className="holo-card-overlay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 810 500" preserveAspectRatio="none" aria-hidden="true">
        <image x="9.3" y="173.67" width="54.4" height="297.67" preserveAspectRatio="none" href="/images/alpha/barcode.svg" />
        <image x="624" y="240" width="162" height="202" preserveAspectRatio="xMidYMid slice" href="/images/alpha/portrait.png" />
        {FIELDS.map((f) => (
          <text key={f.id} x={f.x} y={f.y} fontSize={f.size} fill={f.fill} stroke={f.fill} strokeWidth={f.stroke}>
            {f.text}
          </text>
        ))}
      </svg>
      {HOLO_ITEMS.map((item, i) => (
        <div
          key={i}
          data-holo
          className={item.kind === 'seal' ? 'holo-seal' : 'holo-seal-text'}
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            width: `${item.width}%`,
            transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
          }}
        >
          <i className="holo-band" />
          <i className="holo-sheen" />
        </div>
      ))}
    </div>
  )
}
