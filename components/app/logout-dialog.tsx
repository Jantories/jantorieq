import { logoutDialog as d } from '@/lib/app-content'

export function LogoutDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-8" onClick={onCancel}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-msg"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-[2rem] bg-white p-6 text-center"
      >
        <h2 id="logout-title" className="text-2xl font-bold text-brand">
          {d.title}
        </h2>
        <p id="logout-msg" className="mt-5 text-lg text-neutral-900">
          {d.message}
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <button type="button" onClick={onConfirm} className="h-14 rounded-full bg-brand text-xl text-white transition hover:bg-brand/90 active:scale-[0.98]">
            {d.confirm}
          </button>
          <button
            type="button"
            onClick={onCancel}
            autoFocus
            className="h-14 rounded-full border-2 border-brand text-xl text-brand transition hover:bg-brand-soft active:scale-[0.98]"
          >
            {d.cancel}
          </button>
        </div>
      </div>
    </div>
  )
}
