'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const visibleDurationMs = 3000
const exitDurationMs = 250

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leaveId = window.setTimeout(() => setLeaving(true), visibleDurationMs)
    const doneId = window.setTimeout(onDone, visibleDurationMs + exitDurationMs)
    return () => {
      window.clearTimeout(leaveId)
      window.clearTimeout(doneId)
    }
  }, [onDone])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center bg-white px-8 pb-[max(env(safe-area-inset-bottom),2rem)] pt-[max(env(safe-area-inset-top),2rem)] transition-opacity ease-out ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${exitDurationMs}ms` }}
    >
      <span className="sr-only">กำลังโหลด</span>

      <div className="flex flex-1 flex-col items-center justify-center">
        <Image
          src="/app-icon/icon-512.png"
          alt="ThaID"
          width={512}
          height={512}
          priority
          className="splash-logo-pop size-32 rounded-[26%] shadow-lg ring-1 ring-black/5"
        />

        <div className="mt-8 h-1.5 w-44 overflow-hidden rounded-full bg-neutral-200" aria-hidden>
          <div className="splash-bar h-full w-full origin-left rounded-full bg-brand" />
        </div>

        <div className="splash-fade-in mt-14 text-center">
          <p className="text-2xl font-semibold text-brand text-balance">สถิตอยู่ในใจตราบนิรันดร์</p>
          <p className="mt-2 text-sm text-neutral-700 text-balance">น้อมสำนึกในพระมหากรุณาธิคุณอันหาที่สุดมิได้</p>
          <div className="mx-auto mt-5 flex w-56 items-center gap-2" aria-hidden>
            <span className="h-px flex-1 bg-neutral-300" />
            <span className="size-1.5 rotate-45 bg-brand/60" />
            <span className="h-px flex-1 bg-neutral-300" />
          </div>
          <p className="mt-5 text-xs leading-relaxed text-neutral-500 text-balance">
            ข้าพระพุทธเจ้า ผู้บริหาร ข้าราชการ พนักงานและเจ้าหน้าที่
            <br />
            กรมการปกครอง
          </p>
        </div>
      </div>

      <div className="splash-fade-in flex flex-col items-center gap-2">
        <p className="text-[11px] font-medium tracking-widest text-neutral-500">POWERED BY</p>
        <Image src="/images/dopa-logo.png" alt="กรมการปกครอง" width={96} height={96} className="size-10" />
      </div>
    </div>
  )
}
