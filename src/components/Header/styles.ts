import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  height: 3rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
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
