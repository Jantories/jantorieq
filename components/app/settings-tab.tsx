'use client'

import { useState } from 'react'
import { BadgeCheck, BellRing, CircleX, Fingerprint, History, Info, LockKeyhole, LogOut, Smartphone } from 'lucide-react'
import { settingsPage as s } from '@/lib/app-content'
import { ListCard, ListRow, PageHeading, PageTitle } from './page-parts'

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-14 shrink-0 rounded-full transition ${checked ? 'bg-brand' : 'bg-neutral-400'}`}
    >
      <span
        className={`absolute top-0.5 size-7 rounded-full bg-white shadow transition-all ${checked ? 'left-[1.625rem]' : 'left-0.5'}`}
      />
    </button>
  )
}

type Props = { onAction: (msg: string) => void; onLogout: () => void }

export function SettingsTab({ onAction, onLogout }: Props) {
  const [biometric, setBiometric] = useState(false)
  const [notify, setNotify] = useState(true)

  return (
    <main className="flex-1 bg-page px-5 pb-36">
      <PageTitle>{s.title}</PageTitle>
      <PageHeading title={s.heading} sub={s.sub} />
      <div className="flex flex-col gap-4">
        <ListCard>
          <ListRow icon={LockKeyhole} tone="green" {...s.changePin} onClick={() => onAction(s.changePin.title)} />
        </ListCard>
        <ListCard>
          <ListRow
            icon={Fingerprint}
            {...s.biometric}
            trailing={<Toggle checked={biometric} onChange={setBiometric} label={s.biometric.title} />}
          />
          <ListRow
            icon={BellRing}
            {...s.notifications}
            trailing={<Toggle checked={notify} onChange={setNotify} label={s.notifications.title} />}
          />
          <ListRow icon={History} {...s.registration} onClick={() => onAction(s.registration.title)} />
        </ListCard>
        <ListCard>
          <ListRow icon={Info} {...s.about} onClick={() => onAction(s.about.sub)} />
          <ListRow icon={Smartphone} {...s.moveDevice} onClick={() => onAction(s.moveDevice.title)} />
          <ListRow icon={BadgeCheck} {...s.trust} onClick={() => onAction(s.trust.title)} />
        </ListCard>
        <ListCard>
          <ListRow icon={CircleX} tone="red" titleClassName="text-[#b3412f]" {...s.deactivate} onClick={() => onAction(s.deactivate.title)} />
          <ListRow icon={LogOut} {...s.logout} onClick={onLogout} />
        </ListCard>
      </div>
    </main>
  )
}
