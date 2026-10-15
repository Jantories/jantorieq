import { Inbox } from 'lucide-react'
import { notificationsPage } from '@/lib/app-content'
import { BackButton } from './page-parts'

export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-page">
      <header className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center px-5 pt-[max(env(safe-area-inset-top),1.5rem)]">
        <BackButton onClick={onBack} />
        <h1 className="text-center text-2xl font-bold text-brand">{notificationsPage.title}</h1>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 pb-24 text-center">
        <Inbox className="mb-4 size-24 fill-[#dde0ec] text-[#b4b9c9]" strokeWidth={1.75} aria-hidden />
        <p className="text-2xl font-medium text-neutral-900">{notificationsPage.emptyTitle}</p>
        <p className="text-base text-neutral-400">{notificationsPage.emptySub}</p>
      </div>
    </main>
  )
}
