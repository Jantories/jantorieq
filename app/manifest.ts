import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'แอปบริการ',
    short_name: 'แอปบริการ',
    description: 'Mobile service app',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#2b2f8f',
    theme_color: '#2b2f8f',
    icons: [
      { src: '/app-icon/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/app-icon/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/app-icon/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
