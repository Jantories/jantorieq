'use client'

import { useEffect, useRef, useState } from 'react'
import { banners } from '@/lib/app-content'

const SLIDE_GAP = 22
const AUTO_SLIDE_MS = 5000
const SLIDE_DURATION_MS = 1600

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

export function BannerCarousel({ onAction }: { onAction: (msg: string) => void }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)

  function slideWidth() {
    const first = trackRef.current?.firstElementChild as HTMLElement | null
    return first ? first.offsetWidth + SLIDE_GAP : 1
  }

  function handleScroll() {
    const el = trackRef.current
    if (!el) return
    setIndex(Math.min(banners.length - 1, Math.round(el.scrollLeft / slideWidth())))
  }

  function stopAnimation() {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    if (trackRef.current) trackRef.current.style.scrollSnapType = ''
  }

  function goTo(i: number) {
    const el = trackRef.current
    if (!el) return
    stopAnimation()
    const from = el.scrollLeft
    const to = i * slideWidth()
    if (from === to) return
    el.style.scrollSnapType = 'none'
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / SLIDE_DURATION_MS)
      el.scrollLeft = from + (to - from) * easeInOutSine(t)
      if (t < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        frameRef.current = null
        el.style.scrollSnapType = ''
      }
    }
    frameRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    const timer = setTimeout(() => goTo((index + 1) % banners.length), AUTO_SLIDE_MS)
    return () => clearTimeout(timer)
  }, [index])

  useEffect(() => stopAnimation, [])

  return (
    <section aria-label="แบนเนอร์" className="mt-2.5">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={stopAnimation}
        onWheel={stopAnimation}
        style={{ columnGap: SLIDE_GAP }}
        className="flex snap-x snap-mandatory items-start overflow-x-auto px-[10%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {banners.map((b) => (
          <button
            key={b.src}
            type="button"
            onClick={() => onAction(b.title)}
            aria-label={b.title}
            className="block w-[80%] shrink-0 snap-center"
          >
            <span className="block aspect-[4/1] w-full overflow-hidden rounded-2xl">
              <img
                src={b.src}
                alt=""
                draggable={false}
                className="block size-full object-cover"
              />
            </span>
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-1">
        {banners.map((b, i) => (
          <button
            key={b.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`แบนเนอร์ที่ ${i + 1}`}
            aria-current={i === index}
            className={`h-[7px] rounded-full transition-all ${i === index ? 'w-[27px] bg-brand' : 'w-[7px] bg-neutral-300'}`}
          />
        ))}
      </div>
    </section>
  )
}
