import { documentNotFoundDialog as d } from '@/lib/app-content'

export type NotFoundDocumentId = keyof typeof d.messages

export function DocumentNotFoundDialog({ documentId, onClose }: { documentId: NotFoundDocumentId; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-8" onClick={onClose}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="not-found-title"
        aria-describedby="not-found-msg"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-[2rem] bg-white p-6 text-center"
      >
        <h2 id="not-found-title" className="text-2xl font-bold text-brand">
          {d.title}
        </h2>
        <p id="not-found-msg" className="mt-6 text-lg text-neutral-900">
          {d.messages[documentId]}
        </p>
        <p className="mt-8 text-base tracking-wide text-neutral-300">{d.code}</p>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="mt-5 h-14 w-full rounded-full bg-brand text-xl text-white transition hover:bg-brand/90 active:scale-[0.98]"
        >
          {d.confirm}
        </button>
      </div>
    </div>
  )
}
