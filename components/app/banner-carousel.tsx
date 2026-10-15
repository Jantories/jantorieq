'use client'

import { useRef, useState } from 'react'
import { banners } from '@/lib/app-content'

const SLIDE_GAP = 22

export function BannerCarousel({ onAction }: { onAction: (msg: string) => void }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  function slideWidth() {
    const first = trackRef.current?.firstElementChild as HTMLElement | null
    return first ? first.offsetWidth + SLIDE_GAP : 1
  }

  function handleScroll() {
    const el = trackRef.current
    if (!el) return
    setIndex(Math.min(banners.length - 1, Math.round(el.scrollLeft / slideWidth())))
  }

  function goTo(i: number) {
    trackRef.current?.scrollTo({ left: i * slideWidth(), behavior: 'smooth' })
  }

  return (
    <section aria-label="แบนเนอร์" className="mt-2.5">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        style={{ columnGap: SLIDE_GAP }}
        className="flex snap-x snap-mandatory items-end overflow-x-auto px-[10%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {banners.map((b) => (
          <button
            key={b.src}
            type="button"
            onClick={() => onAction(b.title)}
            aria-label={b.title}
            className="block w-[80%] shrink-0 snap-center"
          >
            <span className="block aspect-[4.3/1] w-full overflow-hidden rounded-2xl">
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
