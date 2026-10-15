import { nav } from '@/lib/app-content'

export type TabId = 'home' | 'docs' | 'history' | 'settings'

export const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'home', label: nav.home, icon: '/icons/nav-home.png' },
  { id: 'docs', label: nav.docs, icon: '/icons/nav-docs.png' },
  { id: 'history', label: nav.history, icon: '/icons/nav-history.png' },
  { id: 'settings', label: nav.settings, icon: '/icons/nav-settings.png' },
]

type Props = { active: TabId; onChange: (t: TabId) => void; onScan: () => void }

function MaskIcon({ src, className }: { src: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block bg-current ${className}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}

export function BottomNav({ active, onChange, onScan }: Props) {
  const renderTab = ({ id, label, icon }: (typeof tabs)[number]) => {
    const isActive = id === active
    return (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        aria-current={isActive ? 'page' : undefined}
        className={`flex flex-1 flex-col items-center pt-2.5 transition ${isActive ? 'text-[#1f1bc9]' : 'text-[#666666] hover:text-neutral-800'}`}
      >
        <MaskIcon src={icon} className="size-7" />
        <span className="mt-1.5 text-sm font-medium leading-[17px]">{label}</span>
        <span className="mt-2 h-[3px] w-8 rounded-full bg-transparent" />
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
            <MaskIcon src="/icons/nav-scan.png" className="size-[37px]" />
          </button>
          <span className="absolute left-1/2 top-[41px] -translate-x-1/2 text-sm font-medium leading-[17px] text-[#666666]">
            {nav.scan}
          </span>
        </div>
        {tabs.slice(2).map(renderTab)}
      </div>
    </nav>
  )
}
