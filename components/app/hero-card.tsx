'use client'

import { useRef, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { ExpandIcon, FlipIcon, PersonIcon } from './card-action-icons'

type CardImage = { small: string; large: string }

// Positions (% of card) of the Department of Provincial Administration seals in the card background
// x / y are the circle centre in % of the card, size is the diameter in % of the card width
const SEALS = [
  { x: 22.8, y: 26.2, size: 14.9 },
  { x: 45.1, y: 20, size: 12.6 },
  { x: 74.3, y: 18, size: 15.1 },
  { x: 63.1, y: 43, size: 15.4 },
  { x: 42.4, y: 65, size: 14.6 },
  { x: 61.5, y: 84.2, size: 14.1 },
  { x: 14.8, y: 74.5, size: 14.2 },
  { x: -1.4, y: 20, size: 11.4 },
]

function SealRainbow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SEALS.map((s) => (
        <div
          key={`${s.x}-${s.y}`}
          className="seal-rainbow absolute rounded-full mix-blend-hue"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.size}cqw`, height: `${s.size}cqw`, transform: 'translate(-50%, -50%)' }}
        />
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
  shimmer = false,
}: {
  face: CardImage
  label: string
  back?: boolean
  blurred?: boolean
  hiRes?: boolean
  shimmer?: boolean
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
      {shimmer && !blurred && <SealRainbow />}
    </div>
  )
}

const circleBtn =
  'flex size-10 items-center justify-center rounded-full bg-brand-dark text-white transition hover:bg-brand-dark/80 active:scale-95 disabled:pointer-events-none'

const glassBtn =
  'flex size-11 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur transition hover:bg-white/40 active:scale-95'

const DOUBLE_TAP_MS = 350

type Props = { card: { expandLabel: string; infoLabel: string; front: CardImage; back: CardImage }; onOpenInfo: () => void; locked?: boolean; onRequestUnlock?: () => void }

export function HeroCard({ card, onOpenInfo, locked = false, onRequestUnlock }: Props) {
  const [flipped, setFlipped] = useState(false)
  const flip = () => setFlipped((f) => !f)
  const [expanded, setExpanded] = useState(false)
  const [expandedFlipped, setExpandedFlipped] = useState(false)
  const flipExpanded = () => setExpandedFlipped((f) => !f)

  const openExpanded = (startFlipped = flipped) => {
    setExpandedFlipped(startFlipped)
    setExpanded(true)
  }

  const lastTapRef = useRef(0)

  function handleCardTap(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('button, input, [contenteditable]')) return
    const now = Date.now()
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      lastTapRef.current = 0
      flip()
      openExpanded(false)
      return
    }
    lastTapRef.current = now
    flip()
  }

  function handleExpandedTap(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('button, input, [contenteditable]')) return
    flipExpanded()
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
        <CardFace face={card.front} label="บัตรด้านหน้า" blurred={locked} hiRes={hiRes} shimmer />
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
          className="fixed inset-0 z-50 mx-auto flex max-w-md items-center justify-center overflow-hidden bg-neutral-900/60 backdrop-blur-[2px]"
        >
          <div className="absolute inset-x-5 top-[max(env(safe-area-inset-top),1.25rem)] z-10 flex justify-between">
            <button type="button" onClick={() => setExpanded(false)} aria-label="ย้อนกลับ" className={glassBtn}>
              <ChevronLeft className="size-8" strokeWidth={2.5} />
            </button>
            <button type="button" onClick={flipExpanded} aria-label="พลิกบัตร" className={glassBtn}>
              <FlipIcon className="size-7" />
            </button>
          </div>
          <div className="rotate-90">
            {renderCard({
              style: { width: 'min(78dvh, 140vw, 40rem)' },
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
