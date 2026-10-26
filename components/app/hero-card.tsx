'use client'

import { useRef, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import type { CardSeal } from '@/lib/app-content'
import { ExpandIcon, FlipIcon, PersonIcon } from './card-action-icons'

type CardImage = { small: string; large: string }

function SealRainbow({ seals }: { seals: readonly CardSeal[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {seals.map((s) => (
        <div
          key={`${s.x}-${s.y}`}
          className="seal-rainbow absolute overflow-hidden rounded-full mix-blend-hue"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.size}cqw`, height: `${s.size}cqw`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="seal-rainbow-band" style={{ '--seal-angle': `${s.angle}deg` } as React.CSSProperties} />
        </div>
      ))}
    </div>
  )
}

function CardFace({
  face,
  label,
  back = false,
  blurred = false,
  hiRes = false,
  seals,
}: {
  face: CardImage
  label: string
  back?: boolean
  blurred?: boolean
  hiRes?: boolean
  seals?: readonly CardSeal[]
}) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-[4.5cqw] [backface-visibility:hidden] ${back ? '[transform:rotateY(180deg)]' : ''} ${blurred ? 'bg-sky-100/40 blur-[5px]' : ''}`}
    >
      <img
        src={face.large}
        srcSet={`${face.small} 640w, ${face.large} 1100w`}
        sizes={hiRes ? '1100px' : '640px'}
        alt={label}
        draggable={false}
        decoding="async"
        className="size-full scale-[1.012] select-none object-cover"
      />
      {seals && !blurred && <SealRainbow seals={seals} />}
    </div>
  )
}

const circleBtn =
  'flex size-10 items-center justify-center rounded-full bg-brand-dark text-white transition hover:bg-brand-dark/80 active:scale-95 disabled:pointer-events-none'

const glassBtn =
  'flex size-11 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur transition hover:bg-white/40 active:scale-95'

const DOUBLE_TAP_MS = 350
const MAX_CARD_ZOOM = 2.4

const EDGE_OVERSHOOT = 28
const CARD_RATIO = 1.585

function getAppViewport() {
  const rotation = document.documentElement.getAttribute('data-forced-portrait')
  const { innerWidth, innerHeight } = window
  return rotation
    ? { width: Math.min(innerHeight, 448), height: innerWidth, rotation }
    : { width: Math.min(innerWidth, 448), height: innerHeight, rotation: null }
}

// The card is rotated 90deg, so its long side runs vertically on screen.
// Vertical pan may reach the screen centre; horizontal pan stops just past the screen edge.
function clampPan(pan: { x: number; y: number }, zoom: number) {
  const viewport = getAppViewport()
  const long = Math.min(viewport.height * 0.78, window.innerWidth * 1.4, 640)
  const short = long / CARD_RATIO
  const ease = Math.min(1, Math.max(0, (zoom - 1) / 0.5))
  const maxY = (long * zoom * ease) / 2
  const maxX = Math.max(0, (short * zoom - viewport.width) / 2 + EDGE_OVERSHOOT) * ease
  return {
    x: Math.max(-maxX, Math.min(maxX, pan.x)),
    y: Math.max(-maxY, Math.min(maxY, pan.y)),
  }
}

function toContentDelta(dx: number, dy: number) {
  const rotation = document.documentElement.getAttribute('data-forced-portrait')
  if (rotation === 'cw') return { x: dy, y: -dx }
  if (rotation === 'ccw') return { x: -dy, y: dx }
  return { x: dx, y: dy }
}

type Props = { card: { expandLabel: string; infoLabel: string; front: CardImage; back: CardImage; seals: readonly CardSeal[] }; onOpenInfo: () => void; locked?: boolean; onRequestUnlock?: () => void }

export function HeroCard({ card, onOpenInfo, locked = false, onRequestUnlock }: Props) {
  const [flipped, setFlipped] = useState(false)
  const flip = () => setFlipped((f) => !f)
  const [expanded, setExpanded] = useState(false)
  const [expandedFlipped, setExpandedFlipped] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const touchRef = useRef({ distance: 0, zoom: 1, x: 0, y: 0, panX: 0, panY: 0, pinching: false, moved: false })
  const flipExpanded = () => setExpandedFlipped((f) => !f)

  const openExpanded = () => {
    setExpandedFlipped(false)
    setZoom(1)
    setPan({ x: 0, y: 0 })
    touchRef.current.moved = false
    setExpanded(true)
  }

  const lastTapRef = useRef(0)

  function handleCardTap(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('button, input, [contenteditable]')) return
    const now = Date.now()
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      lastTapRef.current = 0
      flip()
      openExpanded()
      return
    }
    lastTapRef.current = now
    flip()
  }

  function handleExpandedTap(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('button, input, [contenteditable]') || touchRef.current.moved) return
    flipExpanded()
  }

  function handleExpandedTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    if (e.touches.length === 2) {
      const [first, second] = [e.touches[0], e.touches[1]]
      touchRef.current = {
        ...touchRef.current,
        distance: Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY),
        zoom,
        pinching: true,
        moved: false,
      }
    } else if (e.touches.length === 1) {
      touchRef.current = { ...touchRef.current, x: e.touches[0].clientX, y: e.touches[0].clientY, panX: pan.x, panY: pan.y, pinching: false, moved: false }
    }
  }

  function handleExpandedTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (e.touches.length === 2) {
      e.preventDefault()
      const [first, second] = [e.touches[0], e.touches[1]]
      const distance = Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY)
      const nextZoom = Math.min(MAX_CARD_ZOOM, Math.max(1, touchRef.current.zoom * (distance / touchRef.current.distance)))
      touchRef.current.moved = true
      setZoom(nextZoom)
      setPan((currentPan) => clampPan(currentPan, nextZoom))
    } else if (e.touches.length === 1 && zoom > 1 && !touchRef.current.pinching) {
      e.preventDefault()
      touchRef.current.moved = true
      const delta = toContentDelta(e.touches[0].clientX - touchRef.current.x, e.touches[0].clientY - touchRef.current.y)
      setPan(clampPan({ x: touchRef.current.panX + delta.x, y: touchRef.current.panY + delta.y }, zoom))
    }
  }

  function handleExpandedTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    touchRef.current.distance = 0
    if (e.touches.length === 1) {
      // One finger stays down after a pinch: restart panning from here so the card does not jump.
      touchRef.current = { ...touchRef.current, x: e.touches[0].clientX, y: e.touches[0].clientY, panX: pan.x, panY: pan.y, pinching: true }
    } else if (e.touches.length === 0) {
      touchRef.current.pinching = false
    }
  }

  const renderCard = ({
    style,
    onTap,
    hiRes = false,
    isFlipped,
  }: {
    style?: React.CSSProperties
    onTap?: (e: React.MouseEvent) => void
    hiRes?: boolean
    isFlipped: boolean
  }) => (
    <div
      className={`relative [container-type:inline-size] [perspective:1200px] ${onTap ? 'cursor-pointer' : ''}`}
      style={style}
      onClick={onTap}
    >
      <div
        className="relative aspect-[1.585/1] w-full shadow-xl transition-transform duration-[1100ms] ease-in-out [transform-style:preserve-3d]"
        style={{ transform: `rotateY(${isFlipped ? -180 : 0}deg)`, borderRadius: '4.5cqw' }}
      >
        <CardFace face={card.front} label="บัตรด้านหน้า" blurred={locked} hiRes={hiRes} seals={card.seals} />
        <CardFace face={card.back} label="บัตรด้านหลัง" back blurred={locked} hiRes={hiRes} />
      </div>
      {locked && (
        <button
          type="button"
          onClick={onRequestUnlock}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-[4.5cqw] bg-sky-100/10 text-[#4b4b4b] transition active:scale-[.98]"
          aria-label="คลิกเพื่อแสดงบัตร"
        >
          <svg className="size-12" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M20 28V19a12 12 0 0 1 24 0v9" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M15 25h34a5 5 0 0 1 5 5v21a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5V30a5 5 0 0 1 5-5ZM32 35a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
            />
          </svg>
          <span className="text-xl font-bold">คลิกเพื่อแสดงบัตร</span>
        </button>
      )}
    </div>
  )

  return (
    <div className="px-5 pt-4">
      {renderCard({ onTap: handleCardTap, isFlipped: flipped })}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button type="button" onClick={onOpenInfo} disabled={locked} aria-label={card.infoLabel} className={circleBtn}>
          <PersonIcon className="size-[22px]" />
        </button>
        <button
          type="button"
          onClick={() => openExpanded()}
          disabled={locked}
          className="flex h-11 items-center gap-2 rounded-full bg-brand-dark pl-7 pr-6 text-base text-white transition hover:bg-brand-dark/80 active:scale-95 disabled:pointer-events-none"
        >
          <ExpandIcon className="size-5" />
          <span>{card.expandLabel}</span>
        </button>
        <button type="button" onClick={flip} disabled={locked} aria-label="พลิกบัตร" className={circleBtn}>
          <FlipIcon className="size-[22px]" />
        </button>
      </div>

      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={card.expandLabel}
          className="fixed inset-0 z-50 mx-auto flex max-w-md items-center justify-center overflow-hidden bg-neutral-900/60 backdrop-blur-[2px] touch-none [overscroll-behavior:none] [touch-action:none]"
          onTouchStart={handleExpandedTouchStart}
          onTouchMove={handleExpandedTouchMove}
          onTouchEnd={handleExpandedTouchEnd}
        >
          <div className="absolute inset-x-5 top-[max(env(safe-area-inset-top),1.25rem)] z-10 flex justify-between">
            <button type="button" onClick={() => setExpanded(false)} aria-label="ย้อนกลับ" className={glassBtn}>
              <ChevronLeft className="size-8" strokeWidth={2.5} />
            </button>
            <button type="button" onClick={flipExpanded} aria-label="พลิกบัตร" className={glassBtn}>
              <FlipIcon className="size-7" />
            </button>
          </div>
          <div
            className="touch-none [will-change:transform]"
            style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom}) rotate(90deg)`, transformOrigin: 'center' }}
          >
            {renderCard({
              style: { width: 'min(calc(var(--app-h, 100dvh) * 0.78), 140vw, 40rem)' },
              onTap: handleExpandedTap,
              hiRes: true,
              isFlipped: expandedFlipped,
            })}
          </div>
        </div>
      )}
    </div>
  )
}
