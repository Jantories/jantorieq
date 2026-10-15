'use client'

import { useCallback, useRef, useState } from 'react'
import { MessageCircleMore } from 'lucide-react'
import { AppHeader } from './app-header'
import { HeroCard } from './hero-card'
import { ServiceMenu } from './service-menu'
import { BannerCarousel } from './banner-carousel'
import { Announcements } from './announcements'
import { BottomNav, type TabId } from './bottom-nav'
import { PlaceholderTab } from './placeholder-tab'

export function AppShell() {
  const [tab, setTab] = useState<TabId>('home')
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const notify = useCallback((message: string) => {
    setToast(message)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 1800)
  }, [])

  return (
    <div className="min-h-dvh bg-neutral-200">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-white shadow-xl">
        {tab === 'home' ? (
          <main className="flex-1 pb-28">
            <section className="bg-brand pb-12 pt-[max(env(safe-area-inset-top),1.25rem)]">
              <AppHeader onAction={notify} />
              <HeroCard onAction={notify} />
            </section>
            <div className="-mt-6 rounded-t-[2rem] bg-white pt-6">
              <ServiceMenu onAction={notify} />
              <BannerCarousel onAction={notify} />
              <Announcements onAction={notify} />
            </div>
          </main>
        ) : (
          <PlaceholderTab tab={tab} onBack={() => setTab('home')} />
        )}

        <button
          type="button"
          onClick={() => notify('เปิดแชทช่วยเหลือ')}
          aria-label="แชทช่วยเหลือ"
          className="fixed bottom-28 right-[max(1rem,calc(50%-14rem+1rem))] z-30 flex size-14 items-center justify-center rounded-full bg-white text-brand shadow-lg ring-1 ring-black/5 transition active:scale-95"
        >
          <MessageCircleMore className="size-7" />
        </button>

        <BottomNav active={tab} onChange={setTab} onScan={() => notify('เปิดกล้องสแกน')} />

        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-none fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-full bg-neutral-900/90 px-4 py-2 text-sm text-white transition-all ${
            toast ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          {toast}
        </div>
      </div>
    </div>
  )
}
