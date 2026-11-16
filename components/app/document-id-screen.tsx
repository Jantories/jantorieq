'use client'

import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { BackButton } from './page-parts'

type Props = { cardImage: string; onBack: () => void }

const MAX_IMAGE_ZOOM = 2.45
const IMAGE_RATIO = 1.595
const IMAGE_EDGE_OVERSHOOT = 28

type ImageView = { zoom: number; x: number; y: number }

export function DocumentIdScreen({ cardImage, onBack }: Props) {
  const [isFullImageOpen, setIsFullImageOpen] = useState(false)
  const touchRef = useRef({ distance: 0, zoom: 1, x: 0, y: 0, panX: 0, panY: 0, pinching: false, moved: false, focalX: 0, focalY: 0, lastTap: 0 })
  const viewRef = useRef<ImageView>({ zoom: 1, x: 0, y: 0 })
  const contentRef = useRef<HTMLDivElement>(null)

  function clampImagePan(pan: { x: number; y: number }, zoom: number) {
    const viewportWidth = Math.min(window.innerWidth, 448)
    const imageWidth = Math.min(window.innerHeight * 0.78, window.innerWidth * 1.4, 640)
    const imageHeight = imageWidth / IMAGE_RATIO
    const easing = Math.min(1, Math.max(0, (zoom - 1) / 0.5))
    const maxY = (imageWidth * zoom * easing) / 2
    const maxX = Math.max(0, (imageHeight * zoom - viewportWidth) / 2 + IMAGE_EDGE_OVERSHOOT) * easing
    return { x: Math.max(-maxX, Math.min(maxX, pan.x)), y: Math.max(-maxY, Math.min(maxY, pan.y)) }
  }

  function applyImageView(nextZoom: number, nextPan: { x: number; y: number }) {
    viewRef.current = { zoom: nextZoom, x: nextPan.x, y: nextPan.y }
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(${nextPan.x}px, ${nextPan.y}px, 0) scale(${nextZoom}) rotate(90deg)`
    }
  }

  function getImageFocal(event: React.TouchEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.touches[0].clientX + event.touches[1].clientX) / 2 - (rect.left + rect.width / 2)
    const y = (event.touches[0].clientY + event.touches[1].clientY) / 2 - (rect.top + rect.height / 2)
    const rotation = document.documentElement.getAttribute('data-forced-portrait')
    if (rotation === 'cw') return { x: y, y: -x }
    if (rotation === 'ccw') return { x: -y, y: x }
    return { x, y }
  }

  function handleImageTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    if (event.touches.length === 2) {
      const [first, second] = [event.touches[0], event.touches[1]]
      const focal = getImageFocal(event)
      touchRef.current = {
        ...touchRef.current,
        distance: Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY),
        zoom: viewRef.current.zoom,
        focalX: focal.x,
        focalY: focal.y,
        pinching: true,
        moved: false,
      }
    } else if (event.touches.length === 1) {
      touchRef.current = { ...touchRef.current, x: event.touches[0].clientX, y: event.touches[0].clientY, panX: viewRef.current.x, panY: viewRef.current.y, pinching: false, moved: false }
    }
  }

  function handleImageTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    const view = viewRef.current
    if (event.touches.length === 2) {
      event.preventDefault()
      const [first, second] = [event.touches[0], event.touches[1]]
      const distance = Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY)
      const nextZoom = Math.min(MAX_IMAGE_ZOOM, Math.max(1, touchRef.current.zoom * (distance / touchRef.current.distance)))
      const focal = getImageFocal(event)
      touchRef.current.moved = true
      let nextPan: { x: number; y: number }
      if (nextZoom >= view.zoom) {
        const scale = nextZoom / view.zoom
        nextPan = { x: focal.x - scale * (touchRef.current.focalX - view.x), y: focal.y - scale * (touchRef.current.focalY - view.y) }
      } else {
        const shrink = view.zoom > 1 ? (nextZoom - 1) / (view.zoom - 1) : 0
        nextPan = { x: view.x * shrink, y: view.y * shrink }
      }
      touchRef.current.focalX = focal.x
      touchRef.current.focalY = focal.y
      applyImageView(nextZoom, clampImagePan(nextPan, nextZoom))
    } else if (event.touches.length === 1 && view.zoom > 1 && !touchRef.current.pinching) {
      event.preventDefault()
      touchRef.current.moved = true
      const dx = event.touches[0].clientX - touchRef.current.x
      const dy = event.touches[0].clientY - touchRef.current.y
      const rotation = document.documentElement.getAttribute('data-forced-portrait')
      const delta = rotation === 'cw' ? { x: dy, y: -dx } : rotation === 'ccw' ? { x: -dy, y: dx } : { x: dx, y: dy }
      applyImageView(view.zoom, clampImagePan({ x: touchRef.current.panX + delta.x, y: touchRef.current.panY + delta.y }, view.zoom))
    }
  }

  function handleImageTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    touchRef.current.distance = 0
    if (event.touches.length === 1) {
      touchRef.current = { ...touchRef.current, x: event.touches[0].clientX, y: event.touches[0].clientY, panX: viewRef.current.x, panY: viewRef.current.y, pinching: true }
    } else if (event.touches.length === 0) {
      touchRef.current.pinching = false
      if (!touchRef.current.moved) {
        const now = Date.now()
        if (now - touchRef.current.lastTap < 350) {
          const nextZoom = viewRef.current.zoom > 1 ? 1 : 2
          applyImageView(nextZoom, { x: 0, y: 0 })
          touchRef.current.lastTap = 0
        } else {
          touchRef.current.lastTap = now
        }
      }
    }
  }

  function closeFullImage() {
    setIsFullImageOpen(false)
    applyImageView(1, { x: 0, y: 0 })
    touchRef.current = { ...touchRef.current, moved: false, pinching: false, lastTap: 0 }
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
          <h2 className="text-xl font-bold text-brand">เอกสารบัตรประจำตัวประชาชน</h2>
          <p className="mt-1 text-base leading-relaxed text-neutral-500">ข้อมูลหน้าบัตร รูปภาพ ชื่อ นามสกุล วันหมดอายุ</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5">
          <Image
            src={cardImage}
            alt="ภาพบัตรประจำตัวประชาชน"
            width={1294}
            height={811}
            sizes="(max-width: 448px) 92vw, 400px"
            className="block h-auto w-full"
            priority
          />
        </div>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={() => setIsFullImageOpen(true)}
            className="flex min-h-16 w-full items-center justify-center rounded-full bg-brand px-6 py-4 text-xl font-medium text-white transition hover:bg-brand-dark active:scale-[0.99]"
          >
            ดูภาพเต็ม
          </button>
        </div>
      </div>

      {isFullImageOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ภาพบัตรประจำตัวประชาชนขนาดเต็ม"
          className="fixed inset-0 z-40 mx-auto flex max-w-md items-center justify-center overflow-hidden bg-neutral-900/60 backdrop-blur-[2px] touch-none [overscroll-behavior:none] [touch-action:none]"
          onTouchStart={handleImageTouchStart}
          onTouchMove={handleImageTouchMove}
          onTouchEnd={handleImageTouchEnd}
          onClick={closeFullImage}
        >
          <button
            type="button"
            aria-label="ปิดภาพเต็ม"
            className="absolute left-5 top-[max(env(safe-area-inset-top),1.25rem)] z-10 flex size-11 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur transition hover:bg-white/40 active:scale-95"
            onClick={closeFullImage}
          >
            <ChevronLeft className="size-8" strokeWidth={2.5} />
          </button>
          <div
            ref={contentRef}
            className="relative shrink-0 overflow-hidden rounded-[4.5cqw] shadow-xl touch-none [will-change:transform]"
            style={{ width: 'min(calc(var(--app-h, 100dvh) * 0.78), 140vw, 40rem)', transform: 'translate3d(0px, 0px, 0) scale(1) rotate(90deg)', transformOrigin: 'center' }}
            onClick={(event) => event.stopPropagation()}
            onDoubleClick={() => applyImageView(viewRef.current.zoom > 1 ? 1 : 2, { x: 0, y: 0 })}
            aria-label="แตะสองครั้งเพื่อขยายหรือย่อภาพ"
          >
            <Image
              src={cardImage}
              alt="ภาพบัตรประจำตัวประชาชนขนาดเต็ม แตะสองครั้งเพื่อขยายหรือย่อ"
              width={1294}
              height={811}
              sizes="1100px"
              className="block aspect-[1.595/1] h-auto w-full object-fill"
              priority
            />
          </div>
        </div>
      )}
    </main>
  )
}
