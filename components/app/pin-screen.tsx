'use client'

import { useState } from 'react'

export function PinScreen({ onUnlock }: { onUnlock: (pin: string) => boolean }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  function submit(value: string) {
    if (value.length !== 6) return
    if (onUnlock(value)) {
      setPin('')
      setError(false)
    } else {
      setPin('')
      setError(true)
    }
  }

  function addDigit(digit: string) {
    const next = `${pin}${digit}`.slice(0, 6)
    setPin(next)
    setError(false)
    submit(next)
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-brand px-6 py-8">
      <section className="flex w-full max-w-sm flex-col items-center rounded-[2rem] bg-white px-6 py-10 shadow-xl">
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-white">M</div>
        <h1 className="text-2xl font-bold text-brand-dark">เข้าสู่ระบบ</h1>
        <p className="mt-2 text-center text-sm text-neutral-600">กรุณาใส่รหัส PIN 6 หลักเพื่อเข้าสู่ระบบ</p>

        <div className="mt-8 flex gap-3" aria-label="รหัส PIN">
          {Array.from({ length: 6 }, (_, index) => (
            <span key={index} className={`size-3 rounded-full border-2 border-brand ${index < pin.length ? 'bg-brand' : 'bg-transparent'}`} />
          ))}
        </div>
        <p className={`mt-4 min-h-5 text-sm text-red-600 ${error ? 'opacity-100' : 'opacity-0'}`} role="alert">
          รหัส PIN ไม่ถูกต้อง
        </p>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button key={digit} type="button" onClick={() => addDigit(digit)} className="flex size-16 items-center justify-center rounded-full bg-page text-xl font-medium text-brand-dark transition hover:bg-brand/10 active:scale-95" aria-label={`เลข ${digit}`}>
              {digit}
            </button>
          ))}
          <span aria-hidden />
          <button type="button" onClick={() => addDigit('0')} className="flex size-16 items-center justify-center rounded-full bg-page text-xl font-medium text-brand-dark transition hover:bg-brand/10 active:scale-95" aria-label="เลข 0">0</button>
          <button type="button" onClick={() => { setPin(''); setError(false) }} className="flex size-16 items-center justify-center text-sm text-brand-dark" aria-label="ล้างรหัส">ล้าง</button>
        </div>
      </section>
    </main>
  )
}
