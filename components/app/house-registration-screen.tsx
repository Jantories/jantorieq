'use client'

import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BackButton } from './page-parts'
import { HouseInfoArtwork } from './house-info-artwork'
import { HouseMembersArtwork } from './house-members-artwork'
import { useCardViewer } from './use-card-viewer'

type Props = { onBack: () => void }

const FACE_WIDTH = 810
const FACE_HEIGHT = 500
const FLIP_DELAY_MS = 260

const SLIDES = [
  { id: 'house-info', label: 'รายการเกี่ยวกับบ้าน', Artwork: HouseInfoArtwork },
  { id: 'house-members', label: 'รายการบุคคลในบ้าน', Artwork: HouseMembersArtwork },
]

function HouseDocument() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  function handleScroll() {
    const track = trackRef.current
    if (!track) return
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth))
  }

  function goTo(index: number) {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="เอกสารทะเบียนบ้าน"
      >
        {SLIDES.map(({ id, label, Artwork }, index) => (
          <div
            key={id}
            className="w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${label} (${index + 1} จาก ${SLIDES.length})`}
          >
            <Artwork className="overflow-hidden rounded-xl shadow-md" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        {SLIDES.map(({ id, label }, index) => (
          <button
            key={id}
            type="button"
            aria-label={`ไปที่${label}`}
            aria-current={index === activeIndex}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-brand' : 'w-2 bg-neutral-300'}`}
          />
        ))}
      </div>
    </div>
  )
}

function FlipHouseCard({ flipped, onClick }: { flipped: boolean; onClick: (event: React.MouseEvent) => void }) {
  return (
    <div
      className="relative w-full [perspective:1200px]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick(event as unknown as React.MouseEvent)
        }
      }}
      aria-label="แตะหนึ่งครั้งเพื่อพลิกบัตร แตะสองครั้งเพื่อขยาย"
    >
      <div
        className="relative w-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out"
        style={{ aspectRatio: `${FACE_WIDTH} / ${FACE_HEIGHT}`, transform: `rotateY(${flipped ? 180 : 0}deg)` }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]" aria-hidden={flipped}>
          <div className="absolute inset-0 overflow-hidden rounded-[4.5cqw]">
            <HouseInfoArtwork className="size-full" />
          </div>
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]" aria-hidden={!flipped}>
          <div className="absolute inset-0 overflow-hidden rounded-[4.5cqw]">
            <HouseMembersArtwork className="size-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HouseRegistrationScreen({ onBack }: Props) {
  const [isFullOpen, setIsFullOpen] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const viewer = useCardViewer(FACE_WIDTH / FACE_HEIGHT)

  useEffect(
    () => () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current)
    },
    [],
  )

  function handleCardTap(event: React.MouseEvent) {
    event.stopPropagation()
    if (flipTimerRef.current) {
      clearTimeout(flipTimerRef.current)
      flipTimerRef.current = null
    }
    if (event.detail >= 2) {
      viewer.toggleZoom()
      return
    }
    flipTimerRef.current = setTimeout(() => {
      flipTimerRef.current = null
      setFlipped((value) => !value)
    }, FLIP_DELAY_MS)
  }

  function openFull() {
    setFlipped(false)
    setIsFullOpen(true)
  }

  function closeFull() {
    if (flipTimerRef.current) {
      clearTimeout(flipTimerRef.current)
      flipTimerRef.current = null
    }
    setIsFullOpen(false)
    setFlipped(false)
    viewer.reset()
  }

  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-brand">
      <header className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center px-5 pb-6 pt-[max(env(safe-area-inset-top),1.5rem)]">
        <BackButton onClick={onBack} variant="dark" />
        <h1 className="text-center text-2xl font-bold text-white">เอกสาร</h1>
        <span aria-hidden />
      </header>

      <div className="flex flex-1 flex-col rounded-t-[2rem] bg-white px-5 pb-5 pt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand">เอกสารทะเบียนบ้าน</h2>
          <p className="mt-1 text-base leading-relaxed text-neutral-500">ข้อมูลทะเบียนบ้าน</p>
        </div>

        <div className="mt-8">
          <HouseDocument />
        </div>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={openFull}
            className="flex min-h-16 w-full items-center justify-center rounded-full bg-brand px-6 py-4 text-xl font-medium text-white transition hover:bg-brand-dark active:scale-[0.99]"
          >
            ดูภาพเต็ม
          </button>
        </div>
      </div>

      {isFullOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="เอกสารทะเบียนบ้านขนาดเต็ม"
          className="fixed inset-0 z-40 mx-auto flex max-w-md items-center justify-center overflow-hidden bg-neutral-900/65 touch-none [overscroll-behavior:none] [touch-action:none]"
          onTouchStart={viewer.handlers.onTouchStart}
          onTouchMove={viewer.handlers.onTouchMove}
          onTouchEnd={viewer.handlers.onTouchEnd}
          onClick={closeFull}
        >
          <button
            type="button"
            aria-label="ปิดภาพเต็ม"
            className="absolute left-5 top-[max(env(safe-area-inset-top),1.25rem)] z-10 flex size-11 items-center justify-center rounded-full bg-white/35 text-white transition hover:bg-white/45 active:scale-95"
            onClick={closeFull}
          >
            <ChevronLeft className="size-8" strokeWidth={2.5} />
          </button>
          <div className="animate-card-pop">
            <div
              ref={viewer.contentRef}
              className="relative shrink-0 rounded-[4.5cqw] shadow-xl touch-none"
              style={{ width: `min(calc(var(--app-h, 100dvh) * 0.78), calc((min(100vw, 28rem) - 2rem) * ${FACE_WIDTH / FACE_HEIGHT}), 40rem)`, transform: 'translate3d(0px, 0px, 0) scale(1) rotate(90deg)', transformOrigin: 'center' }}
              onClick={(event) => event.stopPropagation()}
            >
              <FlipHouseCard flipped={flipped} onClick={handleCardTap} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
