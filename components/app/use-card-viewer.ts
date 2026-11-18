'use client'

import { useRef } from 'react'
import type { TouchEvent } from 'react'
import { beginGesture, endGesture, promoteLayer } from '@/lib/gesture'

const MAX_ZOOM = 2.45
const EDGE_OVERSHOOT = 28
const DOUBLE_TAP_ZOOM = 2

type View = { zoom: number; x: number; y: number }

// Pinch, pan and double-tap zoom for a card shown rotated 90deg inside a full-screen dialog.
export function useCardViewer(ratio: number) {
  const contentRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<View>({ zoom: 1, x: 0, y: 0 })
  const centerRef = useRef({ x: 0, y: 0 })
  const touchRef = useRef({ distance: 0, zoom: 1, x: 0, y: 0, panX: 0, panY: 0, focalX: 0, focalY: 0, pinching: false })

  function clampPan(pan: { x: number; y: number }, zoom: number) {
    const viewportWidth = Math.min(window.innerWidth, 448)
    const cardWidth = Math.min(window.innerHeight * 0.78, (viewportWidth - 32) * ratio, 640)
    const cardHeight = cardWidth / ratio
    const easing = Math.min(1, Math.max(0, (zoom - 1) / 0.5))
    const maxY = (cardWidth * zoom * easing) / 2
    const maxX = Math.max(0, (cardHeight * zoom - viewportWidth) / 2 + EDGE_OVERSHOOT) * easing
    return { x: Math.max(-maxX, Math.min(maxX, pan.x)), y: Math.max(-maxY, Math.min(maxY, pan.y)) }
  }

  function apply(zoom: number, pan: { x: number; y: number }) {
    viewRef.current = { zoom, x: pan.x, y: pan.y }
    beginGesture()
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom}) rotate(90deg)`
      promoteLayer(contentRef.current)
    }
    endGesture()
  }

  function toScreenDelta(dx: number, dy: number) {
    const rotation = document.documentElement.getAttribute('data-forced-portrait')
    if (rotation === 'cw') return { x: dy, y: -dx }
    if (rotation === 'ccw') return { x: -dy, y: dx }
    return { x: dx, y: dy }
  }

  function focalOf(event: TouchEvent<HTMLDivElement>) {
    const x = (event.touches[0].clientX + event.touches[1].clientX) / 2 - centerRef.current.x
    const y = (event.touches[0].clientY + event.touches[1].clientY) / 2 - centerRef.current.y
    return toScreenDelta(x, y)
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    centerRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    if (event.touches.length === 2) {
      const [first, second] = [event.touches[0], event.touches[1]]
      const focal = focalOf(event)
      touchRef.current = {
        ...touchRef.current,
        distance: Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY),
        zoom: viewRef.current.zoom,
        focalX: focal.x,
        focalY: focal.y,
        pinching: true,
      }
    } else if (event.touches.length === 1) {
      touchRef.current = { ...touchRef.current, x: event.touches[0].clientX, y: event.touches[0].clientY, panX: viewRef.current.x, panY: viewRef.current.y, pinching: false }
    }
  }

  function onTouchMove(event: TouchEvent<HTMLDivElement>) {
    const view = viewRef.current
    if (event.touches.length === 2) {
      event.preventDefault()
      const [first, second] = [event.touches[0], event.touches[1]]
      const distance = Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY)
      const zoom = Math.min(MAX_ZOOM, Math.max(1, touchRef.current.zoom * (distance / touchRef.current.distance)))
      const focal = focalOf(event)
      let pan: { x: number; y: number }
      if (zoom >= view.zoom) {
        const scale = zoom / view.zoom
        pan = { x: focal.x - scale * (touchRef.current.focalX - view.x), y: focal.y - scale * (touchRef.current.focalY - view.y) }
      } else {
        const shrink = view.zoom > 1 ? (zoom - 1) / (view.zoom - 1) : 0
        pan = { x: view.x * shrink, y: view.y * shrink }
      }
      touchRef.current.focalX = focal.x
      touchRef.current.focalY = focal.y
      apply(zoom, clampPan(pan, zoom))
    } else if (event.touches.length === 1 && view.zoom > 1 && !touchRef.current.pinching) {
      event.preventDefault()
      const delta = toScreenDelta(event.touches[0].clientX - touchRef.current.x, event.touches[0].clientY - touchRef.current.y)
      apply(view.zoom, clampPan({ x: touchRef.current.panX + delta.x, y: touchRef.current.panY + delta.y }, view.zoom))
    }
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    touchRef.current.distance = 0
    if (event.touches.length === 1) {
      touchRef.current = { ...touchRef.current, x: event.touches[0].clientX, y: event.touches[0].clientY, panX: viewRef.current.x, panY: viewRef.current.y, pinching: true }
    } else if (event.touches.length === 0) {
      touchRef.current.pinching = false
    }
  }

  function toggleZoom() {
    apply(viewRef.current.zoom > 1 ? 1 : DOUBLE_TAP_ZOOM, { x: 0, y: 0 })
  }

  function reset() {
    apply(1, { x: 0, y: 0 })
    touchRef.current = { ...touchRef.current, pinching: false }
  }

  return { contentRef, handlers: { onTouchStart, onTouchMove, onTouchEnd }, toggleZoom, reset }
}
