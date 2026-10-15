import { House, FileText, History, SlidersHorizontal, ScanLine } from 'lucide-react'

export type TabId = 'home' | 'docs' | 'history' | 'settings'

export const tabs: { id: TabId; label: string; icon: typeof House }[] = [
  { id: 'home', label: 'หน้าหลัก', icon: House },
  { id: 'docs', label: 'เอกสาร', icon: FileText },
  { id: 'history', label: 'ประวัติ', icon: History },
  { id: 'settings', label: 'ตั้งค่า', icon: SlidersHorizontal },
]

type Props = { active: TabId; onChange: (t: TabId) => void; onScan: () => void }

export function BottomNav({ active, onChange, onScan }: Props) {
  const left = tabs.slice(0, 2)
  const right = tabs.slice(2)

  const renderTab = ({ id, label, icon: Icon }: (typeof tabs)[number]) => {
    const isActive = id === active
    return (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        aria-current={isActive ? 'page' : undefined}
        className={`flex flex-1 flex-col items-center gap-1 pt-3 ${isActive ? 'text-brand' : 'text-neutral-500'}`}
      >
        <Icon className="size-7" strokeWidth={isActive ? 2.25 : 1.75} />
        <span className="text-xs font-medium">{label}</span>
        <span className={`h-1 w-8 rounded-full ${isActive ? 'bg-brand' : 'bg-transparent'}`} />
      </button>
    )
  }

  return (
    <nav
      aria-label="เมนูหลัก"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-neutral-200 bg-white pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <div className="flex items-end">
        {left.map(renderTab)}
        <div className="flex flex-1 flex-col items-center">
          <button
            type="button"
            onClick={onScan}
            aria-label="สแกน"
            className="-mt-8 flex size-16 items-center justify-center rounded-full bg-brand text-white shadow-lg ring-4 ring-white transition active:scale-95"
          >
            <ScanLine className="size-8" />
          </button>
          <span className="mt-1 pb-2 text-xs font-medium text-neutral-500">สแกน</span>
        </div>
        {right.map(renderTab)}
      </div>
    </nav>
  )
}
