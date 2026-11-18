'use client'

import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BackButton } from './page-parts'
import { useCardViewer } from './use-card-viewer'

type Props = { onBack: () => void }

const IMAGE_SRC = '/images/birth-certificate.svg'
const IMAGE_WIDTH = 1234
const IMAGE_HEIGHT = 1748
const RATIO = IMAGE_WIDTH / IMAGE_HEIGHT
const ALT = 'แบบรับรองรายการทะเบียนคนเกิด (สูติบัตร)'

export function BirthCertificateScreen({ onBack }: Props) {
  const [isFullOpen, setIsFullOpen] = useState(false)
  const viewer = useCardViewer(RATIO, undefined, 0)

  function closeFull() {
    setIsFullOpen(false)
    viewer.reset()
  }

  function handleCardTap(event: React.MouseEvent) {
    event.stopPropagation()
    if (event.detail >= 2) viewer.toggleZoom()
  }

  useEffect(() => {
    if (!isFullOpen) return
    function onKeyDown(event: KeyboardEvent) {
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
          <h2 className="text-2xl font-bold text-brand">เอกสารสูติบัตร</h2>
          <p className="mt-1 text-base leading-relaxed text-neutral-500">แบบรับรองรายการทะเบียนคนเกิด</p>
        </div>

        <div
          className="mx-auto mt-8 w-full cursor-zoom-in select-none [touch-action:manipulation]"
          onClick={(event) => {
            if (event.detail >= 2) setIsFullOpen(true)
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGE_SRC}
            alt={ALT}
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            draggable={false}
            className="h-auto w-full rounded-sm shadow-md"
          />
        </div>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={() => setIsFullOpen(true)}
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
          aria-label="เอกสารสูติบัตรขนาดเต็ม"
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

          <div
            ref={viewer.contentRef}
            className="relative shrink-0 overflow-hidden rounded-sm shadow-xl touch-none"
            style={{
              width: `min(calc(var(--app-h, 100dvh) * 0.82 * ${RATIO}), calc(min(100vw, 28rem) - 2rem))`,
              aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}`,
              transform: 'translate3d(0px, 0px, 0) scale(1) rotate(0deg)',
              transformOrigin: 'center',
            }}
            onClick={handleCardTap}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGE_SRC} alt={ALT} draggable={false} className="size-full select-none" />
          </div>
        </div>
      )}
    </main>
  )
}
