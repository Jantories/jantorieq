'use client'

import { useEffect, useRef } from 'react'

const activateDistance = 6
const maxPull = 140
const releaseTransition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'

// The pull offset is written straight to the element, so dragging never re-renders the app.
export function usePullDown(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const paint = (offset: number, animate: boolean) => {
      const el = ref.current
      if (!el) return
      el.style.transition = animate ? releaseTransition : 'none'
      el.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    // A lingering transform would turn the element into the containing block of fixed overlays.
    let clearTimer: ReturnType<typeof setTimeout> | undefined
    const clear = () => {
      const el = ref.current
      if (!el) return
      el.style.transition = ''
      el.style.transform = ''
    }

    if (!enabled) return

    let startY: number | null = null
    let active = false
    let pulled = 0
    let frame = 0
    let suppressClick = false

    const isBlocked = (target: EventTarget | null) =>
      target instanceof Element && target.closest('.touch-none, input, textarea') !== null

    const begin = (y: number, target: EventTarget | null) => {
      if (window.scrollY > 0 || isBlocked(target)) return
      startY = y
      active = false
      pulled = 0
    }

    const flush = () => {
      frame = 0
      paint(pulled, false)
    }

    const move = (y: number) => {
      if (startY === null) return false
      const distance = y - startY
      if (!active) {
        if (distance < 0) {
          startY = null
          return false
        }
        if (distance < activateDistance) return false
        active = true
        clearTimeout(clearTimer)
        document.body.style.userSelect = 'none'
      }
      pulled = (distance * maxPull) / (maxPull + distance)
      if (!frame) frame = requestAnimationFrame(flush)
      return true
    }

    const end = () => {
      if (startY === null) return
      const wasActive = active
      startY = null
      active = false
      if (!wasActive) return
      document.body.style.userSelect = ''
      cancelAnimationFrame(frame)
      frame = 0
      pulled = 0
      paint(0, true)
      clearTimer = setTimeout(clear, 460)
    }

    const onTouchStart = (e: TouchEvent) => begin(e.touches[0].clientY, e.target)
    const onTouchMove = (e: TouchEvent) => {
      if (move(e.touches[0].clientY) && e.cancelable) e.preventDefault()
    }

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) begin(e.clientY, e.target)
    }
    const onMouseMove = (e: MouseEvent) => {
      if (e.buttons !== 1) return
      if (move(e.clientY)) suppressClick = true
    }
    const onClickCapture = (e: MouseEvent) => {
      if (!suppressClick) return
      suppressClick = false
      e.preventDefault()
      e.stopPropagation()
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', end)
    window.addEventListener('touchcancel', end)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', end)
    window.addEventListener('click', onClickCapture, true)

    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', end)
      window.removeEventListener('touchcancel', end)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', end)
      window.removeEventListener('click', onClickCapture, true)
      cancelAnimationFrame(frame)
      clearTimeout(clearTimer)
      document.body.style.userSelect = ''
      clear()
    }
  }, [enabled])

  return { ref }
}
