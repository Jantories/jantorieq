'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const logoMs = 250
const firstStepMs = logoMs + 350
const secondStepMs = logoMs + 1500
const leaveMs = logoMs + 2800
const doneMs = logoMs + 3000

type Phase = 'logo' | 'page'

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('logo')
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase('page'), logoMs),
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
      } ${phase === 'logo' ? 'bg-white' : 'bg-[#23242f]'}`}
    >
      <span className="sr-only">กำลังโหลด</span>

      <div
        className={`relative aspect-[846/1848] [container-type:inline-size] ${phase === 'logo' ? 'invisible' : ''}`}
        style={{ width: 'min(100vw, calc(100dvh * 0.4578))' }}
      >
        <Image
          src="/splash/background.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 500px) 430px, 100vw"
          className="object-cover"
        />

        <div
          className="absolute left-[29.2cqw] top-[122.7cqw] h-[1.45cqw] w-[41.8cqw] overflow-hidden rounded-full bg-black"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-[#c1c3de]"
            style={{
              width: `${progress}%`,
              transitionProperty: 'width',
              transitionDuration: progress === 50 ? '1000ms' : '400ms',
              transitionTimingFunction: progress === 50 ? 'ease-in-out' : 'ease-out',
            }}
          />
        </div>
      </div>

      {phase === 'logo' && (
        <Image
          src="/app-icon/icon-512.png"
          alt="ThaID"
          width={512}
          height={512}
          priority
          className="absolute w-[min(32vw,calc(100dvh*0.15))]"
        />
      )}
    </div>
  )
}
