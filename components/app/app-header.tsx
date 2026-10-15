'use client'

import { useRef, useState } from 'react'
import { Bell, Camera, Power } from 'lucide-react'
import { profile } from '@/lib/app-content'
import { CroppedImage } from './cropped-image'

type Props = { onAction: (msg: string) => void; onNotifications: () => void; onLogout: () => void }

export function AppHeader({ onAction, onNotifications, onLogout }: Props) {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [name, setName] = useState(profile.name)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (avatar) URL.revokeObjectURL(avatar)
    setAvatar(URL.createObjectURL(file))
    e.target.value = ''
    onAction('อัปเดตรูปโปรไฟล์แล้ว')
  }

  return (
    <header className="flex items-center gap-2.5 px-5">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="group relative size-10 shrink-0 overflow-hidden rounded-full bg-white/20 ring-[1.5px] ring-white"
        aria-label="เปลี่ยนรูปโปรไฟล์"
      >
        {avatar ? (
          <img src={avatar || '/placeholder.svg'} alt="รูปโปรไฟล์" className="size-full object-cover" />
        ) : (
          <CroppedImage
            src="/images/source-front.png"
            natural={{ width: 1279, height: 948 }}
            crop={{ x: 12, y: 18, width: 130, height: 130 }}
            alt="รูปโปรไฟล์"
            className="size-full"
          />
        )}
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} />

      <div className="group relative min-w-0 flex-1">
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
          <Camera className="size-5 text-white" />
        </span>
        <div className="flex items-center gap-2">
          <span className="text-base text-white/90">{profile.greeting}</span>
          <span className="rounded-full bg-online px-2.5 py-0.5 text-[11px] font-medium leading-tight text-white">
            {profile.status}
          </span>
        </div>
        <label className="sr-only" htmlFor="display-name">
          ชื่อที่แสดง
        </label>
        <input
          id="display-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full truncate bg-transparent text-base font-medium leading-tight text-white outline-none focus:underline"
        />
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
