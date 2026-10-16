'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Camera, CameraOff } from 'lucide-react'

type Props = { onBack: () => void }

export function ScanScreen({ onBack }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraState, setCameraState] = useState<'starting' | 'ready' | 'blocked'>('starting')

  useEffect(() => {
    let active = true

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraState('blocked')
        return
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false,
        })
        if (!active) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        setCameraState('ready')
      } catch {
        if (active) setCameraState('blocked')
      }
    }

    startCamera()
    return () => {
      active = false
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  return (
    <main className="flex flex-1 flex-col bg-neutral-950" aria-label="หน้าสแกน QR Code">
      <header className="flex items-center bg-brand-dark px-5 pb-5 pt-[max(env(safe-area-inset-top),1rem)] text-white">
        <button type="button" onClick={onBack} aria-label="ย้อนกลับ" className="flex size-10 items-center justify-center rounded-full transition hover:bg-white/10 active:scale-95">
          <ArrowLeft className="size-6" aria-hidden="true" />
        </button>
        <h1 className="flex-1 pr-10 text-center text-xl font-semibold tracking-wide">QR CODE</h1>
      </header>

      <section className="relative flex flex-1 overflow-hidden text-center">
        <div className="absolute inset-0 bg-neutral-950" aria-label="พื้นที่สำหรับสแกน QR Code">
          <video ref={videoRef} className="size-full object-cover" autoPlay muted playsInline aria-label="ภาพจากกล้องสำหรับสแกน QR Code" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 border-2 border-white" />
          {cameraState !== 'ready' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950/90 px-6 text-white">
              {cameraState === 'starting' ? <Camera className="size-8" aria-hidden="true" /> : <CameraOff className="size-8" aria-hidden="true" />}
              <p className="text-sm leading-relaxed">{cameraState === 'starting' ? 'กำลังเปิดกล้อง…' : 'ไม่สามารถเปิดกล้องได้ กรุณาอนุญาตการใช้งานกล้อง'}</p>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-neutral-950/80 px-4 py-4 text-white">
            <h2 className="text-base font-semibold">สแกน QR CODE</h2>
            <p className="text-xs leading-relaxed text-white/80">วาง QR Code ให้อยู่ในพื้นที่ที่กำหนด</p>
          </div>
        </div>
      </section>
    </main>
  )
}
