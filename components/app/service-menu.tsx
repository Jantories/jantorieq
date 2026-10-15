import { ChevronRight, FileCheck2, History } from 'lucide-react'
import { sections, services } from '@/lib/app-content'

const CIRCLE = '#eef0f6'

function CheckRequestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="3.5" width="19" height="17" rx="3.5" />
      <circle cx="10.5" cy="9.5" r="2.4" />
      <path d="M6 16.5c.5-2.2 2.2-3.4 4.5-3.4" />
      <circle cx="15.2" cy="14.6" r="3.1" fill="none" />
      <path d="m17.6 17 2.4 2.4" />
    </svg>
  )
}

function MoveIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.6 20.4 7.3v9.4L12 21.4 3.6 16.7V7.3Z" />
      <path d="M3.6 7.3 12 12l8.4-4.7M12 12v9.4M7.8 4.9l8.4 4.7" fill="none" stroke={CIRCLE} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

const icons = {
  check: CheckRequestIcon,
  certify: () => <FileCheck2 className="size-7" strokeWidth={1.8} />,
  move: MoveIcon,
  soon: () => <History className="size-7" strokeWidth={1.8} />,
}

export function SectionHeader({ title, onAll }: { title: string; onAll: () => void }) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 className="text-lg font-bold leading-6 text-neutral-900">{title}</h2>
      <button
        type="button"
        onClick={onAll}
        className="flex items-center gap-0.5 text-sm text-neutral-500 transition hover:text-brand"
      >
        {sections.seeAll}
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}

export function ServiceMenu() {
  return (
    <section aria-label={sections.services}>
      <div className="flex items-center justify-between px-5">
        <h2 className="text-lg font-bold leading-6 text-neutral-900">{sections.services}</h2>
        <span className="flex items-center gap-0.5 text-sm text-neutral-500">
          {sections.seeAll}
          <ChevronRight className="size-4" />
        </span>
      </div>
      <ul className="mt-3.5 grid grid-cols-4 px-2">
        {services.map(({ id, label, disabled }) => {
          const Icon = icons[id]
          return (
            <li key={id} className={`flex flex-col items-center gap-2 ${disabled ? 'opacity-40' : ''}`}>
              <span
                style={{ backgroundColor: CIRCLE }}
                className="flex size-[62px] items-center justify-center rounded-full text-brand"
              >
                <Icon />
              </span>
              <span className="w-[76px] text-center text-sm font-medium leading-[17px] text-neutral-900">{label}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
