'use client'

import { useEffect, useRef, useState } from 'react'
import { ShieldCheck } from 'lucide-react'

export type ShieldMode = 'blur' | 'black' | null

const SCREENSHOT_HOLD_MS = 2500

function isScreenshotShortcut(event: KeyboardEvent) {
  if (event.key === 'PrintScreen') return true
  const isMacShot = event.metaKey && event.shiftKey && ['3', '4', '5', '6'].includes(event.key)
  const isWindowsSnip = event.metaKey && event.shiftKey && event.key.toLowerCase() === 's'
  return isMacShot || isWindowsSnip
}

export function usePrivacyShield(): ShieldMode {
  const [hidden, setHidden] = useState(false)
  const [capturing, setCapturing] = useState(false)
  const captureTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const hide = () => setHidden(true)
    const show = () => setHidden(document.visibilityState === 'hidden')
    const onVisibility = () => setHidden(document.visibilityState === 'hidden')

    const blackout = () => {
      setCapturing(true)
      if (captureTimer.current) clearTimeout(captureTimer.current)
      captureTimer.current = setTimeout(() => setCapturing(false), SCREENSHOT_HOLD_MS)
      navigator.clipboard?.writeText('').catch(() => {})
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (isScreenshotShortcut(event)) blackout()
    }
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'PrintScreen') blackout()
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur', hide)
    window.addEventListener('focus', show)
    window.addEventListener('pagehide', hide)
    window.addEventListener('pageshow', show)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', hide)
      window.removeEventListener('focus', show)
      window.removeEventListener('pagehide', hide)
      window.removeEventListener('pageshow', show)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      if (captureTimer.current) clearTimeout(captureTimer.current)
    }
  }, [])

  if (capturing) return 'black'
  return hidden ? 'blur' : null
}

export function PrivacyShield({ mode }: { mode: ShieldMode }) {
  if (!mode) return null
  return (
    <div
      role="alert"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 px-6 text-center ${
        mode === 'black' ? 'bg-black text-white/70' : 'bg-white/60 text-brand backdrop-blur-3xl'
      }`}
    >
      <ShieldCheck className="size-10" aria-hidden="true" />
      <p className="text-base font-medium">
        {mode === 'black' ? 'ไม่อนุญาตให้บันทึกภาพหน้าจอ' : 'ซ่อนข้อมูลเพื่อความปลอดภัย'}
      </p>
    </div>
  )
}
