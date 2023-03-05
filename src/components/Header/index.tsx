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
      Hello
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
          offColor={theme.background}
          onColor={theme.background}
        />
      ) : null}

    </S.Header>
  )
}
export default Header