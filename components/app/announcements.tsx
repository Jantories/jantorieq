import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { SectionHeader } from './service-menu'
import { announcements, sections } from '@/lib/app-content'

export function Announcements({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <section aria-label={sections.announcements} className="mt-5">
      <SectionHeader title={sections.announcements} onAll={() => onAction(`ดู${sections.announcements}`)} />
      <ul className="mt-3 flex flex-col gap-2 px-5">
        {announcements.map((item) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => onAction(item.title)}
              className="w-full rounded-[24px] border border-neutral-300 px-5 py-3 text-left transition active:bg-neutral-50"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/images/dopa-logo.png"
                  alt=""
                  width={192}
                  height={192}
                  sizes="24px"
                  quality={95}
                  className="size-6 shrink-0"
                />
                <span className="min-w-0 flex-1 truncate text-[17px] font-bold leading-6 text-neutral-900">
                  {item.title}
                </span>
                <span className="flex shrink-0 items-center gap-0.5 text-xs text-neutral-600">
                  {item.date}
                  <ChevronRight className="size-3.5" />
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[13px] leading-[18px] text-neutral-800">{item.body}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
