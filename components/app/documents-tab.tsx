import { Accessibility, Baby, FileBadge, FileText, Heart, HeartCrack, House, UserRound } from 'lucide-react'
import { documentNotFoundDialog, documentsPage } from '@/lib/app-content'
import type { NotFoundDocumentId } from './document-not-found-dialog'
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

export function DocumentsTab({
  onAction,
  onOpenIdCard,
  onNotFound,
}: {
  onAction: (msg: string) => void
  onOpenIdCard: () => void
  onNotFound: (id: NotFoundDocumentId) => void
}) {
  return (
    <main className="flex-1 bg-page px-5 pb-36">
      <PageTitle>{documentsPage.title}</PageTitle>
      <PageHeading title={documentsPage.heading} sub={documentsPage.sub} />
      <div className="flex flex-col gap-4">
        {documentsPage.groups.map((group, i) => (
          <ListCard key={i}>
            {group.map((doc) => (
              <ListRow
                key={doc.id}
                icon={icons[doc.id]}
                tone={doc.tone}
                title={doc.title}
                sub={doc.sub}
                onClick={() => {
                  if (doc.id === 'idcard') onOpenIdCard()
                  else if (doc.id in documentNotFoundDialog.messages) onNotFound(doc.id as NotFoundDocumentId)
                  else onAction(doc.title)
                }}
              />
            ))}
          </ListCard>
        ))}
      </div>
    </main>
  )
}
