import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>OITシラバスアプリ</title>
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00a1ea" />
        <meta name="description" content="大阪工業大学非公式シラバスアプリ" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.ico" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        {/* OGP */}
        <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">
          <title>OITシラバスアプリ</title>
          <meta property="og:title" content="OITシラバスアプリ" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://syllabus.oit.yashikota.com" />
          <meta property="og:image"
            content="https://raw.githubusercontent.com/oit-tools/syllabus/master/web/public/icon.webp" />
          <meta property="og:site_name" content="OIT Syllabus App" />
          <meta property="og:description" content="大阪工業大学非公式のシラバスアプリ" />
          <meta name="twitter:card" content="summary" />
        </head>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
