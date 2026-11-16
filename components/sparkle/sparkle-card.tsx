'use client'

import { useEffect, useRef } from 'react'
import { createInkSparkle, type InkSparkle } from '@/lib/ink-sparkle'

interface SparkleCardProps {
  fragmentSource: string
  vertexSource: string
}

const SPARKLE_COLOR: [number, number, number, number] = [0.55, 0.88, 0.95, 0.16]
const HOVER_INTERVAL_MS = 140
const HOVER_MIN_DISTANCE = 36

export function SparkleCard({ fragmentSource, vertexSource }: SparkleCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparkleRef = useRef<InkSparkle | null>(null)
  const lastHover = useRef({ time: 0, x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    try {
      sparkleRef.current = createInkSparkle(canvas, fragmentSource, vertexSource, SPARKLE_COLOR)
    } catch (error) {
      console.error('Ink sparkle disabled:', error instanceof Error ? error.message : error)
      sparkleRef.current = null
    }
    if (!sparkleRef.current) return

    const observer = new ResizeObserver(() => sparkleRef.current?.resize())
    observer.observe(container)

    return () => {
      observer.disconnect()
      sparkleRef.current?.destroy()
      sparkleRef.current = null
    }
  }, [fragmentSource, vertexSource])

  const handlePointerDown = (event: React.PointerEvent) => {
    sparkleRef.current?.spawn(event.clientX, event.clientY)
  }

  const handlePointerMove = (event: React.PointerEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const now = performance.now()
    const last = lastHover.current
    const moved = Math.hypot(event.clientX - last.x, event.clientY - last.y)
    if (now - last.time < HOVER_INTERVAL_MS || moved < HOVER_MIN_DISTANCE) return
    lastHover.current = { time: now, x: event.clientX, y: event.clientY }
    sparkleRef.current?.spawn(event.clientX, event.clientY)
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className="relative aspect-[1.586/1] w-full max-w-md cursor-pointer touch-manipulation overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl"
    >
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 48 48"
            className="size-10 text-primary"
            role="img"
            aria-label="Aurora logo"
          >
            <path
              d="M24 3 42 13.5v21L24 45 6 34.5v-21L24 3Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M17 33V15l14 18V15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg font-semibold tracking-wide">Aurora Club</span>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Member</span>
            <span className="text-xl font-medium">Sample Member</span>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs tracking-widest text-muted-foreground">
            SAMPLE
          </span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      />
    </div>
  )
}
