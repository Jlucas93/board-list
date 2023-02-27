import React, { useContext } from 'react'
import * as S from './styles'
import * as Icons from 'components/Icons'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components'


interface Props {
  toggleTheme(): void,
}
const Header: React.FC<Props> = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext)
  return (
    <S.Header >
      Hello

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
    </S.Header>
  )
}
export default Header