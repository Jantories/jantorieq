'use client'

import { useRef, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { ExpandIcon, FlipIcon, PersonIcon } from './card-action-icons'

const FRONT = { small: '/images/card-front-640.png', large: '/images/card-front-1100.png' }
const BACK = { small: '/images/card-back-640.png', large: '/images/card-back-1100.png' }

function CardFace({ face, label, back = false }: { face: typeof FRONT; label: string; back?: boolean }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-[4.5cqw] [backface-visibility:hidden] ${back ? '[transform:rotateY(180deg)]' : ''}`}
    >
      <img
        src={face.large}
        srcSet={`${face.small} 640w, ${face.large} 1100w`}
        sizes="640px"
        alt={label}
        draggable={false}
        decoding="async"
        className="size-full select-none object-cover"
      />
    </div>
  )
}

const circleBtn =
  'flex size-11 items-center justify-center rounded-full bg-brand-dark text-white transition hover:bg-brand-dark/80 active:scale-95'

const glassBtn =
  'flex size-11 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur transition hover:bg-white/40 active:scale-95'

const DOUBLE_TAP_MS = 350

type Props = { card: { expandLabel: string; infoLabel: string }; onOpenInfo: () => void }

export function HeroCard({ card, onOpenInfo }: Props) {
  const [flipped, setFlipped] = useState(false)
  const flip = () => setFlipped((f) => !f)
  const [expanded, setExpanded] = useState(false)

  const lastTapRef = useRef(0)

  function handleCardTap(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('button, input, [contenteditable]')) return
    const now = Date.now()
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      lastTapRef.current = 0
      flip()
      setExpanded(true)
      return
    }
    lastTapRef.current = now
    flip()
  }

  const renderCard = (style?: React.CSSProperties, interactive = false) => (
    <div
      className="[container-type:inline-size] [perspective:1200px]"
      style={style}
      onClick={interactive ? handleCardTap : undefined}
    >
      <div
        className="relative aspect-[1.585/1] w-full shadow-xl transition-transform duration-[1100ms] ease-in-out [transform-style:preserve-3d]"
        style={{ transform: `rotateY(${flipped ? -180 : 0}deg)`, borderRadius: '4.5cqw' }}
      >
        <CardFace face={FRONT} label="บัตรด้านหน้า" />
        <CardFace face={BACK} label="บัตรด้านหลัง" back />
      </div>
    </div>
  )

  return (
    <div className="px-5 pt-4">
      {renderCard(undefined, true)}
      <div className="mt-4 flex items-center justify-center gap-[18px]">
        <button type="button" onClick={onOpenInfo} aria-label={card.infoLabel} className={circleBtn}>
          <PersonIcon className="size-[22px]" />
        </button>
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex h-11 items-center gap-2 rounded-full bg-brand-dark pl-7 pr-6 text-base text-white transition hover:bg-brand-dark/80 active:scale-95"
        >
          <ExpandIcon className="size-5" />
          <span>{card.expandLabel}</span>
        </button>
        <button type="button" onClick={flip} aria-label="พลิกบัตร" className={circleBtn}>
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
            <button type="button" onClick={flip} aria-label="พลิกบัตร" className={glassBtn}>
              <FlipIcon className="size-7" />
            </button>
          </div>
          <div className="rotate-90">{renderCard({ width: 'min(78dvh, 140vw, 40rem)' })}</div>
        </div>
      )}
    </div>
  )
}
