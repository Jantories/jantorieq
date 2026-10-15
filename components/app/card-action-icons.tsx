type IconProps = { className?: string }

export function PersonIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <ellipse cx="12" cy="8.4" rx="2.9" ry="3.5" />
      <path d="M5.2 19.6C6.3 16.6 8.8 15.4 12 15.4s5.7 1.2 6.8 4.2" />
    </svg>
  )
}

export function ExpandIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 4h6v6" />
      <path d="M20 4l-6.5 6.5" />
      <path d="M10 20H4v-6" />
      <path d="M4 20l6.5-6.5" />
    </svg>
  )
}

function CircularArrow() {
  return (
    <>
      <path d="M5.2 14.5A7 7 0 0 1 15.4 5.9" fill="none" strokeWidth={2} strokeLinecap="round" />
      <path d="M17.8 7.5L17.5 4.1L14.5 8.4Z" strokeWidth={1.2} strokeLinejoin="round" />
    </>
  )
}

export function FlipIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="2.3" fill="none" strokeWidth={2.2} />
      <CircularArrow />
      <g transform="rotate(180 12 12)">
        <CircularArrow />
      </g>
    </svg>
  )
}
