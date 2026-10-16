'use client'

import { useState } from 'react'
import { LockKeyhole } from 'lucide-react'

type Props = { onUnlock: (pin: string) => void }

export function PinLockScreen({ onUnlock }: Props) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (pin === '111111' || pin === '222222') {
      onUnlock(pin)
      return
    }
    setError(true)
    setPin('')
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-brand px-6">
      <form onSubmit={submit} className="flex w-full max-w-sm flex-col items-center gap-6 rounded-[2rem] bg-white px-7 py-9 text-center shadow-xl">
        <div className="flex size-16 items-center justify-center rounded-full bg-brand text-white">
          <LockKeyhole className="size-8" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-brand-dark">เข้าสู่ระบบ</h1>
          <p className="text-sm text-neutral-600">กรุณาใส่รหัส PIN เพื่อดูบัตรของคุณ</p>
        </div>
        <label className="sr-only" htmlFor="pin">รหัส PIN</label>
        <input
          id="pin"
          inputMode="numeric"
          autoComplete="off"
          type="password"
          maxLength={6}
          value={pin}
          onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setError(false) }}
          placeholder="รหัส PIN 6 หลัก"
          className="h-14 w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 text-center text-2xl tracking-[0.5em] text-neutral-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {error && <p className="text-sm text-red-600">รหัส PIN ไม่ถูกต้อง</p>}
        <button type="submit" disabled={pin.length !== 6} className="h-12 w-full rounded-2xl bg-brand text-base font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50">
          เข้าสู่หน้าบัตร
        </button>
      </form>
    </main>
  )
}

export type UserCard = {
  name: string
  number: string
  nameTh: string
  nameEn: string
}

export const users: Record<string, UserCard> = {
  '111111': { name: 'คุณ ไอย์ณพงศ์ ริ้วศรีกุล', number: '1 2345 67890 12 3', nameTh: 'นาย ชื่อ นามสกุล', nameEn: 'Mr. Firstname Lastname' },
  '222222': { name: 'คุณ ผู้ใช้งานคนที่สอง', number: '9 8765 43210 98 7', nameTh: 'นาย ผู้ใช้งาน คนที่สอง', nameEn: 'Mr. Second User' },
}

export function getUser(pin: string) {
  return users[pin]
}
