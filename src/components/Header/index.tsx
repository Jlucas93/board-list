import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import * as S from './styles';
import * as Icons from 'components/Icons';
import Switch from 'react-switch';
import { parseCookies } from 'nookies';
import { ThemeContext } from 'styled-components';
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  orderBy,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"
import { db } from 'services/firebaseConnect'

interface Props {
  toggleTheme(): void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const theme = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMenu = useCallback(() => {
    setIsNavOpen(!isNavOpen);
  }, [isNavOpen])


  useEffect(() => {
    const { theme } = parseCookies();
    if (theme) {
      setIsLoading(true);
    }
  }, []);


  return (
    <S.Header>
      <S.Content>
        <S.MenuToggle onClick={handleMenu}>
          <Icons.Menu />
        </S.MenuToggle>
        <S.Nav show={isNavOpen}>
          {session?.user ? (
            <>
              <S.MenuItem href="/">Home</S.MenuItem>
              <S.MenuItem href="/dashboard">Tasks</S.MenuItem>
            </>
          ) : null}
          {status === 'loading' ? null : session ? (
            <S.Login onClick={() => signOut()}>
              <b>{session?.user?.name ? session?.user?.name[0].toUpperCase() : session?.user?.name}</b>
            </S.Login>
          ) : (
            <S.Login onClick={() => signIn('google')}>
              Login
            </S.Login>
          )}
        </S.Nav>
        {isLoading ? (
          <Switch
            onChange={toggleTheme}
            checked={theme.title === 'dark'}
            checkedIcon={<S.ThemeSwitch><Icons.LightMode color={theme.text} /></S.ThemeSwitch>}
            uncheckedIcon={<S.ThemeSwitch><Icons.DarkMode color={theme.text} /></S.ThemeSwitch>}
            height={40}
            width={80}
            handleDiameter={20}
            offColor={theme.colors.primary}
            onColor={theme.colors.primary}
          />
        ) : null}
      </S.Content>
    </S.Header >
  );
};

export default Header;
