'use client'

import { useRef, useState } from 'react'

const banners = [
  { src: '/images/banner-1.png', title: 'บริการออนไลน์ครบในที่เดียว', sub: 'ยื่นคำขอได้ทุกที่ ทุกเวลา' },
  { src: '/images/banner-2.png', title: 'ข่าวสารและกิจกรรม', sub: 'ติดตามประกาศล่าสุดได้ที่นี่' },
]

export function BannerCarousel({ onAction }: { onAction: (msg: string) => void }) {
  const [index, setIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  function handleScroll() {
    const el = trackRef.current
    if (!el) return
    setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  function goTo(i: number) {
    const el = trackRef.current
    el?.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section aria-label="แบนเนอร์" className="mt-8">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {banners.map((b) => (
          <div key={b.src} className="w-full shrink-0 snap-center px-5">
            <button
              type="button"
              onClick={() => onAction(b.title)}
              className="relative block aspect-[3/1] w-full overflow-hidden rounded-2xl text-left"
            >
              <img src={b.src || '/placeholder.svg'} alt="" className="absolute inset-0 size-full object-cover" />
              <span className="relative flex h-full flex-col justify-center p-5">
                <span className="text-lg font-bold text-white text-balance">{b.title}</span>
                <span className="text-xs text-white/80">{b.sub}</span>
              </span>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {banners.map((b, i) => (
          <button
            key={b.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`แบนเนอร์ที่ ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-12 bg-brand' : 'w-2 bg-neutral-300'}`}
          />
        ))}
      </div>
    </section>
  )
}
