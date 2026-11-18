'use client'

import { useEffect, useRef } from 'react'

export type HoloCardData = {
  number: string
  fullNameTh: string
  firstNameEn: string
  lastNameEn: string
  birthTh: string
  birthEn: string
  address: string
  issueTh: string
  issueEn: string
  expiryTh: string
  expiryEn: string
  photoCode: string
}

type FieldKey = Exclude<keyof HoloCardData, 'address'> | 'address1' | 'address2'

type Field = {
  id: string
  x: number
  y: number
  size: number
  fill: string
  stroke: number
  /** Static label text */
  text?: string
  /** Value taken from the card data */
  field?: FieldKey
  /** Right edge (in the 810x500 card space); longer values are squeezed to fit */
  maxRight?: number
}

const INK = '#111111'
const BLUE = '#263a79'

// Positions, sizes and colours live here; the words come from the card data (lib/app-content.ts).
const FIELDS: readonly Field[] = [
  { id: 'number', x: 346.7, y: 90.5, size: 44.4, fill: INK, stroke: 1.012, field: 'number', maxRight: 780 },
  { id: 'thai-name', x: 258, y: 146, size: 53, fill: INK, stroke: 1.208, field: 'fullNameTh', maxRight: 795 },
  { id: 'english-first', x: 339, y: 199.1, size: 38.4, fill: BLUE, stroke: 0.876, field: 'firstNameEn', maxRight: 780 },
  { id: 'english-last', x: 373.9, y: 226.2, size: 39.8, fill: BLUE, stroke: 0.907, field: 'lastNameEn', maxRight: 780 },
  { id: 'birth-th', x: 377.1, y: 272.8, size: 38, fill: INK, stroke: 0.866, field: 'birthTh', maxRight: 620 },
  { id: 'birth-en', x: 416.1, y: 302.2, size: 38, fill: BLUE, stroke: 0.866, field: 'birthEn', maxRight: 620 },
  { id: 'address-1', x: 95, y: 351, size: 35.8, fill: INK, stroke: 0.816, field: 'address1', maxRight: 612 },
  { id: 'address-2', x: 93.6, y: 383.3, size: 35.8, fill: INK, stroke: 0.816, field: 'address2', maxRight: 612 },
  { id: 'issue-th', x: 96, y: 415, size: 30, fill: INK, stroke: 0.684, field: 'issueTh', maxRight: 430 },
  { id: 'issue-label-th', x: 96, y: 436, size: 27, fill: INK, stroke: 0.616, text: 'วันออกบัตร' },
  { id: 'issue-en', x: 96, y: 464, size: 30, fill: BLUE, stroke: 0.684, field: 'issueEn', maxRight: 430 },
  { id: 'issue-label-en', x: 96, y: 482, size: 26.5, fill: BLUE, stroke: 0.604, text: 'Date of Issue' },
  { id: 'expiry-th', x: 439.4, y: 412.9, size: 30, fill: INK, stroke: 0.684, field: 'expiryTh', maxRight: 615 },
  { id: 'expiry-label-th', x: 438.9, y: 434.9, size: 27, fill: INK, stroke: 0.616, text: 'วันบัตรหมดอายุ' },
  { id: 'expiry-en', x: 439.6, y: 463.6, size: 30, fill: BLUE, stroke: 0.684, field: 'expiryEn', maxRight: 615 },
  { id: 'expiry-label-en', x: 439, y: 482.4, size: 26.5, fill: BLUE, stroke: 0.604, text: 'Date of Expiry' },
  { id: 'photo-code', x: 628.7, y: 458.9, size: 31.7, fill: INK, stroke: 0.723, field: 'photoCode', maxRight: 800 },
]

