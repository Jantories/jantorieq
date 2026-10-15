'use client'

import { useState } from 'react'
import { FileCheck2, Maximize2, RefreshCw, Clock3, UserRound, Wallet } from 'lucide-react'

export function HeroCard({ onAction }: { onAction: (msg: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const [spinning, setSpinning] = useState(false)

  function refresh() {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
      onAction('อัปเดตข้อมูลล่าสุดแล้ว')
    }, 700)
  }

  const stats = [
    { icon: FileCheck2, label: 'เอกสาร', value: '5' },
    { icon: Clock3, label: 'คำขอรอดำเนินการ', value: '2' },
    { icon: Wallet, label: 'บริการที่ใช้', value: '12' },
  ]

  return (
    <div className="px-5 pt-5">
      <div className="rounded-3xl bg-gradient-to-br from-sky-100 via-indigo-50 to-white p-5 shadow-lg">
        <p className="text-sm font-medium text-brand/70">บัญชีของฉัน</p>
        <p className="mt-1 text-xl font-bold text-brand">ภาพรวมบริการ</p>
        <div className={`mt-4 grid grid-cols-3 gap-3 transition-all ${expanded ? '' : ''}`}>
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-start rounded-2xl bg-white/80 p-3">
              <Icon className="size-5 text-brand" />
              <span className="mt-2 text-2xl font-bold text-neutral-900">{value}</span>
              <span className="text-xs leading-tight text-neutral-500">{label}</span>
            </div>
          ))}
        </div>
        {expanded && (
          <p className="mt-4 rounded-2xl bg-white/80 p-3 text-sm leading-relaxed text-neutral-600">
            อัปเดตล่าสุดวันนี้ คุณสามารถติดตามสถานะคำขอและเอกสารทั้งหมดได้จากเมนูด้านล่าง
          </p>
        )}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onAction('เปิดโปรไฟล์')}
          aria-label="โปรไฟล์"
          className="flex size-12 items-center justify-center rounded-full bg-brand-dark text-white transition active:scale-95"
        >
          <UserRound className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex h-12 items-center gap-2 rounded-full bg-brand-dark px-6 text-white transition active:scale-95"
        >
          <Maximize2 className="size-5" />
          <span className="font-medium">{expanded ? 'ย่อรายละเอียด' : 'ขยายรายละเอียด'}</span>
        </button>
        <button
          type="button"
          onClick={refresh}
          aria-label="รีเฟรช"
          className="flex size-12 items-center justify-center rounded-full bg-brand-dark text-white transition active:scale-95"
        >
          <RefreshCw className={`size-5 ${spinning ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  )
}
