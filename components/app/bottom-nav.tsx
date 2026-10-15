import { House, FileText, History, SlidersHorizontal } from 'lucide-react'
import { nav } from '@/lib/app-content'

export type TabId = 'home' | 'docs' | 'history' | 'settings'

export const tabs: { id: TabId; label: string; icon: typeof House }[] = [
  { id: 'home', label: nav.home, icon: House },
  { id: 'docs', label: nav.docs, icon: FileText },
  { id: 'history', label: nav.history, icon: History },
  { id: 'settings', label: nav.settings, icon: SlidersHorizontal },
]

type Props = { active: TabId; onChange: (t: TabId) => void; onScan: () => void }

function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8V6a3 3 0 0 1 3-3h2M16 3h2a3 3 0 0 1 3 3v2M21 16v2a3 3 0 0 1-3 3h-2M8 21H6a3 3 0 0 1-3-3v-2" />
      <circle cx="8" cy="12" r="0.6" fill="currentColor" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      <circle cx="16" cy="12" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function BottomNav({ active, onChange, onScan }: Props) {
  const renderTab = ({ id, label, icon: Icon }: (typeof tabs)[number]) => {
    const isActive = id === active
    return (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        aria-current={isActive ? 'page' : undefined}
        className={`flex flex-1 flex-col items-center pt-2.5 transition ${isActive ? 'text-brand' : 'text-neutral-500 hover:text-neutral-700'}`}
      >
        <Icon className="size-7" strokeWidth={2} />
        <span className="mt-1.5 text-sm font-medium leading-[17px]">{label}</span>
        <span className={`mt-2 h-[3px] w-8 rounded-full ${isActive ? 'bg-brand' : 'bg-transparent'}`} />
      </button>
    )
  }

  return (
    <nav
      aria-label="เมนูหลัก"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-neutral-200 bg-white pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <div className="flex items-stretch">
        {tabs.slice(0, 2).map(renderTab)}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={onScan}
            aria-label={nav.scan}
            className="absolute -top-7 left-1/2 flex size-[62px] -translate-x-1/2 items-center justify-center rounded-full bg-brand text-white shadow-lg transition active:scale-95"
          >
            <ScanIcon />
          </button>
          <span className="absolute left-1/2 top-[41px] -translate-x-1/2 text-sm font-medium leading-[17px] text-neutral-500">
            {nav.scan}
          </span>
        </div>
        {tabs.slice(2).map(renderTab)}
      </div>
    </nav>
  )
}
