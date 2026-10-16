'use client'

import { useCallback, useRef, useState } from 'react'
import { MessageCircleMore } from 'lucide-react'
import { AppHeader } from './app-header'
import { HeroCard } from './hero-card'
import { ServiceMenu } from './service-menu'
import { BannerCarousel } from './banner-carousel'
import { Announcements } from './announcements'
import { BottomNav, type TabId } from './bottom-nav'
import { DocumentsTab } from './documents-tab'
import { HistoryTab } from './history-tab'
import { SettingsTab } from './settings-tab'
import { NotificationsScreen } from './notifications-screen'
import { CardInfoScreen } from './card-info-screen'
import { ChatScreen } from './chat-screen'
import { LogoutDialog } from './logout-dialog'
import { ScanScreen } from './scan-screen'

type Screen = 'notifications' | 'cardInfo' | 'scan' | null

export function AppShell() {
  const [tab, setTab] = useState<TabId>('home')
  const [screen, setScreen] = useState<Screen>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const notify = useCallback((message: string) => {
    setToast(message)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 1800)
  }, [])

  const openLogout = () => setLogoutOpen(true)

  function renderContent() {
    if (screen === 'notifications') return <NotificationsScreen onBack={() => setScreen(null)} />
    if (screen === 'cardInfo') return <CardInfoScreen onBack={() => setScreen(null)} />
    if (screen === 'scan') return <ScanScreen onBack={() => setScreen(null)} />
    if (tab === 'docs') return <DocumentsTab onAction={notify} />
    if (tab === 'history') return <HistoryTab onAction={notify} />
    if (tab === 'settings') return <SettingsTab onAction={notify} onLogout={openLogout} />
    return (
      <main className="flex-1 pb-28">
        <section className="bg-brand pb-12 pt-[max(env(safe-area-inset-top),0.75rem)]">
          <AppHeader onAction={notify} onNotifications={() => setScreen('notifications')} onLogout={openLogout} />
          <HeroCard onOpenInfo={() => setScreen('cardInfo')} />
        </section>
        <div className="-mt-6 rounded-t-[2rem] bg-white pt-5">
          <ServiceMenu />
          <BannerCarousel onAction={notify} />
          <Announcements />
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-dvh bg-canvas px-0 sm:px-3 sm:py-2">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden rounded-none bg-[linear-gradient(to_bottom,var(--color-brand)_3rem,white_3rem)] sm:min-h-[calc(100dvh-1rem)] sm:rounded-[2.75rem]">
        {renderContent()}

        <button
          type="button"
          onClick={() => setChatOpen(true)}
          aria-label="แชทบอท"
          className={`fixed right-[max(1rem,calc(50%-14rem+1rem))] z-30 flex size-[54px] items-center justify-center rounded-full bg-white text-brand shadow-lg ring-1 ring-black/5 transition active:scale-95 ${
            screen ? 'bottom-8' : 'bottom-[calc(max(env(safe-area-inset-bottom),0.5rem)_+_84px)]'
          }`}
        >
          <MessageCircleMore className="size-7" />
        </button>

        {!screen && (
          <BottomNav
            active={tab}
            onChange={(t) => {
              setTab(t)
              window.scrollTo({ top: 0 })
            }}
            onScan={() => setScreen('scan')}
          />
        )}

        {chatOpen && <ChatScreen onClose={() => setChatOpen(false)} />}
        {logoutOpen && (
          <LogoutDialog
            onCancel={() => setLogoutOpen(false)}
            onConfirm={() => {
              setLogoutOpen(false)
              setTab('home')
              notify('ออกจากระบบแล้ว')
            }}
          />
        )}

        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-none fixed left-1/2 top-[max(env(safe-area-inset-top),0.75rem)] z-[60] -translate-x-1/2 rounded-full bg-neutral-900/90 px-4 py-2 text-sm text-white transition-all ${
            toast ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          {toast}
        </div>
      </div>
    </div>
  )
}
