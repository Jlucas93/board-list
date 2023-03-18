import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 4rem);
`

export const Main = styled.main`

`

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & img{
    max-width: 480px;
    object-fit: contain;
    width: auto;
    height: auto;

    @media screen and (max-width: 580px) {
      max-width: 80%;
    }
  }
`

export const SubTitle = styled.h1`
  margin: 1.7rem;
  line-height: 150%;
  text-align: center;

  @media screen and (max-width: 580px) {
     font-size: 24px;
    }
`

export const InfoContent = styled.div`
  display: flex;
  align-items:center;
  justify-content: space-around;
  width:100%;

  @media screen and (max-width: 580px) {
    flex-direction: column;
  }
`

export const Section = styled.section`
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.background};
  padding: 1rem 2rem;
  border-radius: .3rem;
  transition: transform 0.4s;

  &:hover{
    transform: scale(1.08);
  }

  @media screen and (max-width: 580px) {
    width: 80%;
    margin-bottom: 1rem;
    text-align: center;
  }
`
export const Span = styled.span`
`
