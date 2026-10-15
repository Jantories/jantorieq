'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ImagePlus, Maximize2, RefreshCcwDot, ShieldCheck, UserRound } from 'lucide-react'
import { card } from '@/lib/app-content'

function Editable({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      className={`rounded-sm outline-none focus:bg-white/70 focus:ring-1 focus:ring-brand/40 ${className}`}
    >
      {children}
    </span>
  )
}

type FaceProps = { photo: string | null; background: string | null; onPickPhoto: () => void }

function CardFront({ photo, background, onPickPhoto }: FaceProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[4.5cqw] text-[#1c2a6b] [backface-visibility:hidden]"
      style={
        background
          ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : {
              backgroundImage:
                'radial-gradient(circle at 18% 30%, rgba(255,214,170,.55), transparent 22%), radial-gradient(circle at 70% 35%, rgba(186,170,255,.45), transparent 20%), radial-gradient(circle at 55% 75%, rgba(170,230,255,.6), transparent 25%), radial-gradient(circle at 88% 15%, rgba(200,240,220,.6), transparent 18%), linear-gradient(135deg,#d6ecfb 0%,#c3e1f7 45%,#d9eefc 100%)',
            }
      }
    >
      <div className="absolute left-0 top-[20%] h-[80%] w-[10%] bg-white/90">
        <div
          className="mx-auto mt-[12%] h-[70%] w-[55%]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,#111 0 1.5px,transparent 1.5px 3px,#111 3px 4px,transparent 4px 6px)' }}
          aria-hidden
        />
      </div>

      <div className="absolute left-[4%] top-[5%] flex size-[13cqw] items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-rose-200">
        <ShieldCheck className="size-[8cqw] text-brand" />
      </div>

      <div className="absolute left-[19%] right-[3%] top-[5%] flex items-baseline gap-[1.5cqw] whitespace-nowrap">
        <Editable className="text-[4.6cqw] font-bold">{card.titleTh}</Editable>
        <Editable className="text-[4.2cqw] font-semibold text-[#3557a8]">{card.titleEn}</Editable>
      </div>

      <div className="absolute left-[19%] top-[17%] flex items-center gap-[2.5cqw]">
        <div className="flex flex-col leading-[1.15]">
          <Editable className="text-[2.1cqw]">{card.numberLabelTh}</Editable>
          <Editable className="text-[2.1cqw] text-[#3557a8]">{card.numberLabelEn}</Editable>
        </div>
        <Editable className="text-[3.8cqw] font-medium tracking-wide">{card.number}</Editable>
      </div>

      <div className="absolute left-[15%] top-[28%] flex items-baseline gap-[1.5cqw] whitespace-nowrap">
        <Editable className="text-[2.3cqw]">{card.fullNameLabel}</Editable>
        <Editable className="text-[4.6cqw] font-bold">{card.fullNameTh}</Editable>
      </div>

      <div
        className="absolute left-[14.5%] top-[39%] grid h-[24%] w-[14%] grid-cols-3 grid-rows-3 gap-px overflow-hidden rounded-[1.5cqw] bg-amber-700/50 ring-1 ring-amber-700/60"
        aria-hidden
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="bg-gradient-to-br from-amber-200 to-amber-400" />
        ))}
      </div>

      <div className="absolute left-[33%] top-[38%] flex flex-col leading-[1.2]">
        <div className="flex items-baseline gap-[2cqw]">
          <Editable className="text-[2.3cqw] font-semibold text-[#3557a8]">{card.firstNameLabel}</Editable>
          <Editable className="text-[3.4cqw] text-[#3557a8]">{card.firstNameEn}</Editable>
        </div>
        <div className="flex items-baseline gap-[2cqw]">
          <Editable className="text-[2.3cqw] font-semibold text-[#3557a8]">{card.lastNameLabel}</Editable>
          <Editable className="text-[3.4cqw] text-[#3557a8]">{card.lastNameEn}</Editable>
        </div>
        <div className="ml-[3cqw] mt-[0.5cqw] flex items-baseline gap-[2cqw]">
          <Editable className="text-[2.3cqw]">{card.birthLabelTh}</Editable>
          <Editable className="text-[3.4cqw]">{card.birthTh}</Editable>
        </div>
        <div className="ml-[3cqw] flex items-baseline gap-[2cqw]">
          <Editable className="text-[2.3cqw] text-[#3557a8]">{card.birthLabelEn}</Editable>
          <Editable className="text-[3.4cqw] text-[#3557a8]">{card.birthEn}</Editable>
        </div>
      </div>

      <div className="absolute left-[11%] right-[26%] top-[69%] line-clamp-2 text-[2.8cqw] leading-[1.2]">
        <Editable>{card.address}</Editable>
      </div>

      <div className="absolute bottom-[2%] left-[11%] grid w-[60%] grid-cols-2 text-[2cqw] leading-[1.15]">
        <div className="flex flex-col">
          <Editable>{card.issueTh}</Editable>
          <Editable>{card.issueLabelTh}</Editable>
          <Editable className="mt-[1cqw] text-[2.6cqw] text-[#3557a8]">{card.issueEn}</Editable>
          <Editable className="text-[#3557a8]">{card.issueLabelEn}</Editable>
        </div>
        <div className="flex flex-col">
          <Editable>{card.expiryTh}</Editable>
          <Editable>{card.expiryLabelTh}</Editable>
          <Editable className="mt-[1cqw] text-[2.6cqw] text-[#3557a8]">{card.expiryEn}</Editable>
          <Editable className="text-[#3557a8]">{card.expiryLabelEn}</Editable>
        </div>
      </div>

      <button
        type="button"
        onClick={onPickPhoto}
        aria-label="เปลี่ยนรูปบนบัตร"
        className="group absolute right-[3%] top-[38%] h-[48%] w-[19%] overflow-hidden bg-neutral-100"
        style={{ backgroundImage: 'repeating-linear-gradient(180deg,#e5e5e5 0 9%,#9ca3af 9% 9.6%)' }}
      >
        {photo ? (
          <img src={photo || '/placeholder.svg'} alt="รูปบนบัตร" className="size-full object-cover" />
        ) : (
          <UserRound className="mx-auto size-[10cqw] text-neutral-400" />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
          <ImagePlus className="size-[5cqw] text-white" />
        </span>
      </button>
      <div className="absolute right-[3%] top-[87%] w-[22%] text-center text-[2.4cqw]">
        <Editable>{card.photoCode}</Editable>
      </div>
    </div>
  )
}

