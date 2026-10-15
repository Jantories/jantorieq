import { ChevronRight, ScanSearch, FileCheck2, Package, History } from 'lucide-react'
import { sections, services } from '@/lib/app-content'

const icons = { check: ScanSearch, certify: FileCheck2, move: Package, soon: History }

export function SectionHeader({ title, onAll }: { title: string; onAll: () => void }) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
      <button
        type="button"
        onClick={onAll}
        className="flex items-center gap-0.5 text-lg text-neutral-500 transition hover:text-brand"
      >
        {sections.seeAll}
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}

export function ServiceMenu() {
  return (
    <section aria-label={sections.services}>
      <div className="flex items-center justify-between px-5">
        <h2 className="text-[1.65rem] font-bold leading-tight text-neutral-900">{sections.services}</h2>
        <span className="flex items-center gap-0.5 text-lg text-neutral-500">
          {sections.seeAll}
          <ChevronRight className="size-5" />
        </span>
      </div>
      <ul className="mt-4 grid grid-cols-4 gap-0 px-2">
        {services.map(({ id, label, disabled }) => {
          const Icon = icons[id]
          return (
            <li key={id} className={`flex flex-col items-center gap-3 ${disabled ? 'opacity-40' : ''}`}>
              <span className="flex size-16 items-center justify-center rounded-full bg-[#eef0f6] text-brand">
                <Icon className="size-8" strokeWidth={1.75} />
              </span>
              <span className="text-balance px-1 text-center text-[0.95rem] leading-snug text-neutral-800">{label}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
