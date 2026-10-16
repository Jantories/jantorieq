'use client'

import { useState } from 'react'

const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export function PinScreen({ onUnlock }: { onUnlock: (pin: string) => boolean }) {
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

  function clearPin() {
    setPin('')
    setError(false)
  }

  return (
    <main className="flex min-h-dvh items-end justify-center bg-brand px-0 py-0 sm:items-center sm:px-6 sm:py-8">
      <section className="flex min-h-[78dvh] w-full max-w-md flex-col items-center rounded-t-[2.75rem] bg-white px-6 pb-10 pt-8 shadow-xl sm:min-h-0 sm:rounded-[2.75rem] sm:py-10">
        <div className="h-1.5 w-16 rounded-full bg-neutral-300" aria-hidden />
        <div className="mb-5 mt-8 flex size-14 items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-white">M</div>
        <h1 className="text-2xl font-bold text-brand-dark">ระบุรหัสผ่าน</h1>
        <p className="mt-2 text-center text-sm text-neutral-600">กรุณาใส่รหัส PIN 8 หลักเพื่อเข้าสู่ระบบ</p>

        <div className="mt-7 flex gap-2.5" aria-label="รหัส PIN">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className={`size-3 rounded-full border-2 border-brand ${index < pin.length ? 'bg-brand' : 'bg-page'}`} />
          ))}
        </div>
        <p className={`mt-4 min-h-5 text-sm text-red-600 ${error ? 'opacity-100' : 'opacity-0'}`} role="alert">
          รหัส PIN ไม่ถูกต้อง
        </p>

        <div className="mt-4 grid grid-cols-3 gap-x-8 gap-y-4">
          {digits.map((digit) => (
            <button key={digit} type="button" disabled={checking} onClick={() => addDigit(digit)} className="flex size-20 items-center justify-center rounded-full bg-page text-3xl font-medium text-brand-dark transition hover:bg-brand/10 active:scale-95 disabled:opacity-60" aria-label={`เลข ${digit}`}>
              {digit}
            </button>
          ))}
          <span aria-hidden />
          <button type="button" disabled={checking} onClick={() => addDigit('0')} className="flex size-20 items-center justify-center rounded-full bg-page text-3xl font-medium text-brand-dark transition hover:bg-brand/10 active:scale-95 disabled:opacity-60" aria-label="เลข 0">0</button>
          <button type="button" disabled={checking} onClick={clearPin} className="flex size-20 items-center justify-center text-sm text-brand-dark disabled:opacity-60" aria-label="ล้างรหัส">ล้างรหัส</button>
        </div>
        <p className={`mt-6 text-sm text-brand-dark transition-opacity ${checking ? 'opacity-100' : 'opacity-0'}`} aria-live="polite">กำลังตรวจสอบรหัส...</p>
      </section>
    </main>
  )
}
