import { Landmark } from 'lucide-react'
import { SectionHeader } from './service-menu'
import { announcements, sections } from '@/lib/app-content'

export function Announcements({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <section aria-label={sections.announcements} className="mt-6">
      <SectionHeader title={sections.announcements} onAll={() => onAction(`ดู${sections.announcements}`)} />
      <ul className="mt-5 flex flex-col gap-3 px-5">
        {announcements.map((item) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => onAction(item.title)}
              className="w-full rounded-3xl border-2 border-neutral-200 px-5 py-4 text-left transition hover:border-brand/30 active:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-600 text-white ring-2 ring-amber-200">
                  <Landmark className="size-5" />
                </span>
                <span className="min-w-0 flex-1 truncate text-xl font-bold text-neutral-900">{item.title}</span>
                <span className="shrink-0 text-base text-neutral-500">{item.date}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-base leading-relaxed text-neutral-800">{item.body}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
