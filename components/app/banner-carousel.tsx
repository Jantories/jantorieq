'use client'

import { useRef, useState } from 'react'
import { banners } from '@/lib/app-content'

export function BannerCarousel({ onAction }: { onAction: (msg: string) => void }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  function slideWidth() {
    const first = trackRef.current?.firstElementChild as HTMLElement | null
    return first ? first.offsetWidth + 12 : 1
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
    <section aria-label="แบนเนอร์" className="mt-8">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[10%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {banners.map((b, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onAction(b.title)}
            className="relative block aspect-[4.3/1] w-[80%] shrink-0 snap-center overflow-hidden rounded-2xl text-left"
          >
            <img src={b.src || '/placeholder.svg'} alt="" className="absolute inset-0 size-full object-cover" />
            <span className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <span className="relative flex h-full flex-col justify-center px-6">
              <span className="text-lg font-bold text-white">{b.title}</span>
              <span className="text-xs text-white/80">{b.sub}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`แบนเนอร์ที่ ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${i === index ? 'w-14 bg-brand' : 'w-2.5 bg-neutral-300'}`}
          />
        ))}
      </div>
    </section>
  )
}
