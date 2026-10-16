'use client'

import { useState } from 'react'

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const keyClass =
  'flex size-23 items-center justify-center rounded-full bg-brand/10 text-4xl font-medium text-brand-dark transition active:scale-95 active:bg-brand/20 disabled:opacity-60'

function BackspaceIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-11" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 5H9.5L2.5 12l7 7H20" />
      <path d="M20.5 5.5v3.5M20.5 15v3.5" />
      <path d="M11.5 9.5l5 5M16.5 9.5l-5 5" />
    </svg>
  )
}

export function PinScreen({ onUnlock, onClose }: { onUnlock: (pin: string) => boolean; onClose?: () => void }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(false)

  function submit(value: string) {
    if (value.length !== 8 || checking) return
    setChecking(true)
    window.setTimeout(() => {
      if (onUnlock(value)) {
        setPin('')
        setError(false)
      } else {
        setPin('')
        setError(true)
      }
      setChecking(false)
    }, 450)
  }

  function addDigit(digit: string) {
    if (checking) return
    const next = `${pin}${digit}`.slice(0, 8)
    setPin(next)
    setError(false)
    submit(next)
  }

  function removeDigit() {
    if (checking) return
    setPin((current) => current.slice(0, -1))
    setError(false)
  }

  return (
    <main className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-950/70 px-0 py-0 backdrop-blur-[2px] sm:px-6 sm:py-8" onClick={onClose}>
      <section className="flex min-h-[80dvh] w-full max-w-md flex-col items-center rounded-t-[2.75rem] bg-white px-6 pb-10 pt-4 shadow-xl animate-in slide-in-from-bottom duration-300 sm:min-h-0 sm:rounded-[2.75rem]" onClick={(event) => event.stopPropagation()}>
        <div className="h-[3px] w-28 rounded-full bg-neutral-300" aria-hidden />
        <h1 className="mt-6 text-lg font-normal text-brand-dark">ระบุรหัสผ่าน</h1>
        <div className="mt-6 flex gap-3" aria-label="รหัส PIN">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className={`size-5 rounded-full transition-colors ${index < pin.length ? 'bg-brand' : 'bg-brand/10'}`} />
          ))}
        </div>
        <p className={`mt-2 h-5 text-sm text-red-600 ${error ? 'opacity-100' : 'opacity-0'}`} role="alert">
          รหัส PIN ไม่ถูกต้อง
        </p>

        <div className="mt-3 grid grid-cols-3 gap-5">
          {digits.map((digit) => (
            <button key={digit} type="button" disabled={checking} onClick={() => addDigit(digit)} className={keyClass} aria-label={`เลข ${digit}`}>
              {digit}
            </button>
          ))}
          <span aria-hidden />
          <button type="button" disabled={checking} onClick={() => addDigit('0')} className={keyClass} aria-label="เลข 0">
            0
          </button>
          <button type="button" disabled={checking} onClick={removeDigit} className="flex size-23 items-center justify-center text-brand-dark transition active:scale-95 disabled:opacity-60" aria-label="ลบ">
            <BackspaceIcon />
          </button>
        </div>
        <button type="button" className="mt-14 rounded-full bg-brand/10 px-6 py-1.5 text-sm font-medium text-brand-dark transition active:bg-brand/20" onClick={() => setError(false)}>
          ลืมรหัสผ่าน
        </button>
      </section>
    </main>
  )
}
