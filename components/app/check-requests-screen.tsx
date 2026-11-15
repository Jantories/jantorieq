import { ArrowLeftRight, ChevronLeft, Copy, House, Smile, UserPen } from 'lucide-react'
import Image from 'next/image'
import { cardProfiles, checkRequestsPage, profiles } from '@/lib/app-content'
import { CroppedImage } from './cropped-image'

const requestIcons = {
  certify: Copy,
  person: UserPen,
  move: House,
} as const

type ProfileId = keyof typeof profiles

// "นาย ชื่อ นามสกุล" -> first name and last name (title dropped)
function splitName(fullName: string) {
  const [, firstName = '', ...rest] = fullName.split(' ')
  return { firstName, lastName: rest.join(' ') }
}

export function CheckRequestsScreen({ profileId, onBack }: { profileId: ProfileId; onBack: () => void }) {
  const { profile, greeting } = checkRequestsPage
  const { firstName, lastName } = splitName(cardProfiles[profileId].fullNameTh)
  const avatar = (profiles[profileId] as { avatar?: string }).avatar

  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-brand">
      <header className="grid grid-cols-[4rem_1fr_4rem] items-center px-5 pb-6 pt-[max(env(safe-area-inset-top),1.5rem)]">
        <button
          type="button"
          onClick={onBack}
          aria-label="ย้อนกลับ"
          className="flex size-14 items-center justify-center rounded-full bg-brand-dark text-white transition hover:bg-brand-dark/80 active:scale-95"
        >
          <ChevronLeft className="size-8" strokeWidth={2.5} />
        </button>
        <h1 className="text-center text-2xl font-bold text-white">{checkRequestsPage.title}</h1>
      </header>

      <div className="flex flex-1 flex-col rounded-t-[2.5rem] bg-white px-5 pb-32 pt-9">
        <h2 className="text-center text-xl font-medium text-neutral-800">{checkRequestsPage.heading}</h2>

        <div className="mt-5 flex items-center justify-center gap-5">
          {avatar ? (
            <div className="relative size-24 shrink-0 overflow-hidden rounded-full ring-1 ring-neutral-200">
              <Image src={avatar} alt="รูปโปรไฟล์" fill sizes="96px" className="object-cover object-top" />
            </div>
          ) : (
            <CroppedImage
              src={profile.photo.src}
              natural={profile.photo.natural}
              crop={profile.photo.crop}
              alt="รูปโปรไฟล์"
              className="size-24 shrink-0 rounded-full ring-1 ring-neutral-200"
            />
          )}
          <p className="text-lg font-medium leading-snug text-neutral-800">
            {firstName}
            <br />
            {lastName}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-neutral-200 bg-[#f1f2f4] px-4 py-3">
          <Smile className="size-7 shrink-0 fill-[#f6c453] text-white" strokeWidth={1.5} aria-hidden />
          <div className="min-w-0">
            <p className="text-base font-medium leading-snug text-neutral-900">{greeting.title}</p>
            <p className="text-sm leading-snug text-neutral-800">{greeting.sub}</p>
          </div>
        </div>

        <ul className="mt-6 rounded-xl border border-neutral-200 bg-[#f1f2f4] px-4">
          {checkRequestsPage.requests.map(({ id, title, empty }) => {
            const Icon = requestIcons[id]
            return (
              <li key={id} className="flex items-center gap-4 border-b border-neutral-300/70 py-4 last:border-0">
                <span className="relative flex size-9 shrink-0 items-center justify-center text-neutral-500">
                  <Icon className="size-8" strokeWidth={1.8} aria-hidden />
                  {id === 'move' && (
                    <ArrowLeftRight
                      className="absolute -bottom-0.5 left-1/2 size-4 -translate-x-1/2 bg-[#f1f2f4] text-neutral-500"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-lg font-medium leading-snug text-neutral-400">{title}</p>
                  <p className="text-base leading-snug text-neutral-400">{empty}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <footer className="mt-4 space-y-0.5 text-right text-base leading-snug text-neutral-400">
          <p>{checkRequestsPage.copyright}</p>
          <p>{checkRequestsPage.agency}</p>
          <p>{checkRequestsPage.version}</p>
        </footer>
      </div>
    </main>
  )
}
