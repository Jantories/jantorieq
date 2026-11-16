'use client'

import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { BackButton } from './page-parts'

type Props = { cardImage: string; onBack: () => void }

export function DocumentIdScreen({ cardImage, onBack }: Props) {
  const [isFullImageOpen, setIsFullImageOpen] = useState(false)

  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-brand">
      <header className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center px-5 pb-6 pt-[max(env(safe-area-inset-top),1.5rem)]">
        <BackButton onClick={onBack} variant="dark" />
        <h1 className="text-center text-2xl font-bold text-white">เอกสาร</h1>
        <span aria-hidden />
      </header>

      <div className="flex flex-1 flex-col rounded-t-[2rem] bg-white px-5 pb-5 pt-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-brand">เอกสารบัตรประจำตัวประชาชน</h2>
          <p className="mt-1 text-base leading-relaxed text-neutral-500">ข้อมูลหน้าบัตร รูปภาพ ชื่อ นามสกุล วันหมดอายุ</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5">
          <Image
            src={cardImage}
            alt="ภาพบัตรประจำตัวประชาชน"
            width={1294}
            height={811}
            sizes="(max-width: 448px) 92vw, 400px"
            className="block h-auto w-full"
            priority
          />
        </div>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={() => setIsFullImageOpen(true)}
            className="flex min-h-16 w-full items-center justify-center rounded-full bg-brand px-6 py-4 text-xl font-medium text-white transition hover:bg-brand-dark active:scale-[0.99]"
          >
            ดูภาพเต็ม
          </button>
        </div>
      </div>

      {isFullImageOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ภาพบัตรประจำตัวประชาชนขนาดเต็ม"
          className="fixed inset-0 z-40 mx-auto flex max-w-md items-center justify-center overflow-hidden bg-neutral-900/60 backdrop-blur-[2px]"
          onClick={() => setIsFullImageOpen(false)}
        >
          <button
            type="button"
            aria-label="ปิดภาพเต็ม"
            className="absolute left-5 top-[max(env(safe-area-inset-top),1.25rem)] z-10 flex size-11 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur transition hover:bg-white/40 active:scale-95"
            onClick={() => setIsFullImageOpen(false)}
          >
            <ChevronLeft className="size-8" strokeWidth={2.5} />
          </button>
          <div
            className="relative shrink-0 rotate-90 overflow-hidden rounded-[4.5cqw] shadow-xl"
            style={{ width: 'min(calc(var(--app-h, 100dvh) * 0.78), 140vw, 40rem)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={cardImage}
              alt="ภาพบัตรประจำตัวประชาชนขนาดเต็ม"
              width={1294}
              height={811}
              sizes="1100px"
              className="block aspect-[1.595/1] h-auto w-full object-fill"
              priority
            />
          </div>
        </div>
      )}
    </main>
  )
}
