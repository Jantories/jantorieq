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
                iconImageSrc={
                  doc.id === 'idcard'
                    ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD%202569-11-16%20%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%2017.06.38-QDP5VcKyQfYy223L5St0AfHLrfXekW.png'
                    : doc.id === 'house'
                      ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD%202569-11-16%20%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%2017.21.18-hsaTdS9DFImmKIiiFTzHAVbdyS5p5W.png'
                      : doc.id === 'birth'
                        ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD%202569-11-16%20%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%2017.26.31-UMGMqzUFhqsWEA9y3jP4AuKZ0WpIfw.png'
                        : doc.id === 'marriage'
                          ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD%202569-11-16%20%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%2017.31.11-FSyQstTw2yBlizOOnoJsaWDIB0uJqk.png'
                          : doc.id === 'divorce'
                            ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD%202569-11-16%20%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%2017.31.32-BwI3DJHxoOBGxznlaXEMGrl7SCDAGq.png'
                            : doc.id === 'disability'
                              ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD%202569-11-16%20%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2%2017.31.44-mh5oDsdGWi3kUpDuoepJNh8fD6UZih.png'
                              : undefined
                }
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
