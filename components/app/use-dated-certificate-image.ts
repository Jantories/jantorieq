'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'

const THAI_MONTHS = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม',
]

const BANGKOK_DATE = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Bangkok',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const CERTIFICATION_DATE_PATTERN = /(<text id="certification-date-value"[^>]*>\s*<tspan[^>]*>)[^<]*(<\/tspan>)/

function getTodayKey() {
  return BANGKOK_DATE.format(new Date())
}

function formatThaiCertificationDate(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number)
  return `วันที่ ${day} เดือน ${THAI_MONTHS[month - 1]} พ.ศ. ${year + 543}`
}

async function fetchDatedSvg([src, dateKey]: readonly [string, string]) {
  const response = await fetch(src)
  if (!response.ok) throw new Error(`Failed to load ${src}`)
  const svg = await response.text()
  return svg.replace(CERTIFICATION_DATE_PATTERN, `$1${formatThaiCertificationDate(dateKey)}$2`)
}

/**
 * Returns an object URL for the certificate SVG whose bottom certification
 * date is replaced with today's date (Asia/Bangkok, Buddhist era).
 * Returns undefined until the image is ready.
 */
export function useDatedCertificateImage(src: string) {
  const [dateKey, setDateKey] = useState(getTodayKey)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const syncDate = () => setDateKey(getTodayKey())

    const scheduleNextMidnight = () => {
      // Asia/Bangkok is UTC+7 with no daylight saving.
      const dayMs = 24 * 60 * 60 * 1000
      const msIntoBangkokDay = (Date.now() + 7 * 60 * 60 * 1000) % dayMs
      timer = setTimeout(() => {
        syncDate()
        scheduleNextMidnight()
      }, dayMs - msIntoBangkokDay + 500)
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') syncDate()
    }

    scheduleNextMidnight()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  const { data: svg } = useSWR([src, dateKey] as const, fetchDatedSvg, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    keepPreviousData: true,
  })
  const [objectUrl, setObjectUrl] = useState<string>()

  useEffect(() => {
    if (!svg) return
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    setObjectUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [svg])

  return objectUrl
}
