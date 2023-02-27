import React from 'react'
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'

import useTheme from 'hooks/useTheme'
import GlobalStyle from 'styles/GlobalStyle'
import dark from 'styles/themes/dark'
import light from 'styles/themes/light'
import Header from 'components/Header'

export default function App({ Component, pageProps }: AppProps) {

  const [theme, setTheme] = useTheme(dark)

  const toggleTheme = React.useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light)
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header toggleTheme={toggleTheme} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
