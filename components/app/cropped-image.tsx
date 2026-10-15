type Props = {
  src: string
  natural: { width: number; height: number }
  crop: { x: number; y: number; width: number; height: number }
  alt?: string
  className?: string
}

export function CroppedImage({ src, natural, crop, alt = '', className = '' }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        draggable={false}
        className="absolute max-w-none select-none"
        style={{
          width: `${(natural.width / crop.width) * 100}%`,
          height: `${(natural.height / crop.height) * 100}%`,
          left: `${(-crop.x / crop.width) * 100}%`,
          top: `${(-crop.y / crop.height) * 100}%`,
        }}
      />
    </div>
  )
}
