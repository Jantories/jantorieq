const wavePath = 'M0 48 Q25 38 50 48 T100 48 T150 48 T200 48 V100 H0 Z'
const backWavePath = 'M0 52 Q25 60 50 52 T100 52 T150 52 T200 52 V100 H0 Z'

export function UnlockLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 animate-in fade-in duration-150"
    >
      <span className="sr-only">กำลังโหลด</span>
      <svg viewBox="0 0 100 100" className="size-32" aria-hidden>
        <defs>
          <clipPath id="unlock-loader-water">
            <circle cx="50" cy="50" r="39" />
          </clipPath>
        </defs>

        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/30" />
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="72 217"
          className="unlock-loader-arc text-white"
        />

        <g clipPath="url(#unlock-loader-water)">
          <g className="unlock-loader-wave-back text-sky-600/70">
            <path d={backWavePath} fill="currentColor" />
          </g>
          <g className="unlock-loader-wave text-sky-400/90">
            <path d={wavePath} fill="currentColor" />
          </g>
        </g>
      </svg>
    </div>
  )
}
