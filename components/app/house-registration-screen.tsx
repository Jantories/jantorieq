'use client'

import { ChevronLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { BackButton } from './page-parts'
import { houseRegistration } from '@/lib/app-content'

type Props = { onBack: () => void }

const DOUBLE_TAP_MS = 320

function Field({ label, value, className = '', wrap = false }: { label: string; value: string; className?: string; wrap?: boolean }) {
  return (
    <p className={`text-xs leading-snug text-neutral-900 ${className}`}>
      {label} <span className={`ml-1 ${wrap ? '' : 'whitespace-nowrap'}`}>{value}</span>
    </p>
  )
}

function HouseDocument() {
  const { house, residents } = houseRegistration
  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="house-info-title" className="rounded-xl bg-house-card px-4 pb-4 pt-4 shadow-md">
        <h3 id="house-info-title" className="text-center text-xs font-medium text-neutral-900">
          {house.title}
        </h3>
        <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-3">
          <Field label="เลขรหัสประจำบ้าน" value={house.code} />
          <Field label="สำนักทะเบียน" value={house.office} wrap />
          <Field label="รายการที่อยู่" value={house.address} className="col-span-2" wrap />
          <Field label="ชื่อหมู่บ้าน" value={house.village} className="mt-3" />
          <Field label="ชื่อบ้าน" value={house.name} className="mt-3" />
          <Field label="ประเภทบ้าน" value={house.type} />
          <Field label="ลักษณะบ้าน" value={house.kind} />
          <Field label="วันเดือนปีที่กำหนดบ้านเลขที่" value={house.assignedDate} />
          <p className="text-right text-xs leading-snug text-neutral-900">{house.community}</p>
        </div>
        <hr className="mt-4 border-t-2 border-dotted border-neutral-900" />
        <p className="mt-3 text-center text-xs text-neutral-900">
          วันเดือนปีที่พิมพ์ทะเบียนบ้าน <span className="ml-1">{house.printedDate}</span>
        </p>
      </section>

      <section aria-labelledby="house-residents-title" className="rounded-xl bg-house-card px-4 pb-4 pt-4 shadow-md">
        <h3 id="house-residents-title" className="text-center text-xs font-medium text-neutral-900">
          {residents.title}
        </h3>
        <div className="mt-4 flex flex-col gap-3">
          <div className="grid grid-cols-[auto_auto_auto] justify-between gap-x-1.5">
            <Field label="ชื่อ" value={residents.name} />
            <Field label="สัญชาติ" value={residents.nationality} />
            <Field label="เพศ" value={residents.gender} />
          </div>
          <div className="grid grid-cols-[auto_auto_auto] justify-between gap-x-1.5">
            <Field label="เลขประจำตัวประชาชน" value={residents.idNumber} />
            <Field label="สถานภาพ" value={residents.status} />
            <Field label="เกิดเมื่อ" value={residents.birth} />
          </div>
          <div className="grid grid-cols-[auto_auto_auto] justify-between gap-x-1.5">
            <Field label="มารดาผู้ให้กำเนิด ชื่อ" value={residents.mother.name} />
            <p className="text-xs text-neutral-900">{residents.mother.id}</p>
            <Field label="สัญชาติ" value={residents.mother.nationality} />
          </div>
          <div className="grid grid-cols-[auto_auto_auto] justify-between gap-x-1.5">
            <Field label="บิดาผู้ให้กำเนิด ชื่อ" value={residents.father.name} />
            <p className="text-xs text-neutral-900">{residents.father.id}</p>
            <Field label="สัญชาติ" value={residents.father.nationality} />
          </div>
          <p className="text-xs leading-snug text-neutral-900">
            มาจาก <span className="ml-1">{residents.movedFrom}</span>
          </p>
        </div>
        <hr className="mt-4 border-t-2 border-dotted border-neutral-900" />
        <p className="mt-3 text-xs text-neutral-900">
          ไปที่ <span className="ml-1">{residents.movedTo}</span>
        </p>
      </section>
    </div>
  )
}

export function HouseRegistrationScreen({ onBack }: Props) {
  const [isFullOpen, setIsFullOpen] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const lastTapRef = useRef(0)

  function handleDocumentTap(event: React.MouseEvent) {
    event.stopPropagation()
    const now = Date.now()
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      setZoomed((value) => !value)
      lastTapRef.current = 0
    } else {
      lastTapRef.current = now
    }
  }

  function closeFull() {
    setIsFullOpen(false)
    setZoomed(false)
    lastTapRef.current = 0
  }

  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-brand">
      <header className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center px-5 pb-6 pt-[max(env(safe-area-inset-top),1.5rem)]">
        <BackButton onClick={onBack} variant="dark" />
        <h1 className="text-center text-2xl font-bold text-white">เอกสาร</h1>
        <span aria-hidden />
      </header>

      <div className="flex flex-1 flex-col rounded-t-[2rem] bg-white px-5 pb-5 pt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand">เอกสารทะเบียนบ้าน</h2>
          <p className="mt-1 text-base leading-relaxed text-neutral-500">ข้อมูลทะเบียนบ้าน</p>
        </div>

        <div className="mt-8">
          <HouseDocument />
        </div>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={() => setIsFullOpen(true)}
            className="flex min-h-16 w-full items-center justify-center rounded-full bg-brand px-6 py-4 text-xl font-medium text-white transition hover:bg-brand-dark active:scale-[0.99]"
          >
            ดูภาพเต็ม
          </button>
        </div>
      </div>

      {isFullOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="เอกสารทะเบียนบ้านขนาดเต็ม"
          className="fixed inset-0 z-40 mx-auto max-w-md overflow-auto bg-neutral-900/65"
          onClick={closeFull}
        >
          <button
            type="button"
            aria-label="ปิดภาพเต็ม"
            className="fixed left-5 top-[max(env(safe-area-inset-top),1.25rem)] z-10 flex size-11 items-center justify-center rounded-full bg-white/35 text-white transition hover:bg-white/45 active:scale-95"
            onClick={closeFull}
          >
            <ChevronLeft className="size-8" strokeWidth={2.5} />
          </button>
          <div className="flex min-h-full items-center px-4 pb-8 pt-20">
            <div
              className="shrink-0 rounded-2xl bg-white p-3 shadow-xl transition-[width] duration-200"
              style={{ width: zoomed ? '200%' : '100%' }}
              onClick={handleDocumentTap}
              aria-label="แตะสองครั้งเพื่อขยายหรือย่อเอกสาร"
            >
              <div style={zoomed ? { zoom: 2 } : undefined}>
                <HouseDocument />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
