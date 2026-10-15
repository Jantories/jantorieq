import { ChevronRight } from 'lucide-react'
import { sections, services } from '@/lib/app-content'

const CIRCLE = '#f1f1f7'

const icons = {
  check: '/icons/svc-check.png',
  certify: '/icons/svc-certify.png',
  move: '/icons/svc-move.png',
  soon: '/icons/svc-soon.png',
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
        {services.map(({ id, label, disabled }) => (
          <li key={id} className="flex flex-col items-center gap-2">
            <span
              style={{ backgroundColor: CIRCLE }}
              className="flex size-[62px] items-center justify-center rounded-full"
            >
              <img src={icons[id]} alt="" draggable={false} className="size-[62px]" />
            </span>
            <span
              className={`w-[76px] text-center text-sm font-medium leading-[17px] ${disabled ? 'text-neutral-400' : 'text-neutral-900'}`}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
