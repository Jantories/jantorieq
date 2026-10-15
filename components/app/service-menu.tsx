import { ChevronRight, FileSearch, FileCheck, Package, History } from 'lucide-react'

const services = [
  { icon: FileSearch, label: 'ตรวจสอบคำขอ', disabled: false },
  { icon: FileCheck, label: 'การรับรองเอกสาร', disabled: false },
  { icon: Package, label: 'การแจ้งย้ายที่อยู่', disabled: false },
  { icon: History, label: 'เร็วๆ นี้', disabled: true },
]

export function SectionHeader({ title, onAll }: { title: string; onAll: () => void }) {
  return (
    <div className="flex items-center justify-between px-5">
      <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
      <button
        type="button"
        onClick={onAll}
        className="flex items-center gap-0.5 text-sm text-neutral-500 hover:text-brand"
      >
        ทั้งหมด
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}

export function ServiceMenu({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <section aria-labelledby="services">
      <SectionHeader title="เมนูบริการ" onAll={() => onAction('ดูเมนูบริการทั้งหมด')} />
      <ul className="mt-4 grid grid-cols-4 gap-2 px-3">
        {services.map(({ icon: Icon, label, disabled }) => (
          <li key={label}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onAction(label)}
              className="group flex w-full flex-col items-center gap-2 disabled:opacity-40"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-brand-soft text-brand transition group-enabled:group-hover:bg-brand group-enabled:group-hover:text-white group-active:scale-95">
                <Icon className="size-7" />
              </span>
              <span className="text-center text-sm leading-snug text-neutral-800">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
