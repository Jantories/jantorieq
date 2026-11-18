import { houseRegistration } from '@/lib/app-content'

type TextProps = {
  x: number
  y: number
  text: string
  size?: number
}

function ArtText({ x, y, text, size = 32 }: TextProps) {
  return (
    <text x={x} y={y} fontSize={size} fill="#181818" stroke="#181818" strokeWidth={0.5}>
      {text}
    </text>
  )
}

export function HouseMembersArtwork({ className = '' }: { className?: string }) {
  const { residents } = houseRegistration

  return (
    <svg
      viewBox="0 0 810 500"
      role="img"
      aria-labelledby="house-members-artwork-title"
      className={`block h-auto w-full ${className}`}
    >
      <title id="house-members-artwork-title">{residents.title}</title>
      <image href="/images/house-members-card.png" width="810" height="500" />
      <g fontFamily="AlphaDillenia, DilleniaUPC, Tahoma, sans-serif" fontWeight={400} paintOrder="stroke fill" strokeLinejoin="round" xmlSpace="preserve">
        <ArtText x={41} y={115} text={residents.name} />
        <ArtText x={452} y={115} text={residents.nationality} />
        <ArtText x={661} y={115} text={residents.gender} />
        <ArtText x={204} y={172} text={residents.idNumber} />
        <ArtText x={473} y={172} text={residents.status} />
        <ArtText x={686} y={172} text={residents.birth} size={31.3} />
        <ArtText x={192} y={229} text={residents.mother.name} />
        <ArtText x={389} y={229} text={residents.mother.id} />
        <ArtText x={724} y={229} text={residents.mother.nationality} />
        <ArtText x={171} y={286} text={residents.father.name} />
        <ArtText x={389} y={286} text={residents.father.id} />
        <ArtText x={724} y={286} text={residents.father.nationality} />
        <ArtText x={82} y={344} text={residents.movedFrom} />
        <ArtText x={66} y={441} text={residents.movedTo} />
      </g>
    </svg>
  )
}