function CardBack({ background }: { background: string | null }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden rounded-[4.5cqw] bg-gradient-to-br from-[#d6ecfb] to-[#c3e1f7] text-[#1c2a6b] [backface-visibility:hidden] [transform:rotateY(180deg)]"
      style={background ? { backgroundImage: `url(${background})`, backgroundSize: 'cover' } : undefined}
    >
      <div className="mt-[8%] h-[16%] w-full bg-neutral-900/85" aria-hidden />
      <div className="flex flex-1 flex-col justify-center gap-[2cqw] px-[6%]">
        <Editable className="text-[4.6cqw] font-bold">{card.backTitle}</Editable>
        <Editable className="text-[3cqw] leading-snug">{card.backNote}</Editable>
      </div>
    </div>
  )
}

const circleBtn =
  'flex size-11 items-center justify-center rounded-full bg-brand-dark text-white transition hover:bg-brand-dark/80 active:scale-95'

const glassBtn =
  'flex size-11 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur transition hover:bg-white/40 active:scale-95'

const DOUBLE_TAP_MS = 350

type Props = {
  photo: string | null
  onPickPhoto: () => void
  onOpenInfo: () => void
  onAction: (msg: string) => void
}

export function HeroCard({ photo, onPickPhoto, onOpenInfo, onAction }: Props) {
  const [background, setBackground] = useState<string | null>(null)
  const [flipped, setFlipped] = useState(false)
  const flip = () => setFlipped((f) => !f)
  const [expanded, setExpanded] = useState(false)
  const bgRef = useRef<HTMLInputElement>(null)

  function handleBackground(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setBackground(URL.createObjectURL(file))
    e.target.value = ''
    onAction('อัปเดตพื้นหลังบัตรแล้ว')
  }

  const lastTapRef = useRef(0)

  function handleCardTap(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest('button, input, [contenteditable]')) return
    const now = Date.now()
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      lastTapRef.current = 0
      flip()
      setExpanded(true)
      return
    }
    lastTapRef.current = now
    flip()
  }

  const renderCard = (style?: React.CSSProperties, interactive = false) => (
    <div
      className="[container-type:inline-size] [perspective:1200px]"
      style={style}
      onClick={interactive ? handleCardTap : undefined}
    >
      <div
        className="relative aspect-[1.585/1] w-full shadow-xl transition-transform duration-[1100ms] ease-in-out [transform-style:preserve-3d]"
        style={{ transform: `rotateY(${flipped ? -180 : 0}deg)`, borderRadius: '4.5cqw' }}
      >
        <CardFront photo={photo} background={background} onPickPhoto={onPickPhoto} />
        <CardBack background={background} />
      </div>
    </div>
  )

  return (
    <div className="px-5 pt-4">
      <input ref={bgRef} type="file" accept="image/*" className="sr-only" onChange={handleBackground} />

      {renderCard(undefined, true)}
      <div className="mt-4 flex items-center justify-center gap-[18px]">
        <button type="button" onClick={onOpenInfo} aria-label={card.infoLabel} className={circleBtn}>
          <UserRound className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex h-11 items-center gap-2 rounded-full bg-brand-dark pl-7 pr-6 text-base text-white transition hover:bg-brand-dark/80 active:scale-95"
        >
          <Maximize2 className="size-5" />
          <span>{card.expandLabel}</span>
        </button>
        <button type="button" onClick={flip} aria-label="พลิกบัตร" className={circleBtn}>
          <RefreshCcwDot className="size-5" />
        </button>
      </div>

      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={card.expandLabel}
          className="fixed inset-0 z-50 mx-auto flex max-w-md items-center justify-center overflow-hidden bg-neutral-900/60 backdrop-blur-[2px]"
        >
          <div className="absolute inset-x-5 top-[max(env(safe-area-inset-top),1.25rem)] z-10 flex justify-between">
            <button type="button" onClick={() => setExpanded(false)} aria-label="ย้อนกลับ" className={glassBtn}>
              <ChevronLeft className="size-8" strokeWidth={2.5} />
            </button>
            <button type="button" onClick={flip} aria-label="พลิกบัตร" className={glassBtn}>
              <RefreshCcwDot className="size-7" />
            </button>
          </div>
          <div className="rotate-90">{renderCard({ width: 'min(78dvh, 140vw, 40rem)' })}</div>
          <button
            type="button"
            onClick={() => bgRef.current?.click()}
            className="absolute bottom-[max(env(safe-area-inset-bottom),1.25rem)] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm text-white backdrop-blur transition hover:bg-white/30"
          >
            <ImagePlus className="size-4" />
            เปลี่ยนพื้นหลังบัตร
          </button>
        </div>
      )}
    </div>
  )
}
