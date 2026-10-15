import { ImagePlus, UserRound } from 'lucide-react'
import { cardInfo as c } from '@/lib/app-content'
import { BackButton } from './page-parts'

type Props = { photo: string | null; onPickPhoto: () => void; onBack: () => void }

function Field({ label, value, align = 'left' }: { label: string; value: string; align?: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'text-right' : undefined}>
      <p className="text-lg font-bold text-neutral-900">{label}</p>
      <p className="text-lg text-neutral-700">{value}</p>
    </div>
  )
}

export function CardInfoScreen({ photo, onPickPhoto, onBack }: Props) {
  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-brand">
      <header className="grid grid-cols-[3.5rem_1fr_3.5rem] items-center px-5 pb-6 pt-[max(env(safe-area-inset-top),1.5rem)]">
        <BackButton onClick={onBack} variant="dark" />
        <h1 className="text-center text-2xl font-bold text-white">{c.title}</h1>
      </header>

      <div className="flex-1 rounded-t-[2rem] bg-white px-5 pb-28 pt-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand">{c.photoTitle}</h2>
          <p className="text-base text-neutral-800">{c.photoSub}</p>
        </div>

        <button
          type="button"
          onClick={onPickPhoto}
          aria-label="เปลี่ยนรูปหน้าบัตร"
          className="group relative mx-auto mt-6 block aspect-[5/6] w-[72%] overflow-hidden bg-neutral-100"
          style={{ backgroundImage: 'repeating-linear-gradient(180deg,#ebebef 0 21%,#4b4b4b 21% 21.6%)' }}
        >
          {photo ? (
            <img src={photo || '/placeholder.svg'} alt="รูปหน้าบัตร" className="size-full object-cover" />
          ) : (
            <UserRound className="mx-auto size-24 text-neutral-400" />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
            <ImagePlus className="size-8 text-white" />
          </span>
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-500">{c.numberLabel}</p>
          <p className="text-3xl tracking-wide text-neutral-800">{c.number}</p>
        </div>
        <div className="mx-auto my-5 flex w-2/3 items-center gap-2 text-neutral-300" aria-hidden>
          <span className="h-px flex-1 bg-current" />
          <span className="size-1 rounded-full bg-current" />
          <span className="h-px flex-1 bg-current" />
        </div>

        <div className="flex flex-col gap-5 rounded-3xl bg-page p-6">
          <div className="text-center">
            <p className="text-3xl font-medium text-[#1c2a6b]">{c.nameTh}</p>
            <p className="whitespace-pre text-xl text-neutral-700">{c.nameEn}</p>
          </div>
          <Field label={c.addressLabel} value={c.address} />
          <Field label={c.birthLabel} value={c.birth} />
          <div className="flex justify-between gap-4">
            <Field label={c.issueLabel} value={c.issue} />
            <Field label={c.expiryLabel} value={c.expiry} align="right" />
          </div>
        </div>
      </div>
    </main>
  )
}