const THAI_MARKS = /[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/g
const ADDRESS_LINE_LENGTH = 46

// The address wraps onto two lines at a space, so a long address never runs under the portrait.
function splitAddress(address: string): [string, string] {
  const breakAt = address.indexOf('\n')
  if (breakAt !== -1) {
    return [address.slice(0, breakAt).trim(), address.slice(breakAt + 1).trim()]
  }
  const words = address.trim().split(/\s+/)
  let first = ''
  let i = 0
  for (; i < words.length; i++) {
    const next = first ? `${first} ${words[i]}` : words[i]
    if (first && next.replace(THAI_MARKS, '').length > ADDRESS_LINE_LENGTH) break
    first = next
  }
  return [first, words.slice(i).join(' ')]
}

function fieldText(f: Field, card: HoloCardData, address: [string, string]) {
  if (f.text) return f.text
  if (f.field === 'address1') return address[0]
  if (f.field === 'address2') return address[1]
  return f.field ? card[f.field] : ''
}

const HOLO_ITEMS = [
  { kind: 'seal', left: -1.6, top: 19, width: 12.8, rotate: 0 },
  { kind: 'seal', left: 22.2123, top: 25.5574, width: 14.7, rotate: 270 },
  { kind: 'seal', left: 45, top: 21.3897, width: 13.7, rotate: 180 },
  { kind: 'seal', left: 74.0891, top: 17.217, width: 14.8, rotate: 270 },
  { kind: 'seal', left: 63.6, top: 44.2, width: 15.1, rotate: 90 },
  { kind: 'seal', left: 42.1, top: 64.6, width: 14.5, rotate: 90 },
  { kind: 'seal', left: 14.7, top: 75.4, width: 12.9, rotate: 180 },
  { kind: 'seal', left: 60.6, top: 85.2, width: 14, rotate: 0 },
  { kind: 'txt', left: 30.9674, top: 25.5097, width: 13.5, rotate: 270 },
  { kind: 'txt', left: 83.3012, top: 17.5373, width: 14.2, rotate: 270 },
  { kind: 'txt', left: 54.2, top: 44.4, width: 14.6, rotate: 90 },
  { kind: 'txt', left: 33.2, top: 64.2, width: 13.8, rotate: 90 },
  { kind: 'txt', left: 14.6, top: 61.9, width: 12.8, rotate: 180 },
  { kind: 'txt', left: -1.1, top: 31.8, width: 11.76, rotate: 0 },
  { kind: 'txt', left: 60.8661, top: 98.9784, width: 13.7, rotate: 0 },
  { kind: 'txt', left: 45.63, top: 7.09, width: 13.45, rotate: 180 },
] as const

const SWEEP_SECONDS = 6
const HOLD_SECONDS = 3
const PERIOD = 70
const FRAME_MS = 32

const mod = (a: number, n: number) => ((a % n) + n) % n
const clamp = (v: number) => Math.max(-1, Math.min(1, v))

export const DEFAULT_PORTRAIT = '/images/alpha/portrait.png'
export const DEFAULT_BARCODE = '/images/alpha/barcode.svg'

type Props = { card: HoloCardData; portrait?: string; barcode?: string; className?: string }

export function HoloIdCard({ card, portrait = DEFAULT_PORTRAIT, barcode = DEFAULT_BARCODE, className = '' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const address = splitAddress(card.address)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let cancelled = false
    const fit = () => {
      if (cancelled) return
      root.querySelectorAll<SVGTextElement>('text[data-max-right]').forEach((node) => {
        node.removeAttribute('textLength')
        const room = Number(node.dataset.maxRight) - Number(node.getAttribute('x'))
        const width = node.getComputedTextLength()
        if (width > room) {
          node.setAttribute('textLength', String(room))
          node.setAttribute('lengthAdjust', 'spacingAndGlyphs')
        }
      })
    }
    fit()
    document.fonts?.ready.then(fit)
    return () => {
      cancelled = true
    }
  }, [card])

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
    let lastPaint = 0
    let lastKey = ''
    let raf = 0
    let onScreen = true

    const setPos = (nx: number, ny: number) => {
      target = (nx + ny) * 35
    }
    const onPointer = (e: PointerEvent) => setPos((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1)
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      setPos(clamp(e.gamma / 40), clamp((e.beta - 45) / 40))
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('deviceorientation', onTilt, { passive: true })

    const canRun = () => onScreen && !document.hidden
    const wake = () => {
      if (raf || !canRun()) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      wake()
    })
    observer.observe(root)
    document.addEventListener('visibilitychange', wake)

    const frame = (t: number) => {
      raf = 0
      if (!canRun()) return
      // The shimmer is slow, so 30fps looks identical and halves the repaint work.
      if (t - lastPaint < FRAME_MS) {
        raf = requestAnimationFrame(frame)
        return
      }
      lastPaint = t
      const dt = Math.min(0.1, (t - last) / 1000)
      last = t
      // While the card is being pinched or panned, keep the main thread free for the gesture.
      if (root.closest('[data-gesture]')) {
        raf = requestAnimationFrame(frame)
        return
      }
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
      // During the hold phase nothing moves, so skip the style writes that would force a repaint.
      const key = `${e.toFixed(4)}|${p.toFixed(4)}|${cur.toFixed(3)}`
      if (key !== lastKey) {
        lastKey = key
        nodes.forEach((node, k) => {
          const d = dirs[k]
          node.style.setProperty('--o', mod(d * e * PERIOD + cur, PERIOD).toFixed(3) + '%')
          node.style.setProperty('--s', (-d * Math.sin(Math.PI * p) * PERIOD * 0.5 - cur * 0.5).toFixed(2) + '%')
        })
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      raf = 0
      observer.disconnect()
      document.removeEventListener('visibilitychange', wake)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('deviceorientation', onTilt)
    }
  }, [])

  return (
    <div ref={rootRef} role="img" aria-label="บัตรประจำตัวประชาชน" className={`holo-card ${className}`}>
      <svg className="holo-card-overlay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 810 500" preserveAspectRatio="none" aria-hidden="true">
        <image x="15.8" y="174.67" width="54.4" height="297.67" preserveAspectRatio="none" href={barcode} />
        <image className={card.photoCode === '1040-02-04221656' ? 'holo-card-portrait-neutral' : undefined} x="624" y="240" width="162" height="202" preserveAspectRatio="xMidYMid slice" href={portrait} />
        {FIELDS.map((f) => (
          <text key={f.id} x={f.x} y={f.y} fontSize={f.size} fill={f.fill} stroke={f.fill} strokeWidth={f.stroke} data-max-right={f.maxRight}>
            {fieldText(f, card, address)}
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
