import { ChevronLeft, type LucideIcon } from 'lucide-react'

export const tones = {
  blue: 'bg-[#eef0f8] text-brand',
  green: 'bg-[#eaf5ea] text-[#3f8f3f]',
  red: 'bg-[#f8eeee] text-[#b3412f]',
} as const

export type Tone = keyof typeof tones

export function PageTitle({ children }: { children: string }) {
  return (
    <h1 className="pb-6 pt-[max(env(safe-area-inset-top),2rem)] text-center text-2xl font-bold text-brand">{children}</h1>
  )
}

export function PageHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-4 px-1">
      <h2 className="text-xl font-medium text-brand">{title}</h2>
      <p className="text-base text-neutral-500">{sub}</p>
    </div>
  )
}

export function BackButton({ onClick, variant = 'light' }: { onClick: () => void; variant?: 'light' | 'dark' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="ย้อนกลับ"
      className={`flex size-14 shrink-0 items-center justify-center rounded-full transition active:scale-95 ${
        variant === 'dark' ? 'bg-brand-dark text-white hover:bg-brand-dark/80' : 'bg-white text-neutral-900 shadow-sm hover:bg-neutral-50'
      }`}
    >
      <ChevronLeft className="size-8" strokeWidth={2.5} />
    </button>
  )
}

export function IconBubble({ icon: Icon, tone = 'blue' }: { icon: LucideIcon; tone?: Tone }) {
  return (
    <span className={`flex size-14 shrink-0 items-center justify-center rounded-full ${tones[tone]}`}>
      <Icon className="size-7" strokeWidth={1.8} />
    </span>
  )
}

type RowProps = {
  icon: LucideIcon
  tone?: Tone
  title: string
  sub: string
  titleClassName?: string
  onClick?: () => void
  trailing?: React.ReactNode
}

export function ListRow({ icon, tone, title, sub, titleClassName = 'text-neutral-900', onClick, trailing }: RowProps) {
  const content = (
    <>
      <IconBubble icon={icon} tone={tone} />
      <span className="flex min-w-0 flex-1 items-center gap-3 self-stretch border-b border-neutral-100 py-4 group-last:border-0">
        <span className="min-w-0 flex-1">
          <span className={`block text-lg font-medium leading-snug ${titleClassName}`}>{title}</span>
          <span className="block text-sm text-neutral-500">{sub}</span>
        </span>
        {trailing}
      </span>
    </>
  )
  if (!onClick) return <div className="group flex items-center gap-4 px-4">{content}</div>
  return (
    <button type="button" onClick={onClick} className="group flex w-full items-center gap-4 px-4 text-left transition hover:bg-neutral-50 active:bg-neutral-100">
      {content}
    </button>
  )
}

export function ListCard({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-3xl bg-white [&>*:last-child>span:last-child]:border-0">{children}</div>
}
