'use client'

import { useState } from 'react'
import { ChevronLeft, RefreshCw, Send } from 'lucide-react'
import { movePage } from '@/lib/app-content'
import { CroppedImage } from './cropped-image'
import { HourglassLoader, useScreenReady } from './hourglass-loader'

const ID_LENGTH = 13

export function MoveScreen({ onBack }: { onBack: () => void }) {
  const screenReady = useScreenReady()
  const [idNumber, setIdNumber] = useState('')
  const [sent, setSent] = useState(false)

  const ready = idNumber.length === ID_LENGTH
  const status = sent ? movePage.statusSent : ready ? movePage.statusReady : movePage.statusEmpty

  const reset = () => {
    setIdNumber('')
    setSent(false)
  }

  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-brand">
      <header className="grid grid-cols-[4rem_1fr_4rem] items-center px-5 pb-6 pt-[max(env(safe-area-inset-top),1.5rem)]">
        <button
          type="button"
          onClick={onBack}
          aria-label="ย้อนกลับ"
          className="flex size-14 items-center justify-center rounded-full bg-brand-dark text-white transition hover:bg-brand-dark/80 active:scale-95"
        >
          <ChevronLeft className="size-8" strokeWidth={2.5} />
        </button>
        <h1 className="text-center text-2xl font-bold text-white">{movePage.title}</h1>
      </header>

      <div className="flex flex-1 flex-col rounded-t-[2.5rem] bg-white px-4 pb-16 pt-14">
        {!screenReady ? (
          <HourglassLoader />
        ) : (
          <>
        <section className="rounded-md bg-white p-1.5 shadow-[0_1px_6px_rgba(0,0,0,0.18)]">
          <h2 className="bg-brand px-4 py-5 text-center text-xl font-medium text-white">{movePage.cardTitle}</h2>

          <form
            className="px-3 pb-6 pt-5"
            onSubmit={(event) => {
              event.preventDefault()
              if (ready) setSent(true)
            }}
          >
            <label htmlFor="host-id" className="block text-lg text-brand">
              {movePage.label}
            </label>
            <input
              id="host-id"
              inputMode="numeric"
              autoComplete="off"
              maxLength={ID_LENGTH}
              value={idNumber}
              disabled={sent}
              onChange={(event) => setIdNumber(event.target.value.replace(/\D/g, ''))}
              placeholder={movePage.placeholder}
              className="mt-3 h-14 w-full rounded-md border border-neutral-400 bg-white px-4 text-lg text-neutral-800 outline-none placeholder:text-neutral-500 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:bg-neutral-100"
            />

            <div className="mt-9 flex items-center gap-5">
              <button
                type="submit"
                disabled={!ready || sent}
                className="flex h-14 flex-1 items-center justify-between rounded-md bg-brand px-4 text-lg text-white transition active:scale-[0.98] disabled:bg-neutral-200 disabled:text-neutral-500"
              >
                {movePage.send}
                <Send className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex h-14 flex-1 items-center justify-between rounded-md border border-brand px-4 text-lg text-brand transition hover:bg-brand/5 active:scale-[0.98]"
              >
                {movePage.reset}
                <RefreshCw className="size-5" aria-hidden />
              </button>
            </div>

            <p className="mt-5 text-lg text-brand">{movePage.statusLabel}</p>
            <p
              role="status"
              aria-live="polite"
              className="mt-5 rounded-md bg-neutral-200 px-4 py-5 text-center text-lg text-neutral-700 shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
            >
              {status}
            </p>
          </form>
        </section>

        <div className="mt-5 overflow-hidden rounded-t-xl rounded-b-[2rem] bg-gradient-to-r from-brand via-[#2f3277] to-brand-dark px-6 pb-8 pt-5 shadow-[4px_4px_0_rgba(26,28,84,0.9)]">
          <p className="text-right text-xs font-bold text-white">{movePage.book.code}</p>
          <div className="mx-auto mt-1 w-28 [mask-image:radial-gradient(closest-side,#000_70%,transparent)]">
            <CroppedImage
              src={movePage.book.emblem.src}
              natural={movePage.book.emblem.natural}
              crop={movePage.book.emblem.crop}
              alt="ตราครุฑ"
              className="aspect-[128/136] w-full"
            />
          </div>
          <p className="mt-3 text-center text-2xl font-medium text-[#e8c75a]">{movePage.book.title}</p>
          <p className="mt-8 flex justify-center gap-5 text-lg text-[#e8c75a]">
            <span>{movePage.book.agency}</span>
            <span>{movePage.book.ministry}</span>
          </p>
        </div>
          </>
        )}
      </div>
    </main>
  )
}
