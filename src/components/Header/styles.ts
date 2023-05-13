import styled from "styled-components";
import Link from 'next/link';

export const Content = styled.section`
  padding: 0 1rem;
  width: 100%;
  display: flex;
  align-items:center;
  justify-content: space-between;
`

export const Header = styled.header`
  width: 100%;
  height: 4rem;
  background: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Nav = styled.nav<{ show: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;


  @media (max-width: 768px) {
    position: absolute;
    top: 4rem;
    right: 0;
    background: ${({ theme }) => theme.header};
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    padding: 1rem;
    opacity: ${({ show }) => (show ? 1 : 0)};
    transition: opacity 0.5s ease-in-out;
    visibility: ${({ show }) => (show ? "visible" : "hidden")};
    transform: translateY(${({ show }) => (show ? "0" : "-100%")});
  }
`

export const MenuToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    display: flex;
  }
`

export const MenuItem = styled(Link)`
  margin: 0 10px;
  color: ${({ theme }) => theme.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.background};
  }

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`

export const Login = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 0.7rem 2rem;
  border-radius: 1rem;
  color: ${({ theme }) => theme.text};
  border: 1.5px solid ${({ theme }) => theme.text};
  transition: 0.5s;
  margin: 0 10px;
  width: 2rem;

  &:hover {
    color: ${({ theme }) => theme.background};
    background-color: ${({ theme }) => theme.text};
    border: 1.5px solid ${({ theme }) => theme.text};
  }

  @media (max-width: 500px) {
    padding: 0.5rem 1rem;
  }
`

export const Logo = styled.p`
  font-size: 1.6rem;

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`

export const ThemeSwitch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 15px;
  color: orange;
  padding-right: 2px;
`
