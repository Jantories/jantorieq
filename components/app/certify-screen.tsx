import { ChevronLeft, Info } from 'lucide-react'
import { certifyPage, checkRequestsPage } from '@/lib/app-content'
import { ProfileSummary, type ProfileId } from './profile-summary'
import { HourglassLoader, useScreenReady } from './hourglass-loader'

export function CertifyScreen({ profileId, onBack }: { profileId: ProfileId; onBack: () => void }) {
  const ready = useScreenReady()

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
        <h1 className="text-center text-2xl font-bold text-white">{certifyPage.title}</h1>
      </header>

      <div className="flex flex-1 flex-col rounded-t-[2.5rem] bg-white px-5 pb-32 pt-9">
        {!ready ? (
          <HourglassLoader />
        ) : (
          <>
        <h2 className="text-center text-lg font-[100] text-neutral-800">{certifyPage.heading}</h2>

        <ProfileSummary profileId={profileId} lightText smallImage />

        <h3 className="mt-8 text-base font-[100] text-brand">{certifyPage.sectionTitle}</h3>

        <ul className="mt-2 rounded-xl border border-neutral-200 bg-[#f1f2f4] px-4">
          {certifyPage.documents.map(({ id, title, sub }) => (
            <li key={id} className="border-b border-neutral-300/70 last:border-0">
              <button type="button" className="flex w-full items-center gap-4 py-4 text-left transition active:opacity-70">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD%202569-11-16%20%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%2015.32.13-Zwk6asqu5KIC85wcf2r3NE79u8UnfT.png"
                  alt=""
                  aria-hidden="true"
                  className="size-9 shrink-0 object-contain"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-[100] leading-snug text-neutral-400">{title}</span>
                  <span className="block text-sm font-[100] leading-snug text-neutral-400">{sub}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <footer className="mt-4 space-y-0.5 text-right text-sm font-[100] leading-snug text-neutral-400">
          <p>{checkRequestsPage.copyright}</p>
          <p>{checkRequestsPage.agency}</p>
          <p>{checkRequestsPage.version}</p>
        </footer>
          </>
        )}
      </div>

      {ready && (
        <div className="pointer-events-none fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-5 pb-[max(env(safe-area-inset-bottom),1rem)]">
          <p className="pointer-events-auto flex items-center gap-3 rounded-lg bg-[#fdf5df] px-4 py-3 text-sm font-[100] text-neutral-800">
            <Info className="size-6 shrink-0 fill-[#f5a623] text-white" aria-hidden />
            {certifyPage.notice}
          </p>
        </div>
      )}
    </main>
  )
}
