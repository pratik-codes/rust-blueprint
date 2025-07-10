import { getPublicUrl } from '@/public-url'
import type { Metadata } from 'next'

const defineMetadata = <T extends Metadata>(metadata: T) => metadata

const publicUrl = getPublicUrl()

const seoConfig = defineMetadata({
  metadataBase: new URL(publicUrl),
  title: {
    template: '%s - Rust Blueprint',
    default:
      'Rust Blueprint - Blazingly fast project scaffolding for Rust web applications'
  },
  description: 'Generate production-ready Rust web applications in seconds with the ultimate Rust project scaffolding tool',
  themeColor: '#CE422B',
  openGraph: {
    images: `${publicUrl}/og`,
    url: publicUrl
  },
  manifest: '/site.webmanifest',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'mask-icon', url: '/favicon.ico' },
    { rel: 'image/x-icon', url: '/favicon.ico' }
  ],
  twitter: {
    site: '@rustblueprint',
    creator: '@rustblueprint'
  }
})

export default seoConfig
