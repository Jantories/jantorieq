import { houseRegistration } from '@/lib/app-content'

const OFFICE_FIRST_LINE_LENGTH = 17

type TextProps = {
  x: number
  y: number
  lines: string[]
  size?: number
  stroke?: number
  lineHeight?: number
}

function ArtText({ x, y, lines, size = 32, stroke = 0.5, lineHeight = 27.2 }: TextProps) {
  return (
    <text x={x} y={y} fontSize={size} fill="#181818" stroke="#181818" strokeWidth={stroke}>
      {lines.map((line, index) => (
        <tspan key={line + index} x={x} dy={index === 0 ? 0 : lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

export function HouseInfoArtwork({ className = '' }: { className?: string }) {
  const { house } = houseRegistration
  const officeLines = [house.office.slice(0, OFFICE_FIRST_LINE_LENGTH), house.office.slice(OFFICE_FIRST_LINE_LENGTH)]

  return (
    <svg
      viewBox="0 0 810 500"
      role="img"
      aria-labelledby="house-artwork-title"
      className={`block h-auto w-full ${className}`}
    >
      <title id="house-artwork-title">{house.title}</title>
      <image href="/images/house-info-card.png" width="810" height="500" />
      <g fontFamily="AlphaDillenia, DilleniaUPC, Tahoma, sans-serif" fontWeight={400} paintOrder="stroke fill" strokeLinejoin="round" xmlSpace="preserve">
        <ArtText x={178} y={99} lines={[house.code]} />
        <ArtText x={546} y={99} lines={officeLines} />
        <ArtText x={120} y={160} lines={[house.address]} />
        <ArtText x={107} y={272} lines={[house.village]} stroke={0.15} />
        <ArtText x={502} y={276} lines={[house.name]} stroke={0.15} />
        <ArtText x={128} y={325} lines={[house.type]} stroke={0.15} />
        <ArtText x={534} y={325} lines={[house.kind]} stroke={0.15} />
        <ArtText x={281} y={379} lines={[house.assignedDate]} stroke={0.15} />
        <ArtText x={502} y={379} lines={[house.community]} size={31.5} />
        <ArtText x={510} y={459} lines={[house.printedDate]} />
      </g>
    </svg>
  )
}
