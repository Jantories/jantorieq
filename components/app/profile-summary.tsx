import Image from 'next/image'
import { cardProfiles, checkRequestsPage, profiles } from '@/lib/app-content'
import { CroppedImage } from './cropped-image'

export type ProfileId = keyof typeof profiles

// "นาย ชื่อ นามสกุล" -> first name and last name (title dropped)
function splitName(fullName: string) {
  const [, firstName = '', ...rest] = fullName.split(' ')
  return { firstName, lastName: rest.join(' ') }
}

export function ProfileSummary({ profileId, compact = false }: { profileId: ProfileId; compact?: boolean }) {
  const { profile } = checkRequestsPage
  const { firstName, lastName } = splitName(cardProfiles[profileId].fullNameTh)
  const avatar = (profiles[profileId] as { avatar?: string }).avatar
  const sizeClass = compact ? 'size-16' : 'size-24'

  return (
    <div className={compact ? 'mt-5 flex items-center justify-center gap-4' : 'mt-5 flex items-center justify-center gap-5'}>
      {avatar ? (
        <div className={`relative ${sizeClass} shrink-0 overflow-hidden rounded-full ring-1 ring-neutral-200`}>
          <Image src={avatar} alt="รูปโปรไฟล์" fill sizes={compact ? '64px' : '96px'} className="object-cover object-top" />
        </div>
      ) : (
        <CroppedImage
          src={profile.photo.src}
          natural={profile.photo.natural}
          crop={profile.photo.crop}
          alt="รูปโปรไฟล์"
          className={`${sizeClass} shrink-0 rounded-full ring-1 ring-neutral-200`}
        />
      )}
      <p className={compact ? 'text-sm font-[200] leading-snug text-neutral-800' : 'text-lg font-medium leading-snug text-neutral-800'}>
        {firstName}
        <br />
        {lastName}
      </p>
    </div>
  )
}
