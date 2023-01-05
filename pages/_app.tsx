import type { AppProps } from "next/app"
import Head from "next/head"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import "../styles/globals.css"
import Header from "../src/components/header";
import ColorModeContext from "../src/components/context";
import { PaletteMode, useMediaQuery } from "@mui/material";
import { useState, useEffect, useMemo } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // theme setting
  const [colorMode, setColorMode] = useState<PaletteMode>("dark");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });

  useEffect(() => {
    const storedColorMode = localStorage.getItem("colorMode");
    if (storedColorMode === "dark") {
      setColorMode("dark");
    } else if (storedColorMode === "light") {
      setColorMode("light");
    } else if (prefersDarkMode) {
      setColorMode("dark");
    } else {
      setColorMode("light");
    }
  }, [prefersDarkMode]);

  useEffect(() => {
    localStorage.setItem("colorMode", colorMode);
  }, [colorMode]);

  const toggleColorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setColorMode((prevMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  return (
    <>
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
        <meta property="og:image"
          content="https://raw.githubusercontent.com/oit-tools/syllabus/master/web/public/icon.webp" />
        <meta property="og:site_name" content="OIT Syllabus App" />
        <meta property="og:description" content="大阪工業大学非公式のシラバスアプリ" key="description" />
        <meta name="twitter:card" content="summary" />
      </Head>
      <ColorModeContext.Provider value={toggleColorMode}>
        <ThemeProvider theme={theme}>
          <Header />
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default MyApp
