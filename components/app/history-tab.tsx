import { ImageIcon } from 'lucide-react'
import { historyPage } from '@/lib/app-content'
import { PageTitle } from './page-parts'

export function HistoryTab({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <main className="flex-1 bg-page px-4 pb-36">
      <PageTitle>{historyPage.title}</PageTitle>
      <div className="flex flex-col gap-8">
        {historyPage.groups.map((group) => (
          <section key={group.date} aria-label={group.date}>
            <h2 className="mb-3 px-1 text-2xl text-brand">{group.date}</h2>
            <ul className="flex flex-col gap-4">
              {group.items.map((item, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => onAction(item.title)}
                    className="w-full rounded-3xl bg-white p-5 text-left transition hover:bg-neutral-50 active:scale-[0.99]"
                  >
                    <span className="flex items-start gap-3">
                      <ImageIcon className="size-7 shrink-0 fill-[#4a72c8] text-white" strokeWidth={1.5} aria-hidden />
                      <span className="flex-1 text-xl font-bold text-neutral-800">{item.title}</span>
                      <span className="text-sm text-[#3fae5a]">{item.status}</span>
                    </span>
                    <span className="mt-3 block text-base leading-relaxed text-neutral-700">{item.body}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
