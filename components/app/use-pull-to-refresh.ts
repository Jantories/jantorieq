'use client'

import { useEffect, useRef, useState } from 'react'

const activateDistance = 6
const dampingFactor = 0.5
const maxPull = 110
const refreshThreshold = 64
const refreshHoldOffset = 56
const refreshDurationMs = 900

export function usePullToRefresh(enabled: boolean) {
  const [offset, setOffset] = useState(0)
  const [pulling, setPulling] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const refreshingRef = useRef(false)

  useEffect(() => {
    if (!enabled) {
      setOffset(0)
      setPulling(false)
      return
    }

    let startY: number | null = null
    let active = false
    let pulled = 0
    let suppressClick = false
    let refreshTimer: number | undefined

    const isBlocked = (target: EventTarget | null) =>
      target instanceof Element && target.closest('.touch-none, input, textarea') !== null

    const begin = (y: number, target: EventTarget | null) => {
      if (refreshingRef.current || window.scrollY > 0 || isBlocked(target)) return
      startY = y
      active = false
      pulled = 0
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
        setPulling(true)
        document.body.style.userSelect = 'none'
      }
      pulled = Math.min(maxPull, distance * dampingFactor)
      setOffset(pulled)
      return true
    }

    const end = () => {
      if (startY === null) return
      const wasActive = active
      startY = null
      active = false
      if (!wasActive) return
      document.body.style.userSelect = ''
      setPulling(false)
      if (pulled >= refreshThreshold) {
        refreshingRef.current = true
        setRefreshing(true)
        setOffset(refreshHoldOffset)
        refreshTimer = window.setTimeout(() => {
          refreshingRef.current = false
          setRefreshing(false)
          setOffset(0)
        }, refreshDurationMs)
      } else {
        setOffset(0)
      }
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
      window.clearTimeout(refreshTimer)
      document.body.style.userSelect = ''
      refreshingRef.current = false
      setRefreshing(false)
      setPulling(false)
      setOffset(0)
    }
  }, [enabled])

  return { offset, pulling, refreshing, threshold: refreshThreshold }
}
