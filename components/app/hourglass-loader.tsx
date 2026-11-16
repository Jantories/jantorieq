'use client'

import { useEffect, useState } from 'react'

const topBulb = 'M10 10 H90 L50 60 Z'
const bottomBulb = 'M50 60 L90 110 H10 Z'

export function useScreenReady(durationMs = 1400) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), durationMs)
    return () => window.clearTimeout(id)
  }, [durationMs])

  return ready
}

export function HourglassLoader() {
  return (
    <div role="status" aria-live="polite" className="flex flex-1 items-center justify-center">
      <span className="sr-only">กำลังโหลด</span>
      <svg viewBox="0 0 100 120" className="hourglass-loader size-24 text-brand" aria-hidden>
        <defs>
          <clipPath id="hourglass-top">
            <path d={topBulb} />
          </clipPath>
          <clipPath id="hourglass-bottom">
            <path d={bottomBulb} />
          </clipPath>
        </defs>

        <g clipPath="url(#hourglass-top)">
          <rect x="0" y="10" width="100" height="50" fill="currentColor" className="hourglass-sand-top" />
        </g>
        <g clipPath="url(#hourglass-bottom)">
          <rect x="0" y="60" width="100" height="50" fill="currentColor" className="hourglass-sand-bottom" />
        </g>
        <rect x="48.5" y="58" width="3" height="48" fill="currentColor" className="hourglass-stream" />

        <path d={topBulb} fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="miter" />
        <path d={bottomBulb} fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="miter" />
      </svg>
    </div>
  )
}
