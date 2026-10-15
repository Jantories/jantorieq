import { House, FileText, History, SlidersHorizontal, ScanLine } from 'lucide-react'
import { nav } from '@/lib/app-content'

export type TabId = 'home' | 'docs' | 'history' | 'settings'

export const tabs: { id: TabId; label: string; icon: typeof House }[] = [
  { id: 'home', label: nav.home, icon: House },
  { id: 'docs', label: nav.docs, icon: FileText },
  { id: 'history', label: nav.history, icon: History },
  { id: 'settings', label: nav.settings, icon: SlidersHorizontal },
]

type Props = { active: TabId; onChange: (t: TabId) => void; onScan: () => void }

export function BottomNav({ active, onChange, onScan }: Props) {
  const renderTab = ({ id, label, icon: Icon }: (typeof tabs)[number]) => {
    const isActive = id === active
    return (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        aria-current={isActive ? 'page' : undefined}
        className={`flex flex-1 flex-col items-center gap-1 pt-3 transition ${isActive ? 'text-brand' : 'text-neutral-500 hover:text-neutral-700'}`}
      >
        <Icon className="size-7" strokeWidth={isActive ? 2 : 1.6} />
        <span className="text-sm">{label}</span>
        <span className={`h-1 w-10 rounded-full ${isActive ? 'bg-brand' : 'bg-transparent'}`} />
      </button>
    )
  }

  return (
    <nav
      aria-label="เมนูหลัก"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-neutral-200 bg-white pb-[max(env(safe-area-inset-bottom),0.75rem)]"
    >
      <div className="flex items-end">
        {tabs.slice(0, 2).map(renderTab)}
        <div className="flex flex-1 flex-col items-center">
          <button
            type="button"
            onClick={onScan}
            aria-label={nav.scan}
            className="-mt-9 flex size-16 items-center justify-center rounded-full bg-brand text-white shadow-lg transition active:scale-95"
          >
            <ScanLine className="size-7" strokeWidth={1.75} />
          </button>
          <span className="mt-2 pb-2 text-sm text-neutral-500">{nav.scan}</span>
        </div>
        {tabs.slice(2).map(renderTab)}
      </div>
    </nav>
  )
}
