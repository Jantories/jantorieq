'use client'

import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BackButton } from './page-parts'
import { HouseInfoArtwork } from './house-info-artwork'
import { HouseMembersArtwork } from './house-members-artwork'
import { useCardViewer } from './use-card-viewer'

type Props = { onBack: () => void }

const FACE_WIDTH = 810
const FACE_HEIGHT = 500

const SLIDES = [
  { id: 'house-info', label: 'รายการเกี่ยวกับบ้าน', Artwork: HouseInfoArtwork },
  { id: 'house-members', label: 'รายการบุคคลในบ้าน', Artwork: HouseMembersArtwork },
]

export function HouseRegistrationScreen({ onBack }: Props) {
  const [isFullOpen, setIsFullOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const viewer = useCardViewer(FACE_WIDTH / FACE_HEIGHT, (direction) => goTo(activeIndex + direction))

  function goTo(index: number) {
    if (index < 0 || index >= SLIDES.length || index === activeIndex) return
    viewer.reset()
    setActiveIndex(index)
  }

  function handleCardTap(event: React.MouseEvent) {
    event.stopPropagation()
    if (event.detail >= 2) viewer.toggleZoom()
  }

  function openFull() {
    setActiveIndex(0)
    setIsFullOpen(true)
  }

  function closeFull() {
    setIsFullOpen(false)
    viewer.reset()
  }

  useEffect(() => {
    if (!isFullOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') goTo(activeIndex + 1)
      if (event.key === 'ArrowLeft') goTo(activeIndex - 1)
      if (event.key === 'Escape') closeFull()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

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

        <div className="mt-8 flex flex-col overflow-hidden rounded-xl shadow-md">
          {SLIDES.map(({ id, Artwork }) => (
            <Artwork key={id} className="block w-full" />
          ))}
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
          aria-roledescription="carousel"
          aria-label="เอกสารทะเบียนบ้านขนาดเต็ม"
          className="fixed inset-0 z-40 mx-auto max-w-md overflow-hidden bg-neutral-900/65 touch-none [overscroll-behavior:none] [touch-action:none]"
          style={
            {
              '--card-w': `min(calc(var(--app-h, 100dvh) * 0.78), calc((min(100vw, 28rem) - 2rem) * ${FACE_WIDTH / FACE_HEIGHT}), 40rem)`,
              '--card-h': `calc(var(--card-w) * ${FACE_HEIGHT / FACE_WIDTH})`,
            } as React.CSSProperties
          }
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

          <div
            className="absolute left-1/2 top-0 flex h-full items-center transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(var(--card-h) * ${-(activeIndex + 0.5)}))` }}
          >
            {SLIDES.map(({ id, label, Artwork }, index) => (
              <div
                key={id}
                className="flex shrink-0 items-center justify-center"
                style={{ width: 'var(--card-h)', height: 'var(--card-w)' }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${label} (${index + 1} จาก ${SLIDES.length})`}
                aria-hidden={index !== activeIndex}
              >
                <div
                  ref={index === activeIndex ? viewer.contentRef : undefined}
                  className={`relative shrink-0 overflow-hidden shadow-xl touch-none ${index === 0 ? 'rounded-b-[4.5cqw]' : 'rounded-t-[4.5cqw]'}`}
                  style={{
                    width: 'var(--card-w)',
                    aspectRatio: `${FACE_WIDTH} / ${FACE_HEIGHT}`,
                    transform: 'translate3d(0px, 0px, 0) scale(1) rotate(90deg)',
                    transformOrigin: 'center',
                  }}
                  onClick={handleCardTap}
                >
                  <Artwork className="size-full" />
                </div>
              </div>
            ))}
          </div>

          <div
            className="absolute inset-x-0 bottom-[max(env(safe-area-inset-bottom),1.5rem)] z-10 flex items-center justify-center gap-2"
            onClick={(event) => event.stopPropagation()}
          >
            {SLIDES.map(({ id, label }, index) => (
              <button
                key={id}
                type="button"
                aria-label={`ไปที่${label}`}
                aria-current={index === activeIndex}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
