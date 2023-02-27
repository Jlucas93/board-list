import React from 'react'
import { parseCookies, setCookie } from 'nookies'

export default function useTheme(initialValue: any) {

  const [state, setState] = React.useState(initialValue)

  React.useEffect(() => {
    const { theme } = parseCookies()
    if (theme) {
      setState(JSON.parse(theme))
    }
  }, [])

  const setTheme = (value: any) => {
    setState(value)
    setCookie(null, 'theme', JSON.stringify(value), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }

  return [state, setTheme]
}
