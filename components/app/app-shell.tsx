'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageCircleMore } from 'lucide-react'
import { usePullDown } from './use-pull-down'
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
import { CheckRequestsScreen } from './check-requests-screen'
import { CertifyScreen } from './certify-screen'
import { MoveScreen } from './move-screen'
import { AnnouncementScreen } from './announcement-screen'
import { LogoutDialog } from './logout-dialog'
import { ScanScreen } from './scan-screen'
import { PinScreen } from './pin-screen'
import { UnlockLoader } from './unlock-loader'
import { SplashScreen } from './splash-screen'
import { announcements, cardInfoProfiles, cardProfiles, profiles } from '@/lib/app-content'

type Screen = 'notifications' | 'cardInfo' | 'scan' | 'checkRequests' | 'certify' | 'move' | 'announcement' | null

const lastProfileKey = 'last-profile'
const pinLoaderDurationMs = 650
const screenLoaderDurationMs = 900
const pressLoaderDurationMs = 700
const pressableSelector = 'button, a, [role="button"], [role="tab"]'
const exitSelector = '[data-no-loader], [aria-label^="ย้อนกลับ"], [aria-label^="ปิด"]'
const serviceScreens: Record<string, Screen> = {
  check: 'checkRequests',
  certify: 'certify',
  move: 'move',
}

