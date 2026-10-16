'use client'

import { Bell, Power } from 'lucide-react'
import { CroppedImage } from './cropped-image'

type Props = { profile: { greeting: string; status: string; name: string }; onAction: (msg: string) => void; onNotifications: () => void; onLogout: () => void }

export function AppHeader({ profile, onAction, onNotifications, onLogout }: Props) {
  return (
    <header className="flex items-center gap-2.5 px-5">
      <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-white/20 ring-[1.5px] ring-white">
        <CroppedImage
          src="/images/source-front.png"
          natural={{ width: 1279, height: 948 }}
          crop={{ x: 12, y: 18, width: 130, height: 130 }}
          alt="รูปโปรไฟล์"
          className="size-full"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-base text-white/90">{profile.greeting}</span>
          <span className="rounded-full bg-online px-2.5 py-0.5 text-[11px] font-medium leading-tight text-white">
            {profile.status}
          </span>
        </div>
        <p className="truncate text-base font-medium leading-tight text-white">{profile.name}</p>
      </div>

      <button
        type="button"
        onClick={onNotifications}
        aria-label="การแจ้งเตือน"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-dark text-[10px] text-white transition hover:bg-brand-dark/80 active:scale-95"
      >
        <Bell className="size-[18px]" />
      </button>
      <button
        type="button"
        onClick={onLogout}
        aria-label="ออกจากระบบ"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-dark text-white transition hover:bg-brand-dark/80 active:scale-95"
      >
        <Power className="size-[18px]" />
      </button>
    </header>
  )
}
