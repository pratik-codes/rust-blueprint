import { useRouter } from 'next/router'
import { useFSRoute } from 'nextra/hooks'
import seoConfig from './seo.config'
import {
  Callout,
  Card,
  Cards,
  DocsThemeConfig,
  FileTree,
  Tab,
  Tabs,
  useConfig
} from './src'
import { Steps } from './src/mdx/steps'
import { css } from './styled-system/css'
import { Icon } from './theme/icons'

const config: DocsThemeConfig = {
  components: {
    blockquote: Callout,
    //
    Card: Card,
    Cards: Cards,
    Callout: Callout,
    FileTree: FileTree,
    Steps: Steps,
    Tab: Tab,
    Tabs: Tabs
  },
  logo: <span className={css({ fontSize: 'xl', fontWeight: 'bold', color: 'primary.500' })}>🦀 Rust Blueprint</span>,
  project: { link: 'https://github.com/rust-blueprint/rust-blueprint' },
  useNextSeoProps() {
    const { frontMatter } = useConfig()

    const { route } = useRouter()
    const { url, images } = seoConfig.openGraph

    if (route === '/') {
      return { titleTemplate: 'Rust Blueprint - %s' }
    }

    const fsRoute = useFSRoute()
    const category = fsRoute.split('/')[2]

    const ogUrl = new URL(images)
    ogUrl.searchParams.set('title', frontMatter.title)
    if (category) ogUrl.searchParams.set('category', category)

    return {
      title: frontMatter.title,
      description: frontMatter.description,
      titleTemplate: seoConfig.title.template,
      openGraph: { url, images: [{ url: ogUrl.toString() }] }
    }
  },
  docsRepositoryBase: 'https://github.com/rust-blueprint/rust-blueprint/tree/main/website',
  sidebar: {
    toggleButton: true
  },
  // i18n: [
  //   { locale: 'en', text: 'English' },
  // ],
  footer: {
    text: (
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          gap: '4',
          width: '100%',
          fontSize: 'sm'
        })}
      >
        <span>Copyright © {new Date().getFullYear()} Rust Blueprint</span>
        <a
          className={css({ color: 'current', textDecoration: 'none' })}
          href="https://github.com/rust-blueprint"
        >
          Made with ❤️ and 🦀 by the Rust community
        </a>
      </div>
    )
  },
  head: () => {
    const { frontMatter: meta } = useConfig()
    const { title } = meta

    return (
      <>
        {seoConfig.icons.map((icon, index) => (
          <link key={index} rel={icon.rel} href={icon.url} />
        ))}
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={meta['description'] || seoConfig.description}
        />
        <meta
          name="og:title"
          content={title ? title + ' – Rust Blueprint' : seoConfig.title.default}
        />
        <meta
          name="og:description"
          content={meta['description'] || seoConfig.description}
        />
        <meta name="og:image" content={seoConfig.openGraph.images} />
        <meta name="og:url" content={seoConfig.openGraph.url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={seoConfig.twitter.site} />
        <meta name="twitter:creator" content={seoConfig.twitter.creator} />
        <meta name="apple-mobile-web-app-title" content="Rust Blueprint" />
      </>
    )
  }
}

export default config
