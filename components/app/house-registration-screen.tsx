'use client'

import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BackButton } from './page-parts'
import { HouseInfoArtwork } from './house-info-artwork'
import { HouseMembersArtwork } from './house-members-artwork'
import { useCardViewer } from './use-card-viewer'

type Props = { onBack: () => void; imageSrcs?: { info: string; members: string } }

const FACE_WIDTH = 810
const FACE_HEIGHT = 500

type ArtworkProps = { className?: string; src?: string; alt: string; Fallback: (props: { className?: string }) => React.ReactNode }

function SlideArtwork({ className = '', src, alt, Fallback }: ArtworkProps) {
  if (!src) return <Fallback className={className} />
  return <img src={src} alt={alt} draggable={false} className={`block h-auto w-full select-none ${className}`} />
}

export function HouseRegistrationScreen({ onBack, imageSrcs }: Props) {
  const SLIDES = [
    { id: 'house-info', label: 'รายการเกี่ยวกับบ้าน', src: imageSrcs?.info, Fallback: HouseInfoArtwork },
    { id: 'house-members', label: 'รายการบุคคลในบ้าน', src: imageSrcs?.members, Fallback: HouseMembersArtwork },
  ]
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

  function openFull(index = 0) {
    setActiveIndex(index)
    setIsFullOpen(true)
  }

  function closeFull() {
    setIsFullOpen(false)
    viewer.reset()
  }

  useEffect(() => {
    if (!isFullOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') goTo(activeIndex + 1)
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') goTo(activeIndex - 1)
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

        <div className="mt-8 flex flex-col gap-6">
          {SLIDES.map(({ id, label, src, Fallback }, index) => (
            <div
              key={id}
              className="cursor-zoom-in select-none [touch-action:manipulation]"
              onClick={(event) => {
                if (event.detail >= 2) openFull(index)
              }}
            >
              <SlideArtwork src={src} alt={label} Fallback={Fallback} className="overflow-hidden rounded-xl shadow-md" />
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={() => openFull(0)}
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
            className="flex size-full flex-col transition-transform duration-500 ease-out"
            style={{ transform: `translateY(-${activeIndex * 100}%)` }}
          >
            {SLIDES.map(({ id, label, src, Fallback }, index) => (
              <div
                key={id}
                className="flex size-full shrink-0 items-center justify-center"
                role="group"
                aria-roledescription="slide"
                aria-label={`${label} (${index + 1} จาก ${SLIDES.length})`}
                aria-hidden={index !== activeIndex}
              >
                <div
                  ref={index === activeIndex ? viewer.contentRef : undefined}
                  className="relative shrink-0 overflow-hidden rounded-[4.5cqw] shadow-xl touch-none"
                  style={{
                    width: `min(calc(var(--app-h, 100dvh) * 0.78), calc((min(100vw, 28rem) - 2rem) * ${FACE_WIDTH / FACE_HEIGHT}), 40rem)`,
                    aspectRatio: `${FACE_WIDTH} / ${FACE_HEIGHT}`,
                    transform: 'translate3d(0px, 0px, 0) scale(1) rotate(90deg)',
                    transformOrigin: 'center',
                  }}
                  onClick={handleCardTap}
                >
                  <SlideArtwork src={src} alt={label} Fallback={Fallback} className="size-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
