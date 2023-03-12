import React, { useContext, useEffect, useState } from 'react'
import * as S from './styles'
import * as Icons from 'components/Icons'
import Switch from 'react-switch'
import { parseCookies, setCookie } from 'nookies'
import { ThemeContext } from 'styled-components'
interface Props {
  toggleTheme(): void,
}
const Header: React.FC<Props> = ({ toggleTheme }) => {


  const theme = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const { theme } = parseCookies()
    if (theme) {
      setIsLoading(true)
    }
  }, [])
  return (
    <S.Header >
      <img src='/images/logo.svg' />
      <S.NavigationLinks> 
        <a>Home</a>
        <a>My Board</a>
      </S.NavigationLinks>
      <button><Icons.Github />Login</button>
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

    </S.Header>
  )
}
export default Header