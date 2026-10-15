'use client'

import { useEffect, useRef, useState } from 'react'
import { banners } from '@/lib/app-content'

const SLIDE_GAP = 22
const AUTO_SLIDE_MS = 5000
const SLIDE_DURATION_MS = 1600
const SWIPE_THRESHOLD = 50
const DRAG_START_PX = 6
const SLIDE_STEP = `(80% + ${SLIDE_GAP}px)`
const VISIBLE_RANGE = [-2, -1, 0, 1, 2]

const wrap = (i: number) => ((i % banners.length) + banners.length) % banners.length

export function BannerCarousel({ onAction }: { onAction: (msg: string) => void }) {
  // `position` only ever grows during autoplay, so the track keeps travelling right and never rewinds.
  const [position, setPosition] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const movedRef = useRef(false)

  const activeDot = wrap(position)

  useEffect(() => {
    if (dragging) return
    const timer = setTimeout(() => setPosition((p) => p + 1), AUTO_SLIDE_MS)
    return () => clearTimeout(timer)
  }, [position, dragging])

  function handlePointerDown(e: React.PointerEvent) {
    startXRef.current = e.clientX
    movedRef.current = false
    setDragging(true)
    setDragX(0)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return
    const dx = e.clientX - startXRef.current
    if (!movedRef.current && Math.abs(dx) > DRAG_START_PX) {
      movedRef.current = true
      containerRef.current?.setPointerCapture(e.pointerId)
    }
    if (movedRef.current) setDragX(dx)
  }

  function handlePointerEnd() {
    if (!dragging) return
    setDragging(false)
    if (dragX <= -SWIPE_THRESHOLD) setPosition((p) => p + 1)
    else if (dragX >= SWIPE_THRESHOLD) setPosition((p) => p - 1)
    setDragX(0)
  }

  function goToDot(i: number) {
    const forwardSteps = (i - activeDot + banners.length) % banners.length
    if (forwardSteps > 0) setPosition((p) => p + forwardSteps)
  }

  return (
    <section aria-label="แบนเนอร์" className="mt-2.5">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className="relative overflow-hidden [touch-action:pan-y]"
      >
        <div
          className="relative w-full"
          style={{
            aspectRatio: '5 / 1',
            transform: `translateX(calc(${-position} * ${SLIDE_STEP} + ${dragX}px))`,
            transition: dragging
              ? 'none'
              : `transform ${SLIDE_DURATION_MS}ms cubic-bezier(0.37, 0, 0.63, 1)`,
          }}
        >
          {VISIBLE_RANGE.map((offset) => {
            const slot = position + offset
            const b = banners[wrap(slot)]
            const isCurrent = offset === 0
            return (
              <button
                key={slot}
                type="button"
                onClick={() => {
                  if (!movedRef.current) onAction(b.title)
                }}
                aria-label={b.title}
                tabIndex={isCurrent ? 0 : -1}
                className="absolute top-0 block w-[80%]"
                style={{ left: `calc(10% + ${slot} * ${SLIDE_STEP})` }}
              >
                <span className="block aspect-[4/1] w-full overflow-hidden rounded-2xl">
                  <img
                    src={b.src}
                    alt=""
                    draggable={false}
                    className="block size-full select-none object-cover"
                  />
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-1">
        {banners.map((b, i) => (
          <button
            key={b.src}
            type="button"
            onClick={() => goToDot(i)}
            aria-label={`แบนเนอร์ที่ ${i + 1}`}
            aria-current={i === activeDot}
            className={`h-[7px] rounded-full transition-all ${i === activeDot ? 'w-[27px] bg-brand' : 'w-[7px] bg-neutral-300'}`}
          />
        ))}
      </div>
    </section>
  )
}
