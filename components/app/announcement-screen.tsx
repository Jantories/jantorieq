import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { announcementPage, announcements } from '@/lib/app-content'

type AnnouncementDetail = NonNullable<(typeof announcements)[number]['detail']>

export function AnnouncementScreen({ detail, onBack }: { detail: AnnouncementDetail; onBack: () => void }) {
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
        <h1 className="text-center text-2xl font-bold text-white">{announcementPage.title}</h1>
      </header>

      <div className="flex flex-1 flex-col rounded-t-[2.5rem] bg-white px-5 pb-28 pt-8">
        <article>
          <div className="flex items-center gap-3">
            <Image
              src="/images/dopa-logo.png"
              alt=""
              width={192}
              height={192}
              sizes="56px"
              quality={95}
              className="size-14 shrink-0"
            />
            <div className="min-w-0">
              <h2 className="text-xl font-bold leading-snug text-brand text-balance">{detail.heading}</h2>
              <p className="text-sm text-neutral-600">{detail.received}</p>
            </div>
          </div>

          <p className="mt-9 px-2 text-xl leading-relaxed text-neutral-900">{detail.body}</p>
          {detail.link && (
            <a
              href={detail.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block break-all px-2 text-xl leading-relaxed text-[#3b82d6] underline-offset-2 hover:underline"
            >
              {detail.link}
            </a>
          )}
          {'afterLink' in detail && detail.afterLink && (
            <p className="px-2 text-xl leading-relaxed text-neutral-900">{detail.afterLink}</p>
          )}
        </article>
      </div>

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-md -translate-x-1/2 bg-white px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3">
        <button
          type="button"
          onClick={onBack}
          data-no-loader
          className="h-14 w-full rounded-full bg-brand text-xl text-white transition active:scale-[0.98]"
        >
          {announcementPage.back}
        </button>
      </div>
    </main>
  )
}
