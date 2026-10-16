'use client'

import { ArrowLeft } from 'lucide-react'

type Props = { onBack: () => void }

export function ScanScreen({ onBack }: Props) {
  return (
    <main className="flex flex-1 flex-col bg-white pb-8" aria-label="หน้าสแกน QR Code">
      <header className="flex items-center bg-brand-dark px-5 pb-5 pt-[max(env(safe-area-inset-top),1rem)] text-white">
        <button
          type="button"
          onClick={onBack}
          aria-label="ย้อนกลับ"
          className="flex size-10 items-center justify-center rounded-full transition hover:bg-white/10 active:scale-95"
        >
          <ArrowLeft className="size-6" aria-hidden="true" />
        </button>
        <h1 className="flex-1 pr-10 text-center text-xl font-semibold tracking-wide">QR CODE</h1>
      </header>

      <section className="flex flex-1 flex-col items-center px-6 pt-16 text-center">
        <div className="relative flex size-64 items-center justify-center" aria-label="พื้นที่สำหรับสแกน QR Code">
          <div className="absolute inset-0 rounded-2xl border-2 border-brand-dark/15" />
          <span className="absolute left-0 top-0 size-10 rounded-tl-2xl border-l-4 border-t-4 border-brand-dark" />
          <span className="absolute right-0 top-0 size-10 rounded-tr-2xl border-r-4 border-t-4 border-brand-dark" />
          <span className="absolute bottom-0 left-0 size-10 rounded-bl-2xl border-b-4 border-l-4 border-brand-dark" />
          <span className="absolute bottom-0 right-0 size-10 rounded-br-2xl border-b-4 border-r-4 border-brand-dark" />
          <div className="size-36 rounded-xl border border-dashed border-neutral-300" aria-hidden="true" />
        </div>

        <h2 className="mt-10 text-2xl font-semibold text-brand-dark">สแกน QR</h2>
        <p className="mt-3 max-w-xs text-base leading-relaxed text-neutral-600">
          วาง QR Code ให้อยู่ในพื้นที่ที่กำหนด
        </p>
      </section>
    </main>
  )
}