export function AppShell() {
  const [authenticatedAs, setAuthenticatedAs] = useState<keyof typeof profiles>('first')
  const [splashVisible, setSplashVisible] = useState(true)
  const [pinOpen, setPinOpen] = useState(false)
  const [pinLoading, setPinLoading] = useState(false)
  const [pressLoading, setPressLoading] = useState(false)
  const [unlockingProfile, setUnlockingProfile] = useState<keyof typeof profiles | null>(null)
  const [cardUnlocked, setCardUnlocked] = useState(false)
  const [tab, setTab] = useState<TabId>('home')
  const [screen, setScreen] = useState<Screen>(null)
  const [announcementIndex, setAnnouncementIndex] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const screenAfterUnlock = useRef<Screen>(null)
  const pressTarget = useRef<HTMLElement | null>(null)
  const replayingClick = useRef(false)

  const notify = useCallback((message: string) => {
    setToast(message)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 1800)
  }, [])

  const openLogout = () => setLogoutOpen(true)
  const finishSplash = useCallback(() => setSplashVisible(false), [])

  const pinProfiles = {
    '09225110': 'tenth', '10201020': 'first', '22222222': 'second', '33333333': 'third',
    '44444444': 'fourth', '55555555': 'fifth', '66666666': 'sixth',
    '77777777': 'seventh', '88888888': 'eighth', '99999999': 'ninth',
  } as const

  useEffect(() => {
    if (!pinLoading) return
    const id = window.setTimeout(() => {
      setPinLoading(false)
      setPinOpen(true)
    }, pinLoaderDurationMs)
    return () => window.clearTimeout(id)
  }, [pinLoading])

  const requestPin = () => {
    if (!pinOpen && !pinLoading && !unlockingProfile) setPinLoading(true)
  }

  useEffect(() => {
    if (!pressLoading) return
    const id = window.setTimeout(() => {
      const element = pressTarget.current
      pressTarget.current = null
      setPressLoading(false)
      if (!element?.isConnected) return
      replayingClick.current = true
      element.click()
      replayingClick.current = false
    }, pressLoaderDurationMs)
    return () => window.clearTimeout(id)
  }, [pressLoading])

  useEffect(() => {
    const saved = window.localStorage.getItem(lastProfileKey)
    if (saved && saved in profiles) setAuthenticatedAs(saved as keyof typeof profiles)
  }, [])

  const unlock = (pin: string) => {
    const profileId = pinProfiles[pin as keyof typeof pinProfiles]
    if (!profileId) return false
    window.localStorage.setItem(lastProfileKey, profileId)
    setPinOpen(false)
    setUnlockingProfile(profileId)
    return true
  }

  useEffect(() => {
    if (!unlockingProfile) return
    const id = window.setTimeout(() => {
      setAuthenticatedAs(unlockingProfile)
      setCardUnlocked(true)
      const target = screenAfterUnlock.current
      screenAfterUnlock.current = null
      if (target) setScreen(target)
      setUnlockingProfile(null)
    }, screenLoaderDurationMs)
    return () => window.clearTimeout(id)
  }, [unlockingProfile])

  const guardLockedClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('[data-pin-screen]')) return
    if (cardUnlocked) {
      if (replayingClick.current || chatOpen || logoutOpen) return
      const pressed = target.closest<HTMLElement>(pressableSelector)
      if (!pressed || pressed.matches(':disabled')) return
      if (pressed.closest(exitSelector)) return
      event.preventDefault()
      event.stopPropagation()
      if (pressLoading || unlockingProfile) return
      pressTarget.current = pressed
      setPressLoading(true)
      return
    }
    if (!target.closest('button, a, [role="button"], [role="tab"], summary, label[for]')) return
    const service = target.closest<HTMLElement>('[data-service]')?.dataset.service
    screenAfterUnlock.current = service ? (serviceScreens[service] ?? null) : null
    event.preventDefault()
    event.stopPropagation()
    requestPin()
  }

  const pull = usePullDown(
    tab === 'home' && !screen && !splashVisible && !pinOpen && !pinLoading && !chatOpen && !logoutOpen,
  )

  const activeProfile = profiles[authenticatedAs]
  const activeCard = cardProfiles[authenticatedAs]
  const activeCardInfo = cardInfoProfiles[authenticatedAs]

  function renderContent() {
    if (screen === 'notifications') return <NotificationsScreen onBack={() => setScreen(null)} />
    if (screen === 'cardInfo') return <CardInfoScreen cardInfo={activeCardInfo} onBack={() => setScreen(null)} />
    if (screen === 'scan') return <ScanScreen onBack={() => setScreen(null)} />
    if (screen === 'checkRequests') return <CheckRequestsScreen profileId={authenticatedAs} onBack={() => setScreen(null)} />
    if (screen === 'certify') return <CertifyScreen profileId={authenticatedAs} onBack={() => setScreen(null)} />
    if (screen === 'move') return <MoveScreen onBack={() => setScreen(null)} />
    if (screen === 'announcement') {
      const detail = announcements[announcementIndex]?.detail
      if (detail) return <AnnouncementScreen detail={detail} onBack={() => setScreen(null)} />
    }
    if (tab === 'docs') return <DocumentsTab onAction={notify} />
    if (tab === 'history') return <HistoryTab onAction={notify} />
    if (tab === 'settings') return <SettingsTab onAction={notify} onLogout={openLogout} />
    return (
      <main className="flex-1 pb-28">
        <div className="sticky top-0 z-20 bg-brand pb-4 pt-[max(env(safe-area-inset-top),0.75rem)]">
          <AppHeader profile={activeProfile} onAction={notify} onNotifications={() => setScreen('notifications')} onLogout={openLogout} />
        </div>
        <div className="bg-white">
        <div
          className="relative"
          style={{
            transform: pull.offset > 0 ? `translate3d(0, ${pull.offset}px, 0)` : undefined,
            transition: pull.pulling ? 'none' : 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <section className="bg-brand pb-9">
            <HeroCard card={activeCard} locked={!cardUnlocked} onRequestUnlock={requestPin} onOpenInfo={() => (cardUnlocked ? setScreen('cardInfo') : requestPin())} />
          </section>
          <div className="-mt-6 rounded-t-[2rem] bg-white pt-5">
            <ServiceMenu
              onOpenCheck={() => setScreen('checkRequests')}
              onOpenCertify={() => setScreen('certify')}
              onOpenMove={() => setScreen('move')}
            />
            <BannerCarousel onAction={notify} />
            <Announcements
              onOpen={(index) => {
                setAnnouncementIndex(index)
                setScreen('announcement')
              }}
            />
          </div>
        </div>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-dvh bg-canvas px-0 sm:px-3 sm:py-2">
      <div
        onClickCapture={guardLockedClick}
        className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-clip rounded-none bg-white sm:min-h-[calc(100dvh-1rem)] sm:rounded-[2.75rem]"
      >
        <div
          aria-hidden
          className={`pointer-events-none fixed inset-x-0 top-0 z-30 h-[env(safe-area-inset-top)] ${
            screen === 'scan' ? 'bg-brand-dark' : !screen && (tab === 'docs' || tab === 'history' || tab === 'settings') ? 'hidden' : 'bg-brand'
          }`}
        />

        {renderContent()}

        <button
          type="button"
          onClick={() => setChatOpen(true)}
          aria-label="แชทบอท"
          className={`fixed right-[max(1rem,calc(50%-14rem+1rem))] z-30 flex size-[54px] items-center justify-center rounded-full bg-white text-brand shadow-lg ring-1 ring-black/5 transition active:scale-95 ${
            screen === 'certify' || screen === 'announcement' ? 'bottom-24' : screen ? 'bottom-8' : 'bottom-[calc(max(env(safe-area-inset-bottom),0.5rem)_+_84px)]'
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
        {(pinLoading || pressLoading || unlockingProfile) && <UnlockLoader />}
        {splashVisible && <SplashScreen onDone={finishSplash} />}
        {pinOpen && (
          <PinScreen
            onClose={() => {
              screenAfterUnlock.current = null
              setPinOpen(false)
            }}
            onUnlock={unlock}
          />
        )}
        {logoutOpen && (
          <LogoutDialog
            onCancel={() => setLogoutOpen(false)}
            onConfirm={() => {
              setLogoutOpen(false)
              setTab('home')
              setCardUnlocked(false)
              setPinOpen(false)
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
