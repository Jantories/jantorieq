'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const pageStartMs = 400
const firstStepMs = pageStartMs + 30
const secondStepMs = 1100
const leaveMs = 1800
const doneMs = 2000

type Phase = 'logo' | 'page'

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('logo')
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase('page'), pageStartMs),
      window.setTimeout(() => setProgress(15), firstStepMs),
      window.setTimeout(() => setProgress(50), secondStepMs),
      window.setTimeout(() => setLeaving(true), leaveMs),
      window.setTimeout(onDone, doneMs),
    ]
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [onDone])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-200 ease-out ${
        leaving ? 'opacity-0' : 'opacity-100'
      } ${phase === 'logo' ? 'bg-white' : 'splash-dark-bg'}`}
    >
      <span className="sr-only">กำลังโหลด</span>

      <div
        className="relative aspect-[860/1864] [container-type:inline-size]"
        style={{ width: 'min(100vw, calc(100dvh * 0.4613))' }}
      >
        {phase === 'logo' ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/app-icon/icon-512.png"
              alt="ThaID"
              width={512}
              height={512}
              priority
              className="splash-logo-pop w-[20cqw] rounded-[26%]"
            />
          </div>
        ) : (
          <div className="splash-page-in absolute inset-0 text-white">
            <Image
              src="/splash/portrait.png"
              alt=""
              width={490}
              height={535}
              priority
              className="absolute left-[22.33cqw] top-[25.35cqw] w-[56.98cqw]"
            />

            <Image
              src="/splash/thaid-logo.png"
              alt="ThaID ไทยดี"
              width={420}
              height={170}
              priority
              className="absolute left-[25.81cqw] top-[98.02cqw] w-[48.84cqw]"
            />

            <div
              className="absolute left-[29.4cqw] top-[121.6cqw] h-[1.4cqw] w-[41.2cqw] overflow-hidden rounded-full bg-black"
              aria-hidden
            >
              <div
                className="h-full rounded-full bg-[#c1c3de] ease-out"
                style={{
                  width: `${progress}%`,
                  transitionProperty: 'width',
                  transitionDuration: progress === 50 ? '500ms' : '400ms',
                  transitionTimingFunction: progress === 50 ? 'ease-in-out' : 'ease-out',
                }}
              />
            </div>

            <p className="absolute inset-x-0 top-[133.6cqw] text-center text-[5.2cqw] font-medium leading-[6cqw] whitespace-nowrap">
              สถิตอยู่ในใจตราบนิรันดร์
            </p>
            <p className="absolute inset-x-0 top-[141.4cqw] text-center text-[3.1cqw] leading-[4cqw] whitespace-nowrap">
              น้อมสำนึกในพระมหากรุณาธิคุณอันหาที่สุดมิได้
            </p>

            <div className="absolute left-[20cqw] top-[150.4cqw] flex w-[60cqw] items-center gap-[1.2cqw]" aria-hidden>
              <span className="h-[0.15cqw] flex-1 bg-gradient-to-r from-white/10 to-white/45" />
              <span className="size-[1.9cqw] rotate-45 border-[0.2cqw] border-white/55" />
              <span className="h-[0.15cqw] flex-1 bg-gradient-to-l from-white/10 to-white/45" />
            </div>

            <p className="absolute inset-x-0 top-[156.3cqw] text-center text-[2.4cqw] leading-[3.5cqw] text-[#cfd0d8]">
              ข้าพระพุทธเจ้า ผู้บริหาร ข้าราชการ พนักงานและเจ้าหน้าที่
              <br />
              กรมการปกครอง
            </p>

            <p className="absolute inset-x-0 top-[188.5cqw] text-center text-[2.6cqw] leading-[3cqw]">POWERED BY</p>
            <Image
              src="/splash/powered-by-logos.png"
              alt="กรมการปกครอง และ Digital Economy and Society Development Fund"
              width={455}
              height={125}
              priority
              className="absolute left-[23.49cqw] top-[192.2cqw] w-[52.9cqw]"
            />
          </div>
        )}
      </div>
    </div>
  )
}
