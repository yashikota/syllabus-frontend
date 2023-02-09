import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import GoogleTagManager, { GoogleTagManagerId } from "../components/gtm";
import Header from "../components/header";
import { Theme } from "../components/theme";
import { googleTagManagerId } from "../utils/gtm";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Head>
          <title>OITシラバスアプリ</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#00a1ea" />
          <meta name="description" content="大阪工業大学非公式シラバスアプリ" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />

          {/* OGP */}
          <title>OITシラバスアプリ</title>
          <meta property="og:title" content="OITシラバスアプリ" key="title" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://syllabus.oit.yashikota.com" />
          <meta
            property="og:image"
            content="https://raw.githubusercontent.com/oit-tools/syllabus/master/web/public/icon.webp"
          />
          <meta property="og:site_name" content="OIT Syllabus App" />
          <meta property="og:description" content="大阪工業大学非公式のシラバスアプリ" key="description" />
          <meta name="twitter:card" content="summary" />
        </Head>

        <Header />
        <GoogleTagManager googleTagManagerId={googleTagManagerId as GoogleTagManagerId} />
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </RecoilRoot>
    </>
  );
}

export default App;
