import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import localFont from 'next/font/local'
import { OrientationLock } from '@/components/app/orientation-lock'
import './globals.css'

const kanit = localFont({
  src: '../public/fonts/Kanit-Regular.ttf',
  weight: '400',
  display: 'swap',
  variable: '--font-kanit-local',
})

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-thai',
})

export const metadata: Metadata = {
  title: 'แอปบริการ',
  description: 'Mobile service app UI with menu, announcements and bottom navigation',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/app-icon/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/app-icon/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/app-icon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    title: 'แอปบริการ',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} ${kanit.variable} bg-background`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <OrientationLock />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
