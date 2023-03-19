import React, { useContext, useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import * as S from './styles'
import * as Icons from 'components/Icons'
import Switch from 'react-switch'
import { parseCookies } from 'nookies'
import { ThemeContext } from 'styled-components'
interface Props {
  toggleTheme(): void,
}
const Header: React.FC<Props> = ({ toggleTheme }) => {


  const theme = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()

  useEffect(() => {
    const { theme } = parseCookies()
    if (theme) {
      setIsLoading(true)
    }
  }, [])
  return (

    <S.Header >
      <S.Content>
        <Link href='/'>
          Daily Tasks
        </Link>
        <S.Nav>
          {session?.user ? (
            <Link href='/dashboard'>
              My Dashboard
            </Link>
          ) : null}

          {status === 'loading' ? (
            null
          ) : session ? (
            <S.Login onClick={() => signOut()}>Olá, {session.user?.name}</S.Login>
          ) :
            < S.Login onClick={() => signIn('google')}>Login</S.Login>}

          {isLoading ? (
            <Switch
              onChange={toggleTheme}
              checked={theme.title === 'dark'}
              checkedIcon={
                <S.ThemeSwitch>
                  <Icons.LightMode color={theme.text} />
                </S.ThemeSwitch>
              }
              uncheckedIcon={
                <S.ThemeSwitch>
                  <Icons.DakMode color={theme.text} />
                </S.ThemeSwitch>
              }
              height={40}
              width={80}
              handleDiameter={20}
              offColor={theme.colors.primary}
              onColor={theme.colors.primary}
            />

          ) : null}
        </S.Nav>
      </S.Content>
    </S.Header >
  )
}
export default Header