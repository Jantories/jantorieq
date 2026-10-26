'use client'

import { useEffect } from 'react'

const BODY_PROPS = ['position', 'top', 'left', 'width', 'height', 'overflowY', 'overflowX', 'transform', 'transformOrigin'] as const

export function OrientationLock() {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    const lock = (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> } | undefined)?.lock
    lock?.call(screen.orientation, 'portrait').catch(() => {})

    const reset = () => {
      root.removeAttribute('data-forced-portrait')
      root.style.removeProperty('--app-h')
      root.style.removeProperty('--app-w')
      BODY_PROPS.forEach((prop) => {
        body.style[prop] = ''
      })
    }

    const update = () => {
      const { innerWidth: w, innerHeight: h } = window
      const isPhoneLandscape = window.matchMedia('(pointer: coarse)').matches && w > h && Math.min(w, h) < 600
      if (!isPhoneLandscape) {
        reset()
        return
      }
      const angle = screen.orientation?.angle ?? 90
      const clockwise = angle === 270 || angle === -90
      root.setAttribute('data-forced-portrait', clockwise ? 'cw' : 'ccw')
      root.style.setProperty('--app-h', `${w}px`)
      root.style.setProperty('--app-w', `${h}px`)
      body.style.position = 'fixed'
      body.style.top = '0'
      body.style.left = '0'
      body.style.width = `${h}px`
      body.style.height = `${w}px`
      body.style.overflowY = 'auto'
      body.style.overflowX = 'hidden'
      body.style.transformOrigin = 'top left'
      body.style.transform = clockwise ? `translateX(${w}px) rotate(90deg)` : `translateY(${h}px) rotate(-90deg)`
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      reset()
    }
  }, [])

  return null
}
