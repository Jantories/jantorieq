import { Megaphone } from 'lucide-react'
import { SectionHeader } from './service-menu'

const items = [
  {
    title: 'เชิญชวนผู้มีสิทธิเลือกตั้งไปใช้สิทธิ',
    date: '6/02/2569',
    body: 'ขอเชิญชวนผู้มีสิทธิเลือกตั้งออกไปใช้สิทธิตามวันและเวลาที่กำหนด ตรวจสอบรายละเอียดได้ในแอป',
  },
  {
    title: 'ปิดปรับปรุงระบบชั่วคราว',
    date: '1/02/2569',
    body: 'ระบบจะปิดปรับปรุงในวันอาทิตย์ เวลา 00:00 - 04:00 น. ขออภัยในความไม่สะดวก',
  },
]

export function Announcements({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <section aria-label="ประกาศ" className="mt-8">
      <SectionHeader title="ประกาศทั้งหมด" onAll={() => onAction('ดูประกาศทั้งหมด')} />
      <ul className="mt-4 flex flex-col gap-3 px-5">
        {items.map((item) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => onAction(item.title)}
              className="w-full rounded-2xl border border-neutral-200 p-4 text-left transition hover:border-brand/40 active:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <Megaphone className="size-4" />
                </span>
                <span className="min-w-0 flex-1 truncate font-bold text-neutral-900">{item.title}</span>
                <span className="shrink-0 text-xs text-neutral-500">{item.date}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
