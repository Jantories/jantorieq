'use client'

import { useRef, useState } from 'react'
import { Bell, Camera, Power, User } from 'lucide-react'

export function AppHeader({ onAction }: { onAction: (msg: string) => void }) {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [name, setName] = useState('คุณ ผู้ใช้งาน')
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (avatar) URL.revokeObjectURL(avatar)
    setAvatar(URL.createObjectURL(file))
    onAction('อัปเดตรูปโปรไฟล์แล้ว')
  }

  return (
    <header className="flex items-center gap-3 px-5">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="group relative size-14 shrink-0 overflow-hidden rounded-full bg-white/15 ring-2 ring-white/80"
        aria-label="เปลี่ยนรูปโปรไฟล์"
      >
        {avatar ? (
          <img src={avatar || '/placeholder.svg'} alt="รูปโปรไฟล์" className="size-full object-cover" />
        ) : (
          <User className="m-auto size-7 text-white" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
          <Camera className="size-5 text-white" />
        </span>
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/85">สวัสดี</span>
          <span className="rounded-full bg-online px-2 py-0.5 text-[10px] font-semibold uppercase leading-none text-white">
            Online
          </span>
        </div>
        <label className="sr-only" htmlFor="display-name">
          ชื่อที่แสดง
        </label>
        <input
          id="display-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full truncate bg-transparent text-lg font-bold text-white outline-none focus:underline"
        />
      </div>

      <button
        type="button"
        onClick={() => onAction('ไม่มีการแจ้งเตือนใหม่')}
        aria-label="การแจ้งเตือน"
        className="flex size-12 items-center justify-center rounded-full bg-brand-dark text-white transition active:scale-95"
      >
        <Bell className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => onAction('ออกจากระบบ')}
        aria-label="ออกจากระบบ"
        className="flex size-12 items-center justify-center rounded-full bg-brand-dark text-white transition active:scale-95"
      >
        <Power className="size-5" />
      </button>
    </header>
  )
}
