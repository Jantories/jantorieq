import { ChevronLeft } from 'lucide-react'
import { tabs, type TabId } from './bottom-nav'

export function PlaceholderTab({ tab, onBack }: { tab: TabId; onBack: () => void }) {
  const current = tabs.find((t) => t.id === tab)!
  const Icon = current.icon
  return (
    <main className="flex flex-1 flex-col pb-28">
      <header className="flex items-center gap-2 bg-brand px-3 pb-4 pt-[max(env(safe-area-inset-top),1.25rem)] text-white">
        <button
          type="button"
          onClick={onBack}
          aria-label="กลับหน้าหลัก"
          className="flex size-10 items-center justify-center rounded-full hover:bg-white/10"
        >
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-bold">{current.label}</h1>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Icon className="size-9" />
        </span>
        <p className="text-lg font-semibold text-neutral-900">{current.label}</p>
        <p className="text-sm text-neutral-500">หน้านี้พร้อมสำหรับเพิ่มเนื้อหาในขั้นตอนถัดไป</p>
      </div>
    </main>
  )
}
