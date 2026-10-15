'use client'

import { useRef, useState } from 'react'
import { CroppedImage } from './cropped-image'
import { ChevronLeft, Maximize2, RefreshCcwDot, UserRound } from 'lucide-react'
import { card } from '@/lib/app-content'

const FRONT = { src: '/images/source-front.png', natural: { width: 1279, height: 948 }, crop: { x: 56, y: 173, width: 1175, height: 739 } }
const BACK = { src: '/images/source-back.png', natural: { width: 474, height: 302 }, crop: { x: 12, y: 8, width: 450, height: 284 } }

function CardFace({ face, label, back = false }: { face: typeof FRONT; label: string; back?: boolean }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-[4.5cqw] [backface-visibility:hidden] ${back ? '[transform:rotateY(180deg)]' : ''}`}
    >
      <CroppedImage {...face} alt={label} className="size-full" />
    </div>
  )
}

const circleBtn =
  'flex size-11 items-center justify-center rounded-full bg-brand-dark text-white transition hover:bg-brand-dark/80 active:scale-95'

const glassBtn =
  'flex size-11 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur transition hover:bg-white/40 active:scale-95'

const DOUBLE_TAP_MS = 350

type Props = { onOpenInfo: () => void }

export function HeroCard({ onOpenInfo }: Props) {
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
          <UserRound className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex h-11 items-center gap-2 rounded-full bg-brand-dark pl-7 pr-6 text-base text-white transition hover:bg-brand-dark/80 active:scale-95"
        >
          <Maximize2 className="size-5" />
          <span>{card.expandLabel}</span>
        </button>
        <button type="button" onClick={flip} aria-label="พลิกบัตร" className={circleBtn}>
          <RefreshCcwDot className="size-5" />
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
              <RefreshCcwDot className="size-7" />
            </button>
          </div>
          <div className="rotate-90">{renderCard({ width: 'min(78dvh, 140vw, 40rem)' })}</div>
        </div>
      )}
    </div>
  )
}
