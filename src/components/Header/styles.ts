import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  height: 4rem;
  background: ${({ theme }) => theme.header};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.section`
  padding: 0 1rem;
  width: 100%;
  display: flex;
  align-items:center;
  justify-content: space-between;

`
export const Nav = styled.nav`
  width: 30%;
  display: flex;
  align-items:center;
  justify-content: space-between;
`
export const Login = styled.button`
  background: transparent;
  padding: .5rem 2rem;
  border-radius: 1.3rem;
  color: ${({ theme }) => theme.text};
  border: 1.5px  solid ${({ theme }) => theme.text};
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.background};
    background-color: ${({ theme }) => theme.text};
    border: 1.5px  solid ${({ theme }) => theme.text};
  }
`

export const ThemeSwitch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 15;
  color: orange;
  padding-right: 2;
`

export const SwtichRaido = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 20;
  background: ${({ theme }) => theme.background};
`