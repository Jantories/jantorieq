import { ArrowLeftRight, ChevronLeft, House, Smile, UserPen } from 'lucide-react'
import { checkRequestsPage } from '@/lib/app-content'
import { ProfileSummary, type ProfileId } from './profile-summary'
import { HourglassLoader, useScreenReady } from './hourglass-loader'

const requestIcons = {
  person: UserPen,
  move: House,
} as const

export function CheckRequestsScreen({ profileId, onBack }: { profileId: ProfileId; onBack: () => void }) {
  const { greeting } = checkRequestsPage
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
        <h1 className="text-center text-2xl font-bold text-white">{checkRequestsPage.title}</h1>
      </header>

      <div className="flex flex-1 flex-col rounded-t-[2.5rem] bg-white px-5 pb-32 pt-9">
        {!ready ? (
          <HourglassLoader />
        ) : (
          <>
        <h2 className="text-center text-lg font-[100] text-neutral-800">{checkRequestsPage.heading}</h2>

        <ProfileSummary profileId={profileId} compact />

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-neutral-200 bg-[#f1f2f4] px-4 py-3">
          <Smile className="size-7 shrink-0 fill-[#f6c453] text-white" strokeWidth={1.5} aria-hidden />
          <div className="min-w-0">
            <p className="text-sm font-[200] leading-snug text-neutral-900">{greeting.title}</p>
            <p className="text-sm font-[100] leading-snug text-neutral-800">{greeting.sub}</p>
          </div>
        </div>

        <ul className="mt-6 rounded-xl border border-neutral-200 bg-[#f1f2f4] px-4">
          {checkRequestsPage.requests.map(({ id, title, empty }) => {
            const Icon = id === 'certify' ? null : requestIcons[id]
            return (
              <li key={id} className="flex items-center gap-4 border-b border-neutral-300/70 py-4 last:border-0">
                <span className="relative flex size-9 shrink-0 items-center justify-center text-neutral-500">
                  {id === 'certify' ? (
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD%202569-11-16%20%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%2013.08.59-0Ei3PVm5Ldx7wy14fGm9VZZ12zaqNu.png"
                      alt=""
                      aria-hidden="true"
                      className="size-8 object-contain"
                    />
                  ) : Icon ? (
                    <Icon className="size-8" strokeWidth={1.8} aria-hidden />
                  ) : null}
                  {id === 'move' && (
                    <ArrowLeftRight
                      className="absolute -bottom-0.5 left-1/2 size-4 -translate-x-1/2 bg-[#f1f2f4] text-neutral-500"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-[100] leading-snug text-neutral-400">{title}</p>
                  <p className="text-sm font-[100] leading-snug text-neutral-400">{empty}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <footer className="mt-4 space-y-0.5 text-right text-base leading-snug text-neutral-400">
          <p>{checkRequestsPage.copyright}</p>
          <p>{checkRequestsPage.agency}</p>
          <p>{checkRequestsPage.version}</p>
        </footer>
          </>
        )}
      </div>
    </main>
  )
}
