import { Accessibility, Baby, FileBadge, FileText, Heart, HeartCrack, House, UserRound } from 'lucide-react'
import { documentsPage } from '@/lib/app-content'
import { ListCard, ListRow, PageHeading, PageTitle } from './page-parts'

const icons = {
  idcard: UserRound,
  house: House,
  birth: Baby,
  marriage: Heart,
  divorce: HeartCrack,
  disability: Accessibility,
  license: FileBadge,
  other: FileText,
}

export function DocumentsTab({ onAction }: { onAction: (msg: string) => void }) {
  return (
    <main className="flex-1 bg-page px-5 pb-36">
      <PageTitle>{documentsPage.title}</PageTitle>
      <PageHeading title={documentsPage.heading} sub={documentsPage.sub} />
      <div className="flex flex-col gap-4">
        {documentsPage.groups.map((group, i) => (
          <ListCard key={i}>
            {group.map((doc) => (
              <ListRow key={doc.id} icon={icons[doc.id]} tone={doc.tone} title={doc.title} sub={doc.sub} onClick={() => onAction(doc.title)} />
            ))}
          </ListCard>
        ))}
      </div>
    </main>
  )
}
